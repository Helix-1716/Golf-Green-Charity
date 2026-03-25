"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Target, 
  Heart, 
  ChevronRight, 
  Sparkles, 
  Zap, 
  TrendingUp,
  Clock,
  LayoutDashboard
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { createClient } from "@/lib/supabase";
import { QuickScoreModal } from "@/components/dashboard/QuickScoreModal";
import { PrizeModal } from "@/components/dashboard/PrizeModal";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrizeModalOpen, setIsPrizeModalOpen] = useState(false);
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const supabase = createClient();

  const fetchScores = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    const { data: dbData, error } = await supabase
      .from('scores')
      .select('*')
      .order('date', { ascending: false })
      .limit(20);
      
    let allScores = dbData || [];
    
    if (typeof window !== 'undefined') {
      const local = JSON.parse(localStorage.getItem(`scores_${user.id}`) || '[]');
      allScores = [...allScores, ...local]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);
    }

    setScores(allScores);
    setLoading(false);
  };

  useEffect(() => {
    setIsMounted(true);
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      await fetchScores();
    };
    init();
  }, []);

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Golfer";
  
  const avg = scores.length > 0 
    ? (scores.reduce((acc, s) => acc + s.score, 0) / scores.length).toFixed(1)
    : "0.0";

  if (!isMounted) return null;

  return (
    <>
      <main className="p-10 md:p-14 overflow-auto max-w-7xl mx-auto w-full">
          {/* Top Row: Welcome & Eligibility */}
          <div className="flex flex-col lg:flex-row items-stretch gap-8 mb-12">
            <div className="flex-1 bg-brand-emerald rounded-[3rem] p-10 relative overflow-hidden shadow-2xl premium-shadow group">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-accent/20 skew-x-12 mix-blend-screen -z-0" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-emerald-50/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-100 mb-6 border border-emerald-100/10">
                  <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                  Premium Plus Member
                </div>
                <h1 className="font-display font-black text-4xl leading-none text-white mb-4 italic transition-transform group-hover:translate-x-1 duration-500">
                  Welcome back,<br />{displayName}
                </h1>
                <p className="text-emerald-100/70 font-medium max-w-xs mb-8 text-sm leading-relaxed">
                  Your play has raised <span className="text-white font-bold underline decoration-brand-accent/50 decoration-4 underline-offset-4">£148.50</span> for Green Golf Earth so far.
                </p>
                <div className="flex items-center gap-4">
                   <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-brand-accent text-brand-emerald px-6 py-3 rounded-2xl font-black text-sm hover:bg-emerald-50 transition-all flex items-center gap-2 shadow-lg active:scale-95 group/btn"
                   >
                      Quick Score Entry
                      <Zap className="w-4 h-4 fill-brand-emerald group-hover:scale-125 transition-transform" />
                   </button>
                   <div className="h-10 w-px bg-emerald-100/20" />
                   <div className="text-emerald-100/50 text-xs font-bold uppercase tracking-wider">MARCH PRIZE DRAW</div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-96 bg-white rounded-[3rem] border border-slate-100 p-10 shadow-xl flex flex-col items-center text-center justify-center group hover:bg-slate-900 transition-colors duration-500 overflow-hidden relative">
               <div className="absolute top-0 right-0 pt-6 pr-6 opacity-0 group-hover:opacity-100 transition-all">
                  <ChevronRight className="w-6 h-6 text-slate-700" />
               </div>
               <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 group-hover:scale-110 transition-all duration-500">
                   <Trophy className="text-brand-emerald w-10 h-10 group-hover:text-emerald-400 group-hover:animate-bounce" />
               </div>
               <div className="font-display font-black text-2xl text-slate-900 group-hover:text-white mb-2 italic">ELIGIBLE</div>
               <div className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-6">April £2,500 Prize Draw</div>
               <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className={cn("w-3 h-3 rounded-full", s <= 4 ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-slate-100 group-hover:bg-slate-800")} />
                  ))}
               </div>
               <div className="mt-6 text-[10px] text-slate-400 font-bold uppercase group-hover:text-emerald-400/70 transition-colors">{scores.length} OF 2 MIN SCORES SUBMITTED</div>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Rolling Last 5 */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-lg">
                <div className="flex items-center justify-between mb-10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center">
                         <TrendingUp className="text-brand-emerald w-6 h-6" />
                      </div>
                      <div>
                         <h3 className="font-display font-black text-xl text-slate-900 italic leading-none">Rolling Performance</h3>
                         <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Last {scores.length} Stableford Average</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-4xl font-black text-brand-emerald leading-none italic">{avg}</div>
                      <div className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-1 justify-end mt-1">
                         <TrendingUp className="w-3 h-3" />
                         +1.4 pts
                      </div>
                   </div>
                </div>
                
                <div className="h-64 w-full flex items-end justify-between gap-4 py-4 px-2">
                   {scores.length > 0 ? (
                    scores.map((s, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-3 group/score">
                         <div className="h-full w-full bg-slate-50 rounded-2xl relative overflow-hidden flex flex-col justify-end">
                            <motion.div 
                               initial={{ height: 0 }}
                               animate={{ height: `${(s.score / 45) * 100}%` }}
                               transition={{ delay: i * 0.1, duration: 1, type: "spring" }}
                               className={cn(
                                 "w-full bg-brand-emerald rounded-t-xl group-hover/score:bg-brand-accent transition-colors relative overflow-hidden",
                                 i === 0 && "bg-brand-accent"
                               )}
                            >
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 opacity-50 blur-xl" />
                            </motion.div>
                         </div>
                         <div className="text-center">
                            <div className="text-xs font-black text-slate-400 group-hover/score:text-brand-emerald transition-colors">{s.score}</div>
                            <div className="text-[9px] font-bold text-slate-300 uppercase mt-1">{new Date(s.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</div>
                         </div>
                      </div>
                    ))
                   ) : (
                    <div className="w-full flex items-center justify-center text-slate-300 font-bold italic">No scores submitted yet</div>
                   )}
                </div>
            </div>

            {/* Charity Spotlight */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-lg relative overflow-hidden flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center shrink-0">
                      <Heart className="text-rose-500 w-6 h-6" />
                   </div>
                   <h3 className="font-display font-black text-xl text-slate-900 italic leading-none">Your Cause</h3>
                </div>
                <div className="flex-1 rounded-[2rem] bg-emerald-50/50 p-6 flex flex-col items-center justify-center text-center group border border-emerald-100/40 relative overflow-hidden mb-8">
                    <div className="text-5xl mb-4 group-hover:scale-125 transition-all duration-500">🌱</div>
                    <div className="font-bold text-brand-emerald text-lg mb-2">Green Golf Earth</div>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed max-w-[120px]">Removing the carbon footprint of the game.</p>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Impact</span>
                      <span className="text-lg font-black text-brand-emerald">£142k+</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-gradient-to-r from-brand-emerald to-brand-accent rounded-full" />
                   </div>
                   <Link 
                     href="/dashboard/charity"
                     className="w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest text-brand-emerald bg-emerald-50/50 hover:bg-brand-emerald hover:text-white transition-all flex items-center justify-center gap-2 group/btn shadow-sm hover:shadow-md active:scale-95"
                   >
                      Manage Charity
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                   </Link>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Recent Scores Table */}
             <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-lg">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center shrink-0">
                            <Clock className="text-amber-500 w-6 h-6" />
                        </div>
                        <h3 className="font-display font-black text-xl text-slate-900 italic leading-none">Recent Submissions</h3>
                    </div>
                    <button className="text-brand-emerald font-bold text-xs hover:underline decoration-2 underline-offset-4">View All</button>
                </div>
                <div className="space-y-4">
                   {scores.length > 0 ? (
                     scores.map((s) => (
                       <div 
                        key={s.id} 
                        className="group relative bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer"
                       >
                          <div className="flex items-center justify-between p-5 relative z-10">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center font-black text-brand-emerald text-lg group-hover:bg-brand-emerald group-hover:text-white group-hover:scale-110 transition-all duration-500">
                                   {s.score}
                                </div>
                                <div>
                                   <div className="font-bold text-slate-900 text-sm leading-none mb-1.5 group-hover:translate-x-1 transition-transform duration-500">{s.course}</div>
                                   <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">STABLEFORD • {new Date(s.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                                </div>
                             </div>
                             <div className="flex items-center gap-4">
                                <div className="hidden group-hover:flex items-center gap-4 text-right pr-4 border-r border-slate-100 transition-all duration-500 animate-in fade-in slide-in-from-right-4">
                                   <div>
                                      <div className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-0.5">Impact</div>
                                      <div className="text-[10px] font-black text-brand-emerald italic">+1.4</div>
                                   </div>
                                   <div>
                                      <div className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-0.5">Rank</div>
                                      <div className="text-[10px] font-black text-amber-500 italic">#42</div>
                                   </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-emerald group-hover:translate-x-1 transition-all duration-500" />
                             </div>
                          </div>
                          
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-emerald -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                       </div>
                     ))
                    ) : (
                     <div className="p-10 text-center text-slate-300 italic font-medium">No results found</div>
                    )}
                </div>
             </div>
             {/* Prize Banner */}
             <div 
               onClick={() => setIsPrizeModalOpen(true)}
               className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-lg relative overflow-hidden flex flex-col items-center justify-center group cursor-pointer active:scale-[0.98] transition-all"
             >
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
                 <div className="w-24 h-24 bg-brand-gold/10 rounded-full flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 rounded-full border-2 border-brand-gold/20 animate-ping" />
                    <Trophy className="text-brand-gold w-12 h-12" />
                 </div>
                 <div className="text-center relative z-10">
                    <div className="font-display font-black text-3xl text-slate-900 mb-2 italic">April Jackpot</div>
                    <div className="text-slate-500 text-sm font-medium mb-8">Next draw in <span className="text-brand-gold font-black">6 days, 4 hours</span></div>
                    <div className="p-4 bg-brand-emerald rounded-2xl text-white font-black text-xl shadow-xl flex items-center gap-3 group-hover:bg-brand-accent group-hover:text-brand-emerald transition-colors">
                       £2,500 Cash + Taylormade Qi10
                    </div>
                 </div>
                 <div className="mt-8 text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em] group-hover:text-brand-gold transition-colors">Limited to 10k Premium Members</div>
             </div>
          </div>
        </main>

        <QuickScoreModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onSuccess={fetchScores}
        />

        <PrizeModal 
            isOpen={isPrizeModalOpen}
            onClose={() => setIsPrizeModalOpen(false)}
            entriesCount={scores.length}
        />
    </>
  );
}
