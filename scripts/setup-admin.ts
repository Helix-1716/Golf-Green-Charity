import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminEmail = process.env.ADMIN_EMAIL!;
const adminPassword = process.env.ADMIN_PASSWORD!;

if (!supabaseUrl || !serviceRoleKey || !adminEmail || !adminPassword) {
  console.error("❌ Missing required environment variables. Check your .env.local file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function runSetup() {
  console.log(`\n🏌️  Golf for Good — Master Admin Setup Flow`);
  console.log(`========================================`);
  console.log(`📧 Target Admin: ${adminEmail}\n`);

  // 1. Auth Creation / Identity Management
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error(`❌ Connection Failure: ${listError.message}`);
    process.exit(1);
  }

  let adminUser = users.find(u => u.email === adminEmail);
  let userId: string;

  if (adminUser) {
    userId = adminUser.id;
    console.log(`ℹ️  Found existing user: ${userId}`);
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { role: 'admin', full_name: 'System Admin' }
    });
    if (error || !data.user) {
      console.error(`❌ User Creation Failed: ${error?.message}`);
      process.exit(1);
    }
    userId = data.user.id;
    console.log(`✅ Created NEW root user: ${userId}`);
    adminUser = data.user;
  }

  // 2. Auth Metadata Injection (Self-healing Admin Identity)
  // This allows the admin to log in even if the tables are not yet initialized.
  const { error: metaError } = await supabase.auth.admin.updateUserById(userId, {
    password: adminPassword,
    user_metadata: { ...adminUser.raw_user_meta_data, role: 'admin' }
  });

  if (metaError) {
    console.warn(`⚠️  Metadata tagging failed: ${metaError.message}`);
  } else {
    console.log(`✅ Identity Tagging: Role "admin" assigned to auth.users metadata`);
  }

  // 3. Database Schema Integrity Check
  console.log(`\n🔍 Verifying Database Schema...`);
  const { error: tableError } = await supabase.from('profiles').select('id').limit(1);

  if (tableError && tableError.code === 'PGRST205') {
    console.error(`🚨 CRITICAL: The "profiles" table is missing in the public schema.`);
    console.log(`\n========================================`);
    console.log(`📜 REQUIRED SQL (Run in Supabase Dashboard):`);
    console.log(`========================================\n`);
    console.log(`-- 1. Create Role Type
DO $$ BEGIN CREATE TYPE user_role AS ENUM ('user', 'admin'); EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. Create Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  full_name text,
  email text,
  avatar_url text,
  role user_role DEFAULT 'user',
  subscription_status text DEFAULT 'inactive',
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_tier text,
  created_at timestamp with time zone DEFAULT now()
);

-- 3. Set the Admin Role for this account
UPDATE public.profiles SET role = 'admin' WHERE id = '${userId}';

-- 4. Set Role in auth metadata (backup)
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb WHERE id = '${userId}';
\n`);
    console.log(`========================================`);
  } else {
    // Attempt role upgrade if table exists
    const { error: updateError } = await supabase.from('profiles').upsert({
      id: userId,
      email: adminEmail,
      full_name: 'System Admin',
      role: 'admin'
    });

    if (updateError) {
      console.error(`❌ DB Table Update Failed: ${updateError.message}`);
      console.log(`\n⚠️  The "role" column might be missing. Run your migrations!`);
    } else {
      console.log(`✅ DB Record Created: Profile updated with "admin" role`);
    }
  }

  console.log(`\n🎉 Workflow Complete!`);
  console.log(`→ Root Identity: admin@yourwebsite.com`);
  console.log(`→ Portal: http://localhost:3000/admin/login\n`);
}

runSetup().catch(console.error);
