"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ArrowRight, ArrowLeft, Heart, Target, CreditCard, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const charities = [
  { id: "1", name: "Green Golf Earth", desc: "Reforestation and biodiversity protection.", color: "bg-emerald-50", icon: "🌱" },
  { id: "2", name: "Fairway Kids", desc: "Bringing golf to underprivileged youth.", color: "bg-blue-50", icon: "🏌️" },
  { id: "3", name: "Oceans Clean", desc: "Removing plastics from coastal waters.", color: "bg-cyan-50", icon: "🌊" },
  { id: "4", name: "Mental Par", desc: "Golf-based mental health support.", color: "bg-purple-50", icon: "🧠" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ handicap: "", charity: "" });

  const nextStep = () => {
    if (step === 3) {
      toast.success("All set!", { description: "Preparing your premium dashboard..." });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col px-6">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-brand-emerald rounded-xl flex items-center justify-center shadow-md">
                <Trophy className="text-white w-6 h-6" />
             </div>
             <span className="font-display font-bold text-slate-900 tracking-tight">Onboarding</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={cn(
                  "w-12 h-1.5 rounded-full transition-all duration-300",
                  step >= s ? "bg-brand-emerald" : "bg-slate-200"
                )} 
              />
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full max-w-lg bg-white rounded-[3rem] p-12 shadow-xl border border-slate-100"
                >
                    <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                        <Target className="text-amber-600 w-8 h-8" />
                    </div>
                    <div className="text-center mb-10">
                        <h2 className="font-display font-black text-3xl text-brand-emerald mb-3 italic">Establish Your Game</h2>
                        <p className="text-slate-500 font-medium leading-relaxed">Let's start with your текущий handicap. Not a pro? No worries, everyone has a starting point.</p>
                    </div>
                    <div className="space-y-6">
                        <div className="relative">
                            <input 
                                type="number" 
                                value={data.handicap}
                                onChange={(e) => setData({ ...data, handicap: e.target.value })}
                                placeholder="e.g. 18.2"
                                className="w-full text-center py-6 bg-slate-50 border-2 border-slate-100 rounded-2xl text-4xl font-black text-brand-emerald focus:outline-none focus:ring-8 focus:ring-brand-emerald/10 focus:border-brand-emerald transition-all"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold tracking-widest uppercase text-xs">Handicap</span>
                        </div>
                        <button 
                            onClick={nextStep}
                            disabled={!data.handicap}
                            className="w-full bg-brand-emerald text-white py-5 rounded-2xl font-black text-lg hover:bg-brand-emerald/90 transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 disabled:opacity-50"
                        >
                            Next Step
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full max-w-3xl bg-white rounded-[3rem] p-12 shadow-xl border border-slate-100"
                >
                    <div className="flex items-center gap-6 mb-10">
                        <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center shrink-0">
                            <Heart className="text-rose-500 w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="font-display font-black text-3xl text-brand-emerald leading-tight italic">Choose Your Legacy</h2>
                            <p className="text-slate-500 font-medium">Which cause will you represent on the course?</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {charities.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => setData({ ...data, charity: c.id })}
                                className={cn(
                                    "p-6 rounded-3xl border-2 text-left transition-all relative overflow-hidden group",
                                    data.charity === c.id ? "bg-brand-emerald border-brand-emerald shadow-lg" : "bg-slate-50 border-slate-100 hover:border-brand-emerald/50"
                                )}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{c.icon}</span>
                                    {data.charity === c.id && <CheckCircle2 className="text-white w-6 h-6" />}
                                </div>
                                <h3 className={cn("font-bold text-lg mb-1", data.charity === c.id ? "text-white" : "text-brand-emerald")}>{c.name}</h3>
                                <p className={cn("text-xs leading-relaxed font-medium", data.charity === c.id ? "text-emerald-100" : "text-slate-500")}>
                                    {c.desc}
                                </p>
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button onClick={prevStep} className="flex-1 bg-slate-100 text-slate-600 font-bold py-5 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                           <ArrowLeft className="w-5 h-5" />
                           Back
                        </button>
                        <button 
                            onClick={nextStep}
                            disabled={!data.charity}
                            className="flex-[2] bg-brand-emerald text-white font-black text-lg py-5 rounded-2xl hover:bg-brand-emerald/90 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                        >
                            Next Step
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full max-w-lg bg-white rounded-[3rem] p-12 shadow-xl border border-slate-100 text-center"
                >
                    <div className="w-20 h-20 bg-brand-emerald rounded-2xl flex items-center justify-center mb-8 mx-auto -rotate-12 shadow-[0_10px_20px_rgba(6,78,59,0.3)]">
                        <CreditCard className="text-white w-10 h-10" />
                    </div>
                    <h2 className="font-display font-black text-3xl text-brand-emerald mb-3 tracking-tighter italic">Membership Activated</h2>
                    <p className="text-slate-500 font-medium leading-relaxed mb-10 max-w-sm mx-auto">
                        Finalize your enrollment with a monthly subscription of £12.99. Cancel anytime, impact forever.
                    </p>

                    <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 mb-10 text-left">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Subscription Summary</div>
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-2xl font-black text-brand-emerald leading-none mb-1 italic">Club Pro</div>
                                <div className="text-xs text-slate-500 font-bold">Monthly Plan</div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-black text-brand-accent italic leading-none">£12.99</div>
                                <div className="text-[10px] text-slate-400 font-bold">Incl. £2.50 to charity</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button 
                           onClick={nextStep}
                           className="w-full bg-brand-emerald text-white py-6 rounded-2xl font-black text-xl hover:bg-brand-emerald/90 transition-all shadow-xl active:scale-95 group flex items-center justify-center gap-3 overflow-hidden relative"
                        >
                            <Sparkles className="w-6 h-6 text-brand-accent absolute -left-10 group-hover:left-8 transition-all duration-500" />
                            Confirm & Checkout
                            <Sparkles className="w-6 h-6 text-brand-accent absolute -right-10 group-hover:right-8 transition-all duration-500" />
                        </button>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">Secure checkout via Stripe</p>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
