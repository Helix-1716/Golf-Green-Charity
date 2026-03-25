"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Trophy, 
  LayoutDashboard, 
  Target, 
  Heart, 
  LogOut, 
  CreditCard,
  ChevronRight,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

const menuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Scores", href: "/dashboard/scores", icon: Target },
  { name: "Charity Impact", href: "/dashboard/charity", icon: Heart },
  { name: "Prize Draws", href: "/dashboard/draws", icon: Trophy },
  { name: "Membership", href: "/dashboard/settings", icon: CreditCard },
  { name: "Account Details", href: "/dashboard/profile", icon: User },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setIsMounted(true);
    const loadAvatar = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const saved = localStorage.getItem(`avatar_${user.id}`);
      if (saved) {
        setAvatar(saved);
      } else {
        const { data: prof } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', user.id)
          .single();
        
        if (prof?.avatar_url) {
          setAvatar(prof.avatar_url);
          localStorage.setItem(`avatar_${user.id}`, prof.avatar_url);
        }
      }
    };

    loadAvatar();
    window.addEventListener('avatarUpdate', loadAvatar);
    return () => window.removeEventListener('avatarUpdate', loadAvatar);
  }, []);

  if (!isMounted) return <aside className="w-80 bg-white border-r border-slate-100 flex flex-col pt-8 pb-10 px-8 h-screen sticky top-0 md:flex hidden" />;

  return (
    <aside className="w-80 bg-white border-r border-slate-100 flex flex-col pt-8 pb-10 px-8 h-screen sticky top-0 md:flex hidden">
      {/* Branding */}
      <Link href="/" className="flex items-center gap-3 group mb-16">
        <div className="w-12 h-12 bg-brand-emerald rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg">
          <Trophy className="text-white w-7 h-7" />
        </div>
        <span className="font-display font-black text-2xl tracking-tighter text-brand-emerald">
          Golf<span className="text-brand-accent italic">for</span>Good
        </span>
      </Link>

      {/* Profile Summary */}
      <div className="mb-12 p-5 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-4 premium-shadow">
          <div className="w-14 h-14 rounded-[1.25rem] bg-brand-emerald flex items-center justify-center font-display font-black text-2xl text-white overflow-hidden">
             {avatar ? (
               <img src={avatar} alt="Me" className="w-full h-full object-cover" />
             ) : (
               "AG"
             )}
          </div>
          <div>
            <div className="font-black text-brand-emerald text-lg leading-none mb-1">Anirban G.</div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               Premium Plus
            </div>
          </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center justify-between p-4 rounded-2xl font-bold transition-all group",
              pathname === item.href 
                ? "bg-brand-emerald text-white shadow-xl" 
                : "text-slate-500 hover:bg-emerald-50 hover:text-brand-emerald"
            )}
          >
            <div className="flex items-center gap-4">
              <item.icon className="w-6 h-6" />
              <span className="text-base tracking-tight">{item.name}</span>
            </div>
            {pathname !== item.href && (
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <button className="flex items-center gap-4 p-4 rounded-2xl text-rose-500 font-bold hover:bg-rose-50 transition-all mt-6 group">
        <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center transition-colors group-hover:bg-rose-100">
           <LogOut className="w-5 h-5" />
        </div>
        <span>Sign Out</span>
      </button>
    </aside>
  );
}

export function DashboardTopNav() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return <header className="md:hidden sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 px-6 z-40 flex items-center justify-between" />;

  return (
    <header className="md:hidden sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 px-6 z-40 flex items-center justify-between">
       <Link href="/" className="flex items-center gap-2">
            <Trophy className="text-brand-emerald w-6 h-6" />
            <span className="font-display font-black text-xl text-brand-emerald">Golf for Good</span>
       </Link>
       <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
          <ChevronRight className="w-6 h-6 rotate-90" />
       </button>
    </header>
  );
}
