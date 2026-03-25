import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SignJWT } from "jose";

// Server-side admin login — uses Service Role for absolute authority
// Root Admin is verified by:
// 1. .env.local Credentials
// 2. Auth Identity Metadata (Role: 'admin')
// 3. Database Role (Fallback/Cache)
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const rootEmail = process.env.ADMIN_EMAIL;
    const rootPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (!rootEmail || !rootPassword || !jwtSecret) {
      console.error("[Admin Login] 🚨 ENV FAILURE: Missing ADMIN_EMAIL, ADMIN_PASSWORD or JWT_SECRET.");
      return NextResponse.json({ error: "Admin system is misconfigured." }, { status: 500 });
    }

    // ── Layer 1: Credentials verify against .env.local ──
    if (email !== rootEmail || password !== rootPassword) {
      console.warn(`[Admin Login] ❌ ACCESS DENIED for ${email} - Password/Email mismatch.`);
      return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
    }

    const adminSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // ── Layer 2: Role check in Auth Identity (Primary Proof) ──
    const { data: { users }, error: listError } = await adminSupabase.auth.admin.listUsers();
    if (listError) {
      console.error("[Admin Login] 🚨 SUPABASE FAILURE: Could not list users.");
      return NextResponse.json({ error: "Auth service connection error." }, { status: 500 });
    }

    const adminUser = users?.find(u => u.email === rootEmail);
    if (!adminUser) {
      console.error("[Admin Login] ❌ User record not found in Supabase Auth.");
      return NextResponse.json({ error: "Admin record not found. Please run scripts/setup-admin.ts." }, { status: 404 });
    }

    // Read role from user metadata (self-healing identity)
    const metadataRole = adminUser.user_metadata?.role;
    
    // ── Layer 3: Database Role Check (Supplemental) ──
    // We try to verify via DB, but we allow metadataRole = 'admin' to pass 
    // to prevent "profiles table missing" from locking out the admin.
    let verifiedAdmin = false;
    
    if (metadataRole === "admin") {
      verifiedAdmin = true;
      console.log(`[Admin Login] Profile verified via Auth Identity Metadata.`);
    } else {
      // Fallback to Profiles table
      const { data: profile } = await adminSupabase
        .from("profiles")
        .select("role")
        .eq("id", adminUser.id)
        .single();
      
      if (profile?.role === "admin") {
        verifiedAdmin = true;
        console.log(`[Admin Login] Profile verified via Database Table.`);
      }
    }

    if (!verifiedAdmin) {
      console.error(`[Admin Login] ❌ RBAC FAILURE for ${email}: Role is not "admin". Found: ${metadataRole}`);
      return NextResponse.json({ error: "Insufficient privileges. This account is not an admin." }, { status: 403 });
    }

    // ── Layer 4: Cryptographic Session Issue ──
    const secret = new TextEncoder().encode(jwtSecret);
    const token = await new SignJWT({
      sub: adminUser.id,
      email: adminUser.email,
      role: "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(secret);

    console.log(`[Admin Login] 🎉 SUCCESS: Admin ${email} authenticated.`);

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[Admin Login] 🚨 CRASH:", err);
    return NextResponse.json({ error: "Internal server error during authentication." }, { status: 500 });
  }
}
