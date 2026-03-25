"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { 
  Trophy, 
  Users, 
  BarChart, 
  Heart, 
  Settings, 
  LogOut, 
  PieChart,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminItems = [
  { name: "Overview", href: "/admin", icon: PieChart },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Prize Draws", href: "/admin/draws", icon: Trophy },
  { name: "Charity Directory", href: "/admin/charities", icon: Heart },
  { name: "Analytics", href: "/admin/stats", icon: BarChart },
  { name: "Platform Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<{ full_name: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();
        
        setAdmin(data || { full_name: user.email?.split('@')[0] || "Admin" });
      }
    }
    getAdmin();
  }, []);

  const handleLogout = async () => {
    // 1. Clear Supabase auth (client side)
    await supabase.auth.signOut();
    
    // 2. Clear our custom admin-session cookie (server side)
    await fetch("/api/admin/logout", { method: "POST" });
    
    // 3. Kick out to login
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-80 bg-slate-900 flex flex-col pt-8 pb-10 px-8 h-screen sticky top-0 overflow-hidden md:flex hidden">
      {/* GLOW DECOR */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 blur-[100px]" />
      <div className="absolute bottom-40 left-0 w-32 h-32 bg-emerald-500/10 blur-[100px]" />

      {/* Branding */}
      <Link href="/" className="flex items-center gap-3 group mb-16 relative z-10">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-xl">
          <ShieldCheck className="text-brand-emerald w-7 h-7" />
        </div>
        <span className="font-display font-black text-2xl tracking-tighter text-white">
          Admin<span className="text-brand-accent italic">Panel</span>
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 space-y-2 relative z-10">
        {adminItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center justify-between p-4 rounded-2xl font-bold transition-all group",
              pathname === item.href 
                ? "bg-brand-emerald text-white shadow-xl shadow-brand-emerald/20 border border-white/10" 
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <div className="flex items-center gap-4">
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="text-sm tracking-tight">{item.name}</span>
            </div>
            {pathname !== item.href && (
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </Link>
        ))}
      </nav>

      {/* User Status */}
      <div className="mt-12 mb-8 p-5 bg-white/5 rounded-[2rem] border border-white/10 flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-[1rem] bg-brand-accent/20 flex items-center justify-center font-display font-black text-brand-accent lowercase italic">
            {admin?.full_name?.[0] || "A"}
          </div>
          <div>
            <div className="font-black text-white text-sm leading-none mb-1 lowercase italic">
               {admin?.full_name || "Accessing..."}
            </div>
            <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               Global Access
            </div>
          </div>
      </div>

      {/* Logout */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-4 p-4 rounded-2xl text-slate-500 font-bold hover:bg-white/5 hover:text-white transition-all relative z-10 group"
      >
        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Logout Session</span>
      </button>
    </aside>
  );
}
