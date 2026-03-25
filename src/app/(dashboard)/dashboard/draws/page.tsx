"use client";

import { motion } from "framer-motion";
import { 
  Trophy, 
  History, 
  Calendar, 
  Target, 
  Zap, 
  Sparkles,
  CheckCircle2,
  Clock,
  Gift,
  ArrowRight
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

const pastWinners = [
  { id: 1, month: "March", year: 2026, name: "Jessica R.", prize: "£2,500 + Full Set Taylormade", icon: "🏌️‍♀️" },
  { id: 2, month: "February", year: 2026, name: "Mike T.", prize: "£2,500 + 4-Ball at Wentworth", icon: "⛳" },
  { id: 3, month: "January", year: 2026, name: "Sarah M.", prize: "£2,500 + Dubai Desert Classic", icon: "🏜️" },
];

export default function PrizeDrawsPage() {
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchScores = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data: dbData } = await supabase
        .from('scores')
        .select('*')
        .order('date', { ascending: false });
        
      let all = dbData || [];
      if (typeof window !== 'undefined') {
        const local = JSON.parse(localStorage.getItem(`scores_${user.id}`) || '[]');
        all = [...all, ...local].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      setScores(all.filter((s: any) => new Date(s.date).getMonth() === new Date().getMonth()));
      setLoading(false);
    };
    fetchScores();
  }, []);

  const isEligible = scores.length >= 2;

  return (
    <>
      <main className="p-8 md:p-14 max-w-7xl mx-auto w-full">
           {/* Header */}
           <div className="mb-12">
              <div className="flex items-center gap-6 mb-4">
                 <div className="w-16 h-16 bg-brand-gold rounded-[2rem] flex items-center justify-center shadow-xl rotate-12">
                     <Trophy className="text-white w-8 h-8" />
                 </div>
                 <div>
                     <h1 className="font-display font-black text-4xl text-brand-emerald leading-none italic mb-1">Prize Draws</h1>
                     <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">High Stakes. Professional Gear.</p>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column: Current Draw & Eligibility */}
              <div className="lg:col-span-2 space-y-10">
                 {/* Live Jackpot Card */}
                 <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl group">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/10 skew-x-12 translate-x-1/2" />
                    <div className="relative z-10">
                       <div className="inline-flex items-center gap-2 bg-brand-gold/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-brand-gold/20">
                          <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">LIVE: APRIL JACKPOT</span>
                       </div>
                       
                       <h2 className="font-display font-black text-6xl md:text-7xl mb-6 italic tracking-tight leading-none">
                         £2,500 <span className="text-brand-gold">+</span><br />Taylormade Qi10
                       </h2>
                       
                       <div className="flex flex-wrap gap-8 items-center mt-12 mb-12 border-t border-white/5 pt-12">
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Next Draw</span>
                             <span className="text-xl font-black italic tracking-tighter">March 31, 18:00</span>
                          </div>
                          <div className="h-10 w-px bg-white/10" />
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Entries</span>
                             <span className="text-xl font-black italic tracking-tighter">8,421 Registered</span>
                          </div>
                       </div>

                       <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-between group-hover:bg-white/10 transition-all duration-700">
                          <div className="flex items-center gap-6">
                             <div className={cn(
                               "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg",
                                isEligible ? "bg-emerald-500" : "bg-amber-500"
                             )}>
                                {isEligible ? <CheckCircle2 className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
                             </div>
                             <div>
                                <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Your Eligibility</div>
                                <div className="text-2xl font-black italic tracking-tighter uppercase">
                                  {isEligible ? "Qualified for April" : "Incomplete (1/2 Submited)"}
                                </div>
                             </div>
                          </div>
                          {!isEligible && (
                             <motion.button 
                               whileHover={{ x: 5 }}
                               className="bg-brand-gold text-slate-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2"
                             >
                                Submit Round
                                <ArrowRight className="w-4 h-4" />
                             </motion.button>
                          )}
                       </div>
                    </div>
                 </div>

                 {/* Past Winners Archive */}
                 <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl">
                    <div className="flex items-center gap-4 mb-10">
                       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                          <History className="text-slate-400 w-6 h-6" />
                       </div>
                       <h3 className="font-display font-black text-2xl text-slate-900 italic tracking-tighter leading-none mb-1">Hall of Fame</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {pastWinners.map((winner) => (
                         <div key={winner.id} className="p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-slate-100 hover:bg-white transition-all group overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:rotate-12 text-3xl">
                               {winner.icon}
                            </div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-brand-emerald">{winner.month} {winner.year}</div>
                            <div className="font-black text-2xl text-slate-900 mb-2 italic tracking-tighter group-hover:translate-x-1 transition-transform">{winner.name}</div>
                            <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest leading-none">{winner.prize}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Right Column: Rules & Gear */}
              <div className="space-y-10">
                 {/* Gear Spotlight */}
                 <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=400')] bg-cover opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-1000" />
                    <div className="relative z-10">
                       <Gift className="text-brand-gold w-10 h-10 mb-8" />
                       <h3 className="font-display font-black text-2xl text-slate-900 italic mb-4 leading-none tracking-tight">Taylormade Qi10 Gear Highlights</h3>
                       <ul className="space-y-4 mb-10">
                          {[
                            "Strategic weight placement",
                            "Optimised forgiveness",
                            "Increased ball speed",
                            "Premium graphite shaft"
                          ].map((feat, i) => (
                            <li key={i} className="flex gap-3 text-xs font-bold text-slate-500">
                               <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                               {feat}
                            </li>
                          ))}
                       </ul>
                       <p className="text-[10px] font-black text-slate-300 uppercase leading-relaxed">The Qi10 set is custom-fitted for the winner by PGA professionals.</p>
                    </div>
                 </div>

                 {/* Official Rules */}
                 <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl overflow-hidden relative">
                    <div className="flex items-center gap-4 mb-8">
                       <Target className="text-brand-emerald w-6 h-6" />
                       <h3 className="font-display font-black text-xl text-slate-900 italic leading-none">Rules of Play</h3>
                    </div>
                    <div className="space-y-6">
                       <div className="flex gap-4">
                          <div className="text-2xl font-black text-slate-100 italic shrink-0">01</div>
                          <div>
                             <div className="text-xs font-black text-slate-900 uppercase">Score Requirement</div>
                             <p className="text-[11px] font-medium text-slate-500 leading-relaxed">Minimum of 2 Stableford rounds submitted per calendar month.</p>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <div className="text-2xl font-black text-slate-100 italic shrink-0">02</div>
                          <div>
                             <div className="text-xs font-black text-slate-900 uppercase">Member Status</div>
                             <p className="text-[11px] font-medium text-slate-500 leading-relaxed">Must hold an active Premium Plus membership at the time of draw.</p>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <div className="text-2xl font-black text-slate-100 italic shrink-0">03</div>
                          <div>
                             <div className="text-xs font-black text-slate-900 uppercase">Verified Rounds</div>
                             <p className="text-[11px] font-medium text-slate-500 leading-relaxed">Scores must be verified by a secondary marker via the app.</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </main>
    </>
  );
}
