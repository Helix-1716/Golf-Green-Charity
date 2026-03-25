"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Trophy, 
  Users, 
  Globe, 
  ChevronRight, 
  Sparkles, 
  Zap, 
  TrendingUp,
  ShieldCheck,
  CreditCard,
  UserPlus,
  Heart,
  Calendar,
  ArrowRight
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { AdminSidebar } from "@/components/layout/AdminNav";
import { toast } from "sonner";

const mockUsers = [
  { id: 1, name: "Anirban G.", status: "Active", sub: "Premium Plus", charity: "Green Golf Earth", impact: "£148.50" },
  { id: 2, name: "Jessica R.", status: "Active", sub: "Club Pro", charity: "Mental Par", impact: "£82.00" },
  { id: 3, name: "Liam O.", status: "Inactive", sub: "None", charity: "None", impact: "£0.00" },
  { id: 4, name: "Sarah M.", status: "Active", sub: "Basic", charity: "Fairway Kids", impact: "£24.50" },
];

export default function AdminPage() {
  const triggerDraw = () => {
    toast.success("Draw Engine Initialized", {
      description: "Analyzing 8,421 eligible entries for April Jackpot...",
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {/* Mobile Nav Placeholder */}
        <header className="md:hidden h-20 bg-slate-900 flex items-center justify-between px-6 border-b border-white/10">
           <Trophy className="text-brand-accent w-6 h-6" />
           <span className="text-white font-black text-xl">Admin</span>
           <div className="w-10 h-10 rounded-full bg-slate-800" />
        </header>

        <main className="p-10 md:p-14 max-w-7xl mx-auto w-full">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-16">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-[2rem] flex items-center justify-center shadow-xl rotate-[-12deg] group hover:rotate-0 transition-transform duration-500">
                    <ShieldCheck className="text-brand-emerald w-8 h-8" />
                </div>
                <div>
                    <h1 className="font-display font-black text-4xl text-slate-900 leading-none italic mb-1">Global Overview</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Platform Management & Analytics</p>
                </div>
             </div>
             <div className="flex gap-4">
                <button className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-400 font-bold text-xs hover:bg-slate-100 transition-all flex items-center gap-2">
                   <Calendar className="w-4 h-4" />
                   Last 30 Days
                </button>
                <div className="h-10 w-px bg-slate-200 mx-2" />
                <button className="bg-brand-emerald text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-lg hover:shadow-emerald-900/10 active:scale-95 flex items-center gap-2">
                   Generate Report
                </button>
             </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
             {[
               { label: "Total Revenue", value: "£108,421", change: "+12.4%", icon: CreditCard, color: "text-blue-500", bg: "bg-blue-50" },
               { label: "Active Members", value: "8,421", change: "+8.1%", icon: Users, color: "text-brand-accent", bg: "bg-emerald-50" },
               { label: "Charity Raised", value: "£142,840", change: "+5.2%", icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
               { label: "Prize Pool", value: "£25,000", change: "Fixed", icon: Trophy, color: "text-brand-gold", bg: "bg-amber-50" },
             ].map((stat, i) => (
               <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                        <stat.icon className="w-6 h-6" />
                    </div>
                    {stat.change !== "Fixed" && (
                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
                    )}
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900 italic tracking-tight mb-2 leading-none">{stat.value}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</div>
                  </div>
               </div>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
             {/* Draw Control */}
             <div className="lg:col-span-1">
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden h-full flex flex-col">
                   <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent/20 blur-[100px] -mr-20 -mt-20" />
                   <div className="relative z-10 flex-1">
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-10 border border-white/5">
                         <Trophy className="text-brand-gold w-8 h-8" />
                      </div>
                      <h2 className="font-display font-black text-3xl mb-4 italic tracking-tighter leading-none underline decoration-brand-accent/30 decoration-8 underline-offset-4">April Draw Engine</h2>
                      <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10 max-w-xs">
                         Manually trigger the monthly prize selection process. Ensure all score submissions are validated first.
                      </p>
                      
                      <div className="space-y-6 mb-12">
                         <div className="flex justify-between items-end border-b border-white/10 pb-4">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Eligible Members</span>
                            <span className="text-xl font-black italic">8,421</span>
                         </div>
                         <div className="flex justify-between items-end border-b border-white/10 pb-4">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Draw Date</span>
                            <span className="text-xl font-black italic">30 APR</span>
                         </div>
                      </div>
                   </div>
                   
                   <button 
                      onClick={triggerDraw}
                      className="w-full bg-brand-accent text-brand-emerald py-6 rounded-2xl font-black text-xl hover:bg-white hover:scale-105 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 relative z-10 group"
                   >
                       Execute Draw
                       <Zap className="w-5 h-5 fill-brand-emerald group-hover:animate-pulse" />
                   </button>
                </div>
             </div>

             {/* Recent Activity / User Table */}
             <div className="lg:col-span-2">
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col h-full">
                   <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                            <Users className="text-brand-emerald w-6 h-6" />
                         </div>
                         <h2 className="font-display font-black text-2xl text-slate-900 italic tracking-tighter">New Arrivals</h2>
                      </div>
                      <Link href="/admin/users" className="text-xs font-black text-brand-emerald hover:underline decoration-2 underline-offset-4 uppercase tracking-widest">Full Directory</Link>
                   </div>
                   
                   <div className="px-10 py-6 space-y-4 flex-1">
                      {mockUsers.map((u) => (
                        <div key={u.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-xl font-black text-brand-emerald transition-transform group-hover:rotate-6">
                                 {u.name[0]}
                              </div>
                              <div>
                                 <div className="font-black text-slate-900 text-lg leading-none mb-1.5">{u.name}</div>
                                 <div className="flex items-center gap-2">
                                    <div className={cn("w-1.5 h-1.5 rounded-full", u.status === "Active" ? "bg-emerald-500" : "bg-slate-300")} />
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{u.status} • {u.sub}</span>
                                 </div>
                              </div>
                           </div>
                           
                           <div className="flex items-center gap-12 text-right">
                              <div className="hidden md:block">
                                 <div className="text-sm font-black text-slate-900 uppercase italic tracking-tighter mb-1">{u.charity}</div>
                                 <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Selected Cause</div>
                              </div>
                              <div className="w-24">
                                 <div className="text-lg font-black text-brand-emerald leading-none mb-1">{u.impact}</div>
                                 <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-right">Impact</div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-emerald transition-colors translate-x-1 group-hover:translate-x-2 transition-transform" />
                           </div>
                        </div>
                      ))}
                   </div>
                   
                   <div className="p-8 bg-slate-900/5 text-center mt-auto border-t border-slate-50">
                       <button className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] hover:text-brand-emerald transition-colors flex items-center justify-center gap-2 mx-auto">
                          Global System Audit Logs
                          <ArrowRight className="w-4 h-4" />
                       </button>
                   </div>
                </div>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}
