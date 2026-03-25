"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  History, 
  Calendar, 
  Users, 
  Zap, 
  ArrowRight, 
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Gift,
  DollarSign
} from "lucide-react";
import { cn, formatDate, formatCurrency } from "@/lib/utils";
import { AdminSidebar } from "@/components/layout/AdminNav";
import { toast } from "sonner";

const drawHistory = [
  { id: 1, month: "March", year: 2026, winner: "Jessica R.", prize: "£2,500 + Full Set Taylormade", entries: 8124, date: "2026-03-31" },
  { id: 2, month: "February", year: 2026, winner: "Mike T.", prize: "£2,500 + 4-Ball at Wentworth", entries: 7842, date: "2026-02-28" },
  { id: 3, month: "January", year: 2026, winner: "Sarah M.", prize: "£2,500 + Dubai Desert Classic Tickets", entries: 7210, date: "2026-01-31" },
];

export default function AdminDrawsPage() {
  const [drawing, setDrawing] = useState(false);
  const [winner, setWinner] = useState<{ name: string; prize: string } | null>(null);

  const handleRunDraw = () => {
    setDrawing(true);
    setWinner(null);
    
    // Simulate complex draw calculation
    setTimeout(() => {
      setDrawing(false);
      const newWinner = { name: "Anirban G.", prize: "£2,500 + Titleist GT3 Driver" };
      setWinner(newWinner);
      toast.success("Draw Completed!", { 
        description: `${newWinner.name} has been selected as the April winner.` 
      });
    }, 4000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <main className="p-10 md:p-14 max-w-7xl mx-auto w-full">
           {/* Header */}
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-brand-gold rounded-[2rem] flex items-center justify-center shadow-xl rotate-12 transition-transform duration-500">
                    <Trophy className="text-white w-8 h-8" />
                 </div>
                 <div>
                    <h1 className="font-display font-black text-4xl text-slate-900 leading-none italic mb-1">Prize Management</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Monthly Draw Engine & Archive</p>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Active Draw Engine */}
              <div className="space-y-8">
                 <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8">
                       <Sparkles className="w-8 h-8 text-brand-gold animate-pulse" />
                    </div>
                    <div className="relative z-10">
                       <h2 className="font-display font-black text-4xl mb-2 italic tracking-tight">Execute Jackpot</h2>
                       <div className="text-emerald-400 font-black uppercase text-[10px] tracking-widest mb-10">FOR APRIL 2026 SESSION</div>
                       
                       <div className="space-y-6 mb-12">
                          <div className="flex justify-between items-center border-b border-white/10 pb-4">
                             <div className="flex items-center gap-3">
                                <Users className="w-4 h-4 text-slate-500" />
                                <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Verified Entries</span>
                             </div>
                             <span className="text-2xl font-black italic">8,421</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-white/10 pb-4">
                             <div className="flex items-center gap-3">
                                <Gift className="w-4 h-4 text-slate-500" />
                                <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Current Prize</span>
                             </div>
                             <span className="text-xl font-black italic text-brand-gold">£2,500 Cash + Gear</span>
                          </div>
                       </div>

                       <div className="relative">
                          <AnimatePresence mode="wait">
                            {drawing ? (
                               <motion.div 
                                 key="drawing"
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 exit={{ opacity: 0, scale: 0.9 }}
                                 className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center flex flex-col items-center gap-4"
                               >
                                  <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
                                  <div className="text-xs font-black uppercase tracking-widest animate-pulse">Scanning eligible metadata...</div>
                                  <div className="flex gap-2">
                                     {[...Array(5)].map((_, i) => (
                                       <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                                     ))}
                                  </div>
                               </motion.div>
                            ) : winner ? (
                               <motion.div 
                                 key="winner"
                                 initial={{ scale: 0.8, opacity: 0 }}
                                 animate={{ scale: 1, opacity: 1 }}
                                 className="w-full bg-brand-accent rounded-3xl p-8 text-white relative shadow-[0_20px_50px_rgba(16,185,129,0.3)]"
                               >
                                  <div className="absolute -top-4 -right-4 bg-white text-brand-emerald p-2 rounded-xl shadow-lg rotate-12">
                                     <CheckCircle2 className="w-6 h-6" />
                                  </div>
                                  <div className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-90">WINNER SELECTED</div>
                                  <div className="text-4xl font-black italic leading-none mb-3 tracking-tighter">{winner.name}</div>
                                  <div className="text-[10px] font-bold text-emerald-900 border-t border-white/20 pt-4 flex justify-between">
                                     <span>{winner.prize}</span>
                                     <span>VALIDATED</span>
                                  </div>
                               </motion.div>
                            ) : (
                               <button 
                                 onClick={handleRunDraw}
                                 className="w-full bg-brand-accent text-brand-emerald py-6 rounded-2xl font-black text-xl hover:bg-white transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 group"
                               >
                                  Run Draw Engine
                                  <Zap className="w-6 h-6 fill-brand-emerald group-hover:animate-bounce" />
                               </button>
                            )}
                          </AnimatePresence>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl">
                    <div className="flex items-center gap-4 mb-8">
                       <AlertCircle className="w-6 h-6 text-amber-500" />
                       <h3 className="font-display font-black text-xl text-slate-900 italic">Audit Log</h3>
                    </div>
                    <div className="space-y-4">
                       {[
                         { time: "09:42 AM", event: "Subscription status verification completed" },
                         { time: "09:38 AM", event: "Stableford rules validation: 8,421 eligible" },
                         { time: "Yesterday", event: "Charity payout ledger generated for March" },
                       ].map((log, i) => (
                         <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 transition-all">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest min-w-[70px] leading-relaxed pt-0.5">{log.time}</span>
                            <span className="text-xs font-bold text-slate-600 leading-relaxed">{log.event}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Draw History */}
              <div>
                 <div className="bg-white rounded-[3rem] border border-white shadow-2xl overflow-hidden h-full flex flex-col">
                    <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center shadow-sm">
                             <History className="text-slate-400 w-6 h-6" />
                          </div>
                          <h2 className="font-display font-black text-2xl text-slate-900 italic tracking-tighter">Event Archive</h2>
                       </div>
                       <button className="text-[10px] font-black text-brand-emerald uppercase tracking-[0.2em] hover:underline decoration-2">Export CSV</button>
                    </div>
                    
                    <div className="flex-1 overflow-auto">
                       {drawHistory.map((draw) => (
                         <div key={draw.id} className="p-10 border-b border-slate-50 hover:bg-slate-50 transition-all group relative overflow-hidden">
                            <div className="absolute inset-0 bg-brand-gold/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            <div className="relative z-10">
                               <div className="flex items-center justify-between mb-6">
                                  <div className="flex items-center gap-4">
                                     <div className="text-sm font-black text-slate-900 italic uppercase bg-slate-100 px-3 py-1 rounded-lg">{draw.month} {draw.year}</div>
                                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{draw.entries} PARTICIPANTS</span>
                                  </div>
                                  <div className="text-xs font-bold text-slate-400 tracking-tighter">{formatDate(draw.date)}</div>
                               </div>
                               
                               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                  <div className="flex items-center gap-5">
                                     <div className="w-14 h-14 bg-white rounded-2xl border border-slate-100 flex items-center justify-center font-display font-black text-2xl text-brand-emerald shadow-sm group-hover:rotate-6 transition-all">
                                        {draw.winner[0]}
                                     </div>
                                     <div>
                                        <div className="flex items-center gap-2 mb-1">
                                           <span className="font-black text-slate-900 text-xl tracking-tight">{draw.winner}</span>
                                           <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        </div>
                                        <div className="text-[10px] font-black text-brand-gold uppercase tracking-widest">{draw.prize}</div>
                                     </div>
                                  </div>
                                  <button className="px-6 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-brand-emerald hover:border-brand-emerald/30 group-hover:bg-brand-emerald group-hover:text-white transition-all shadow-sm">
                                     View Entry Logs
                                  </button>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                    
                    <div className="p-10 text-center bg-slate-50/50">
                       <p className="text-[10px] font-black uppercase text-slate-300 tracking-[0.3em]">Foundation Verified Draw Engine v2.4.1</p>
                    </div>
                 </div>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}
