"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Target, 
  Plus, 
  History, 
  Calendar, 
  TrendingUp, 
  Zap,
  ArrowRight,
  Filter,
  MoreVertical,
  X,
  PlusCircle
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { DashboardSidebar, DashboardTopNav } from "@/components/layout/DashboardNav";
import { toast } from "sonner";
import { QuickScoreModal } from "@/components/dashboard/QuickScoreModal";
import { createClient } from "@/lib/supabase";

export default function ScoresPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchScores = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    // FETCH DB
    const { data: dbData } = await supabase
      .from('scores')
      .select('*')
      .order('date', { ascending: false });
      
    let all = dbData || [];

    // FETCH LOCAL
    if (typeof window !== 'undefined') {
       const local = JSON.parse(localStorage.getItem(`scores_${user.id}`) || '[]');
       all = [...all, ...local].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    setScores(all);
    setLoading(false);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const avg = scores.length > 0 
    ? (scores.reduce((acc, s) => acc + s.score, 0) / scores.length).toFixed(1)
    : "0.0";

  return (
    <>
      <main className="p-8 md:p-14 max-w-7xl mx-auto w-full">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-brand-emerald rounded-[2rem] flex items-center justify-center shadow-xl rotate-12 group hover:rotate-0 transition-transform duration-500">
                    <Target className="text-white w-8 h-8" />
                </div>
                <div>
                    <h1 className="font-display font-black text-4xl text-brand-emerald leading-none italic mb-1">My Performance</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Stableford Mastery & Tracking</p>
                </div>
             </div>
             <button 
                onClick={() => setShowAdd(true)}
                className="bg-brand-emerald text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-brand-emerald/90 transition-all flex items-center gap-3 shadow-lg hover:shadow-emerald-900/10 active:scale-95 group"
             >
                Submit New Score
                <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform" />
             </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
             {/* Left Column: Stats & Submit */}
             <div className="lg:col-span-1 space-y-8">
                {/* Rolling Stat Card */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-12 -mt-12 transition-all group-hover:scale-150 duration-700" />
                    <div className="relative z-10">
                        <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 flex items-center gap-2">
                           <TrendingUp className="w-3.5 h-3.5 text-brand-accent" />
                           Rolling Status
                        </div>
                        <div className="flex items-end gap-3 mb-6">
                            <span className="text-6xl font-black text-brand-emerald leading-none italic">{avg}</span>
                            <span className="text-sm font-bold text-emerald-500 pb-1">{scores.length > 0 ? "+1.4 pts" : "New"}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[200px]">
                           Calculated from your latest {scores.length} submissions. Keep it up!
                        </p>
                    </div>
                </div>

                {/* Draw Rules Info */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <Zap className="w-6 h-6 text-brand-gold fill-brand-gold" />
                    </div>
                    <h3 className="font-display font-black text-xl mb-6 italic tracking-tight underline decoration-brand-accent/30 decoration-4">Draw Eligibility</h3>
                    <div className="space-y-4">
                       {[
                         { label: "Active Subscription", status: true },
                         { label: "2 Scores (Current Month)", status: scores.length >= 2 },
                         { label: "Verified Charity Choice", status: true },
                       ].map((rule, i) => (
                         <div key={i} className="flex items-center gap-3">
                            <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", rule.status ? "bg-emerald-500" : "bg-slate-700")}>
                               {rule.status ? <Plus className="w-3 h-3 text-white" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />}
                            </div>
                            <span className={cn("text-xs font-bold", rule.status ? "text-white" : "text-slate-500")}>{rule.label}</span>
                         </div>
                       ))}
                    </div>
                    <div className="mt-10 p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                        <div className="text-[9px] font-black uppercase text-emerald-400 tracking-widest mb-1">CURRENT STATUS</div>
                        <div className="text-lg font-black italic tracking-tighter uppercase">
                          {scores.length >= 2 ? "ELIBIGLE!" : `${2 - scores.length} MORE NEEDED`}
                        </div>
                    </div>
                </div>
             </div>

             {/* Right Column: Score History */}
             <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                   <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                            <History className="text-brand-emerald w-5 h-5" />
                         </div>
                         <h2 className="font-display font-black text-xl text-slate-900 italic">Submission History</h2>
                      </div>
                      <button className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                        <Filter className="w-4 h-4 text-slate-400" />
                      </button>
                   </div>
                   
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead>
                            <tr className="bg-slate-50">
                               <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date</th>
                               <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Golf Course</th>
                               <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Score</th>
                               <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">HCP</th>
                               <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Action</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-50">
                            {scores.length > 0 ? (
                              scores.map((s, i) => (
                                <tr key={s.id} className="hover:bg-brand-emerald/[0.02] transition-colors group cursor-pointer">
                                   <td className="px-8 py-6">
                                      <div className="flex items-center gap-3">
                                         <Calendar className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-emerald transition-colors" />
                                         <span className="text-sm font-bold text-slate-600">{formatDate(s.date)}</span>
                                       </div>
                                   </td>
                                   <td className="px-8 py-6">
                                      <span className="text-sm font-black text-slate-900 group-hover:text-brand-emerald group-hover:translate-x-1 inline-block transition-all duration-500">{s.course}</span>
                                   </td>
                                   <td className="px-8 py-6 text-center">
                                      <div className="inline-flex w-10 h-10 bg-white rounded-xl items-center justify-center font-black text-brand-emerald text-lg border border-slate-100 group-hover:bg-brand-emerald group-hover:text-white group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-emerald-900/10 transition-all duration-500">
                                         {s.score}
                                      </div>
                                   </td>
                                   <td className="px-8 py-6 text-center">
                                       <div className="text-xs font-bold text-slate-400">
                                          <div className="group-hover:text-brand-emerald transition-colors">18.2</div>
                                          <div className="hidden group-hover:block text-[8px] font-black uppercase tracking-tighter text-emerald-500 animate-in fade-in slide-in-from-bottom-1">-0.2</div>
                                       </div>
                                   </td>
                                   <td className="px-8 py-6 text-right">
                                       <div className="flex items-center justify-end gap-3">
                                          <div className="hidden group-hover:flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-lg px-2 py-1 animate-in fade-in slide-in-from-right-2">
                                             <div className="flex flex-col items-center">
                                                <span className="text-[7px] font-black uppercase text-slate-400 leading-none mb-0.5">Rank</span>
                                                <span className="text-[9px] font-black text-amber-500 leading-none">#42</span>
                                             </div>
                                          </div>
                                          <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all">
                                             <MoreVertical className="w-4 h-4 text-slate-300 hover:text-slate-900" />
                                          </button>
                                       </div>
                                   </td>
                                 </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={5} className="px-8 py-20 text-center text-slate-300 font-medium italic">No scores in archive</td>
                              </tr>
                            )}
                         </tbody>
                      </table>
                   </div>
                   <div className="p-10 text-center bg-slate-50/50">
                      <button className="text-brand-emerald font-black text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">Load Older Submissions</button>
                   </div>
                </div>
             </div>
          </div>
        </main>

        <QuickScoreModal isOpen={showAdd} onClose={() => setShowAdd(false)} onSuccess={fetchScores} />
    </>
  );
}
