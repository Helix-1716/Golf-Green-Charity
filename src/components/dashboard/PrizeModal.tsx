"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Gift, Zap, Calendar, Heart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  entriesCount: number;
}

export function PrizeModal({ isOpen, onClose, entriesCount }: PrizeModalProps) {
  const isEligible = entriesCount >= 2;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
          >
            {/* Header / Banner */}
            <div className="bg-brand-emerald p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/10 -skew-x-12 translate-x-1/2" />
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                  <Trophy className="text-brand-gold w-8 h-8" />
                </div>
                <div className="text-[10px] font-black uppercase text-emerald-300 tracking-widest mb-2">APRIL 2026 TOP PRIZE</div>
                <h2 className="font-display font-black text-4xl mb-4 italic tracking-tight">The Jackpot Package</h2>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-brand-accent text-brand-emerald rounded-xl font-black text-xs shadow-lg">£2,500 CASH</div>
                  <div className="px-4 py-2 bg-white/10 text-white rounded-xl font-black text-xs border border-white/10">TAYLOR MADE QI10</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Prize Breakdown */}
                <div>
                   <h3 className="font-display font-black text-xl text-slate-900 mb-6 italic tracking-tight">Package Includes</h3>
                   <div className="space-y-4">
                      {[
                        { icon: Zap, text: "£2,500 Tax-Free Cash" },
                        { icon: Gift, text: "Taylormade Qi10 Driver" },
                        { icon: Heart, text: "£500 Charity Donation Match" },
                        { icon: Trophy, text: "VIP Day at Wentworth Club" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                             <item.icon className="w-4 h-4 text-brand-emerald" />
                           </div>
                           <span className="text-sm font-bold text-slate-600">{item.text}</span>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Eligibility Tracker */}
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                   <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 text-center">Your Eligibility Status</h3>
                   <div className="space-y-6">
                      <div className="flex flex-col items-center">
                         <div className={cn(
                           "w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-lg",
                           isEligible ? "bg-emerald-500 text-white" : "bg-amber-100 text-amber-600"
                         )}>
                           {isEligible ? <Trophy className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                         </div>
                         <div className="font-black italic text-lg text-slate-900 uppercase">
                           {isEligible ? "ELIGIBLE" : "INCOMPLETE"}
                         </div>
                         <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">APRIL PRIZE POOL</div>
                      </div>

                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                         <div 
                           className={cn("h-full transition-all duration-1000", isEligible ? "bg-emerald-500 w-full" : "bg-amber-500 w-1/2")} 
                         />
                      </div>

                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                         <span>SCORES SUBMITTED</span>
                         <span className={cn("font-black", isEligible ? "text-emerald-500" : "text-amber-500")}>{entriesCount} / 2</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
                 <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-300" />
                    <div>
                       <div className="text-xs font-black text-slate-900 leading-none mb-1 uppercase tracking-tighter">Next Draw Ceremony</div>
                       <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest underline decoration-brand-emerald/30 decoration-2">31st MARCH @ 18:00 GMT</div>
                    </div>
                 </div>
                 <button 
                  onClick={onClose}
                  className="bg-brand-emerald text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-brand-emerald/90 transition-all flex items-center gap-2 group shadow-xl hover:shadow-emerald-900/10 active:scale-95"
                 >
                    Dismiss Package
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
