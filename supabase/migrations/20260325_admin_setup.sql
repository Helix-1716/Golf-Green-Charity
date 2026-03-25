-- 🏌️‍♂️ Golf for Good: Admin Role Architecture Setup
-- 🔐 SECURITY: Role-Based Access Control (RBAC) Migration

-- 1. Create a Role Enum for Type Safety
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Add Role Column to Profiles Table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'user';

-- 3. Enhance Security with Row Level Security (RLS)
-- Ensure only admins can see ALL profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Allow admins full access to everything
CREATE POLICY admin_all_access ON public.profiles
FOR ALL TO authenticated
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- 5. Create the Initial Admin User (Manual Command)
-- Replace 'USER_ID_HERE' with the ID from auth.users after the account is created
-- UPDATE public.profiles SET role = 'admin' WHERE id = 'USER_ID_HERE';

-- 6. Trigger to automatically create a profile for new auth users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Ensure trigger is attached
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
