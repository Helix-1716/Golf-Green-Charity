"use client";

import { useState } from "react";
import { 
  CreditCard, 
  Settings, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  ChevronRight,
  LogOut,
  Trophy,
  History,
  Lock
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { DashboardSidebar, DashboardTopNav } from "@/components/layout/DashboardNav";
import { toast } from "sonner";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const handlePortal = async () => {
    setLoading(true);
    toast.message("Redirecting to Stripe...", {
      description: "You can manage your subscription, cards, and invoices in our secure portal.",
    });
    
    try {
      const response = await fetch("/api/portal", {
        method: "POST",
      });
      
      const data = await response.json();
      
      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Please subscribe to a plan first.");
      }
    } catch (error: any) {
      toast.error("Portal Error", {
        description: error.message || "Failed to access billing portal.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardTopNav />
        <main className="p-8 md:p-14 max-w-7xl mx-auto w-full">
           <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-16 bg-white rounded-[2rem] flex items-center justify-center shadow-xl rotate-12 transition-transform duration-500">
                  <Settings className="text-brand-emerald w-8 h-8" />
              </div>
              <div>
                  <h1 className="font-display font-black text-4xl text-brand-emerald leading-none italic mb-1">Membership Settings</h1>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Billing & Account Management</p>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left: General Settings */}
              <div className="lg:col-span-1 space-y-8">
                 <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl">
                    <h3 className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] mb-10">Account Identity</h3>
                    <div className="flex flex-col items-center text-center">
                       <div className="w-24 h-24 bg-brand-emerald rounded-[2.5rem] flex items-center justify-center font-display font-black text-4xl text-white mb-6 shadow-2xl rotate-3">
                          AG
                       </div>
                       <div className="font-black text-slate-900 text-2xl italic leading-none mb-1.5 underline decoration-emerald-100 decoration-8 underline-offset-[-2px]">Anirban G.</div>
                       <div className="text-sm font-bold text-slate-400 mb-8">anirban@golfgood.com</div>
                       <button className="w-full py-4 rounded-xl border-2 border-slate-50 text-xs font-black uppercase tracking-widest text-slate-400 hover:border-brand-emerald hover:text-brand-emerald transition-all">
                          Update Photo
                       </button>
                    </div>
                 </div>

                 {/* Security Card */}
                 <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-all duration-700" />
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <Lock className="text-brand-accent w-10 h-10 mb-6" />
                        <h3 className="font-display font-black text-xl italic mb-3">Login Security</h3>
                        <p className="text-slate-400 text-xs font-medium leading-relaxed mb-8 max-w-[160px]">Update your password and enable 2FA protection.</p>
                        <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black tracking-widest uppercase hover:bg-white hover:text-slate-900 transition-all">Manage Security</button>
                    </div>
                 </div>
              </div>

              {/* Right: Billing & Sub */}
              <div className="lg:col-span-2 space-y-8">
                 <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8">
                       <ShieldCheck className="w-10 h-10 text-emerald-100 transition-colors group-hover:text-emerald-500" />
                    </div>
                    <div className="flex items-center gap-4 mb-12">
                       <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                          <Zap className="text-brand-emerald w-6 h-6" />
                       </div>
                       <div>
                          <h2 className="font-display font-black text-2xl text-slate-900 italic tracking-tight leading-none mb-1">Premium Plus</h2>
                          <div className="inline-flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">Active Membership</div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 py-8 border-y border-slate-50">
                       <div className="space-y-4">
                          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">Pricing Plan</div>
                          <div className="text-3xl font-black text-slate-900 italic tracking-tighter">£24.99 <span className="text-xs font-bold text-slate-500 uppercase not-italic tracking-widest">/ Month</span></div>
                       </div>
                       <div className="space-y-4">
                          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">Next Billing Date</div>
                          <div className="text-xl font-black text-slate-900 italic tracking-tighter">12 April 2026</div>
                       </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                       <button 
                         onClick={handlePortal}
                         disabled={loading}
                         className="flex-1 bg-brand-emerald text-white py-6 rounded-2xl font-black text-lg hover:bg-brand-emerald/90 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                       >
                          Open Stripe Portal
                          <ArrowRight className="w-5 h-5" />
                       </button>
                       <button className="flex-1 bg-slate-50 text-slate-400 py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-slate-900 hover:bg-slate-100 transition-all">
                          Pause Subscription
                       </button>
                    </div>
                    
                    <div className="mt-8 p-6 bg-slate-50 rounded-2xl flex items-start gap-4 border border-slate-100/50">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                           <CreditCard className="text-slate-400 w-5 h-5" />
                        </div>
                        <div className="flex-1">
                           <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-black text-slate-900">Visa ending in 4242</span>
                              <span className="text-[10px] font-black text-brand-emerald uppercase tracking-widest">Primary</span>
                           </div>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Expires 04 / 2028</p>
                        </div>
                    </div>
                 </div>

                 <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl overflow-hidden">
                    <div className="flex items-center gap-4 mb-10">
                       <h3 className="font-display font-black text-xl italic text-slate-900">Billing History</h3>
                       <div className="h-px flex-1 bg-slate-100" />
                    </div>
                    <div className="space-y-4">
                       {[
                         { date: "12 Mar 2026", amount: "£24.99", id: "#INV-92842", charity: "£5.00" },
                         { date: "12 Feb 2026", amount: "£24.99", id: "#INV-91251", charity: "£5.00" },
                         { date: "12 Jan 2026", amount: "£24.99", id: "#INV-89512", charity: "£5.00" },
                       ].map((inv) => (
                         <div key={inv.id} className="p-6 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-lg transition-all group cursor-pointer flex items-center justify-between">
                            <div className="flex items-center gap-5">
                               <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm">
                                  <History className="text-slate-300 w-5 h-5" />
                               </div>
                               <div>
                                  <div className="font-black text-slate-900 text-base italic leading-none mb-1">{inv.date}</div>
                                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{inv.id}</div>
                               </div>
                            </div>
                            <div className="text-right">
                               <div className="font-black text-brand-emerald text-xl italic tracking-tighter leading-none mb-1">{inv.amount}</div>
                               <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Incl. {inv.charity} Charity</div>
                            </div>
                         </div>
                       ))}
                    </div>
                    <button className="w-full mt-10 py-5 text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] hover:text-brand-emerald transition-colors">Download All Statements</button>
                 </div>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}
