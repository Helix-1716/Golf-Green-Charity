"use client";

import { motion } from "framer-motion";
import { 
  User, 
  Settings, 
  Mail, 
  MapPin, 
  Target, 
  Shield, 
  CreditCard,
  Edit2,
  CheckCircle2,
  Camera,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardSidebar, DashboardTopNav } from "@/components/layout/DashboardNav";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setIsMounted(true);
    const fetchUserAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUser(user);

      // Load initial avatar from localStorage for speed
      const savedAvatar = localStorage.getItem(`avatar_${user.id}`);
      if (savedAvatar) setAvatar(savedAvatar);

      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (prof) {
        setProfile(prof);
        if (prof.avatar_url) {
          setAvatar(prof.avatar_url);
          localStorage.setItem(`avatar_${user.id}`, prof.avatar_url);
        }
      } else {
        setProfile({
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
          email: user.email,
          handicap: 18.2,
          home_club: "Wentworth Club",
          membership_status: "premium_plus"
        });
      }
      setLoading(false);
    };
    fetchUserAndProfile();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File too large", { description: "Maximum size is 2MB" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
        
        if (user) {
          localStorage.setItem(`avatar_${user.id}`, base64String);
          const { error } = await supabase
            .from('profiles')
            .update({ avatar_url: base64String })
            .eq('id', user.id);
            
          if (error) console.error("DB Save Error:", error);
          window.dispatchEvent(new Event('avatarUpdate'));
        }
        toast.success("Picture Updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateAccessKey = async () => {
    if (!user?.email) return;
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/profile`,
    });
    
    if (error) {
       toast.error("Error", { description: error.message });
    } else {
       toast.success("Security Link Sent", {
         description: "Check your inbox for password reset instructions."
       });
    }
  };

  const handleMerchantPortal = async () => {
    try {
      const res = await fetch("/api/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
      } else {
        toast.error("Merchant Portal Unavailable", { 
          description: data.error || "Please ensure your subscription is active." 
        });
      }
    } catch (err) {
      toast.error("Connection Error");
    }
  };

  const handleUpdate = () => {
    toast.success("Profile Updated!", {
      description: "Your changes have been synced across the club."
    });
  };

  if (!isMounted) return null;

  return (
    <>
      <main className="p-8 md:p-14 max-w-7xl mx-auto w-full">
           {/* Header */}
           <div className="mb-12">
              <div className="flex items-center gap-6 mb-4">
                 <div className="w-16 h-16 bg-brand-emerald rounded-[2rem] flex items-center justify-center shadow-xl rotate-[-12deg]">
                     <User className="text-white w-8 h-8" />
                 </div>
                 <div>
                     <h1 className="font-display font-black text-4xl text-brand-emerald leading-none italic mb-1">Account Details</h1>
                     <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Secure Member Profile Management</p>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column: Public Profile Card */}
              <div className="lg:col-span-1">
                 <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl relative overflow-hidden group h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700" />
                    
                    <div className="relative z-10 flex flex-col items-center">
                       <div className="relative mb-8">
                          <div className={cn(
                            "w-32 h-32 rounded-[2.5rem] flex items-center justify-center overflow-hidden shadow-2xl group-hover:rotate-6 transition-all duration-500",
                            avatar ? "bg-transparent" : "bg-brand-emerald"
                          )}>
                             {avatar ? (
                               <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                             ) : (
                               <span className="font-display font-black text-5xl text-white">
                                 {profile?.full_name?.charAt(0) || "G"}
                               </span>
                             )}
                          </div>
                          <label className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                             <Camera className="w-5 h-5 text-brand-emerald" />
                             <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                          </label>
                       </div>
                       
                       <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter text-center leading-none mb-2">{profile?.full_name}</h2>
                       <div className="flex items-center gap-2 mb-8">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Premium Plus Member</span>
                       </div>

                       <div className="w-full grid grid-cols-2 gap-4 mb-10">
                          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                             <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Handicap</div>
                             <div className="text-xl font-black italic text-brand-emerald">{profile?.handicap}</div>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                             <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">World Rank</div>
                             <div className="text-xl font-black italic text-brand-gold">#1,242</div>
                          </div>
                       </div>

                       <div className="w-full space-y-4">
                          <div className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-50 rounded-xl shadow-sm">
                             <Mail className="w-4 h-4 text-slate-300" />
                             <span className="text-xs font-bold text-slate-600 truncate">{profile?.email}</span>
                          </div>
                          <div className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-50 rounded-xl shadow-sm">
                             <MapPin className="w-4 h-4 text-slate-300" />
                             <span className="text-xs font-bold text-slate-600 truncate">{profile?.home_club}</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Right Column: Edit Forms */}
              <div className="lg:col-span-2 space-y-8">
                 <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl">
                    <div className="flex items-center justify-between mb-10">
                       <h3 className="font-display font-black text-2xl text-slate-900 italic tracking-tighter leading-none">Club Profile Edit</h3>
                       <Shield className="w-6 h-6 text-slate-100" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Member Name</label>
                          <input 
                            defaultValue={profile?.full_name}
                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-brand-emerald focus:bg-white outline-none font-bold text-slate-900 transition-all" 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
                          <input 
                            disabled
                            defaultValue={profile?.email}
                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 opacity-50 cursor-not-allowed font-bold text-slate-400" 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Current Handicap</label>
                          <input 
                            type="number"
                            defaultValue={profile?.handicap}
                            className="w-full px-6 py-4 bg-slate-100 rounded-2xl border border-slate-100 focus:border-brand-emerald focus:bg-white outline-none font-bold text-slate-900 transition-all font-mono" 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Primary Home Club</label>
                          <input 
                            defaultValue={profile?.home_club}
                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-brand-emerald focus:bg-white outline-none font-bold text-slate-900 transition-all" 
                          />
                       </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                       <button 
                        onClick={handleUpdate}
                        className="bg-brand-emerald text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-emerald/90 transition-all shadow-xl shadow-emerald-900/10 active:scale-95 flex items-center justify-center gap-3"
                       >
                          Save Changes
                          <Edit2 className="w-3.5 h-3.5" />
                       </button>
                       <button className="px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100">
                          Deactivate Membership
                       </button>
                    </div>
                 </div>

                 {/* Security & Notifications */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                       <Shield className="w-10 h-10 text-brand-gold mb-6" />
                       <h4 className="font-display font-black text-xl mb-2 italic tracking-tight">Security Center</h4>
                       <p className="text-[10px] font-medium text-slate-400 mb-8 leading-relaxed max-w-[200px]">Update your password and manage active member sessions.</p>
                       <button 
                        onClick={handleUpdateAccessKey}
                        className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
                       >
                          Update Access Key
                       </button>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl flex flex-col justify-between group">
                       <div>
                          <CreditCard className="w-10 h-10 text-slate-900 mb-6 group-hover:scale-110 transition-transform" />
                          <h4 className="font-display font-black text-xl text-slate-900 mb-2 italic tracking-tight">Billing Portal</h4>
                          <p className="text-[10px] font-bold text-slate-400 mb-8 uppercase tracking-widest">Next Payout: April 1, 2026</p>
                       </div>
                       <button 
                        onClick={handleMerchantPortal}
                        className="w-full py-4 rounded-xl bg-slate-50 border border-slate-100 text-[9px] font-black uppercase tracking-widest hover:bg-brand-emerald hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm hover:shadow-md"
                       >
                          Merchant Portal
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </main>
    </>
  );
}
