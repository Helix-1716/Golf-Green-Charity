import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function verifyAdminCookie(request: NextRequest): Promise<boolean> {
  try {
    const token = request.cookies.get("admin_session")?.value;
    if (!token) return false;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload.role === "admin" && payload.email === process.env.ADMIN_EMAIL;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  // ─────────────────────────────────────────────────────────
  // RULE 0: /admin/login — always public
  // ─────────────────────────────────────────────────────────
  if (pathname === "/admin/login") {
    // If already authenticated as admin, skip login page
    const isAdmin = await verifyAdminCookie(request);
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return response;
  }

  // ─────────────────────────────────────────────────────────
  // RULE 1: All /admin/* routes require admin_session cookie
  // ─────────────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    const isAdmin = await verifyAdminCookie(request);
    if (!isAdmin) {
      console.warn(`[Middleware] Admin access DENIED for path: ${pathname}`);
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return response;
  }

  // ─────────────────────────────────────────────────────────
  // RULE 2: /dashboard/* requires Supabase user session
  // ─────────────────────────────────────────────────────────
  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return response;
  }

  // ─────────────────────────────────────────────────────────
  // RULE 3: Redirect logged-in users away from /login, /signup
  // ─────────────────────────────────────────────────────────
  if (pathname === "/login" || pathname === "/signup") {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
