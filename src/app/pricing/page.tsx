"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Trophy, 
  Sparkles, 
  Zap, 
  Heart, 
  ArrowRight, 
  Loader2, 
  Minus,
  Plus,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type BillingCycle = "monthly" | "annually";

const plans = [
  {
    name: "Club Basic",
    monthlyPrice: 4.99,
    annualPrice: 49.99,
    monthlyPriceId: "price_1TEkrTFJ8GS2a15PdNUviZ4z",
    annualPriceId: "price_1TEkrTFJ8GS2a15PKM42Gtd9",
    desc: "Start your impact journey on the fairways.",
    impact: "£1.00 Monthly Charity Donation",
    features: ["Track Scores", "Basic Analytics", "Profile Theme", "Impact Dashboard"],
    color: "slate-900",
    icon: Zap,
  },
  {
    name: "Club Pro",
    monthlyPrice: 12.99,
    annualPrice: 129.99,
    monthlyPriceId: "price_1TEkrUFJ8GS2a15PSAKXFv5y",
    annualPriceId: "price_1TEkrVFJ8GS2a15Plc0CajGI",
    desc: "The serious golfer's choice for impact and rewards.",
    impact: "£2.50 Monthly Charity Donation",
    features: ["Everything in Basic", "All Monthly Prize Draws", "Handicap Breakdown", "Partner Discounts"],
    popular: true,
    color: "brand-emerald",
    icon: Trophy,
  },
  {
    name: "Premium Plus",
    monthlyPrice: 24.99,
    annualPrice: 249.99,
    monthlyPriceId: "price_1TEkrWFJ8GS2a15P8s3PV3n0",
    annualPriceId: "price_1TEkrWFJ8GS2a15PV4sKs4js",
    desc: "Maximize your game and your charitable giving.",
    impact: "£5.00 Monthly Charity Donation",
    features: ["Everything in Pro", "Double Entry in Draws", "1-on-1 Coaching Tips", "VIP Charity Events"],
    color: "brand-gold",
    icon: Sparkles,
  },
];

const comparisonData = [
  { feature: "Score Tracking", basic: true, pro: true, premium: true },
  { feature: "Impact Dashboard", basic: true, pro: true, premium: true },
  { feature: "Monthly Prize Draws", basic: "1 Draw Every 3m", pro: "Unlimited", premium: "Unlimited (Double Entries)" },
  { feature: "Performance Analytics", basic: "Basic", pro: "Advanced", premium: "Full Suite + Coaching" },
  { feature: "Charity Contribution", basic: "20%", pro: "20%", premium: "20% (Higher Tier)" },
  { feature: "Partner Exclusive Discounts", basic: false, pro: true, premium: true },
  { feature: "VIP Event Access", basic: false, pro: false, premium: true },
  { feature: "Priority Support", basic: false, pro: true, premium: "Dedicated Concierge" },
];

export default function PricingPage() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [loading, setLoading] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.message("Ready to join?", {
          description: "Sign in or sign up to subscribe.",
        });
        router.push(`/signup?redirect=/pricing`);
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (error: any) {
      toast.error("Checkout Error", {
        description: error.message || "Failed to connect to gateway.",
      });
    } finally {
      setLoading(null);
    }
  };

  const handlePortal = async () => {
    try {
      const resp = await fetch("/api/portal", { method: "POST" });
      const d = await resp.json();
      if (d.url) window.location.href = d.url;
      else throw new Error(d.error);
    } catch {
      toast.error("Account Portal unavailable.", { description: "You must be signed in with an active plan." });
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#f9f9f8] text-[#191c1c] font-sans">
      <Navbar />
      
      <section className="pt-48 pb-32 px-6 relative overflow-hidden">
        {/* The Digital Clubhouse Ambient Background */}
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#004900]/5 to-transparent -z-10" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-brand-accent/5 blur-[160px] -z-10 animate-pulse" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 bg-emerald-50 text-brand-emerald px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-10 border border-emerald-100 shadow-sm"
             >
                <ShieldCheck className="w-3.5 h-3.5" />
                The Digital Clubhouse • Professional Impact
             </motion.div>
             
             <h1 className="font-display font-black text-6xl md:text-8xl text-brand-emerald mb-8 leading-[0.85] italic tracking-tighter">
                Drive Performance. <br />
                Fund <span className="text-brand-accent italic underline decoration-[#006400]/10 decoration-[12px] underline-offset-8">Purpose</span>.
             </h1>
             
             <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed mb-16">
                Redefine your relationship with the game. Pure transparency, prestigious rewards, and world-class charitable impact.
             </p>

             {/* Pricing Toggle (Other Payment Gateway Style) */}
             <div className="flex items-center justify-center gap-6 mb-12">
                <span className={cn("text-sm font-black uppercase tracking-widest transition-colors", cycle === "monthly" ? "text-brand-emerald" : "text-slate-400")}>Monthly</span>
                <button 
                  onClick={() => setCycle(cycle === "monthly" ? "annually" : "monthly")}
                  className="w-16 h-8 bg-brand-emerald/10 rounded-full p-1 relative flex items-center transition-all group"
                >
                   <motion.div 
                     animate={{ x: cycle === "monthly" ? 0 : 32 }}
                     className="w-6 h-6 bg-brand-emerald rounded-full shadow-lg flex items-center justify-center"
                   >
                      <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                   </motion.div>
                </button>
                <div className="flex items-center gap-3">
                   <span className={cn("text-sm font-black uppercase tracking-widest transition-colors", cycle === "annually" ? "text-brand-emerald" : "text-slate-400")}>Annually</span>
                   <span className="bg-brand-accent text-brand-emerald text-[9px] font-black px-2 py-0.5 rounded-md border border-white/50 shadow-sm">2 MONTHS FREE</span>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
             {plans.map((plan, i) => {
               const price = cycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
               const priceId = cycle === "monthly" ? plan.monthlyPriceId : plan.annualPriceId;
               
               return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "relative rounded-[3.5rem] p-12 flex flex-col h-full transition-all duration-700 hover:-translate-y-4 group",
                    plan.popular ? "bg-brand-emerald text-white shadow-[0_40px_80px_rgba(0,100,0,0.15)] ring-1 ring-white/10" : "bg-white border border-slate-100 shadow-2xl"
                  )}
                >
                   {plan.popular && (
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-brand-emerald px-6 py-2.5 rounded-full font-black text-[10px] tracking-[0.25em] uppercase shadow-2xl border-2 border-white">
                        Most Prestigious Choice
                     </div>
                   )}
                   
                   <div className="mb-12">
                      <div className="flex justify-between items-start mb-8">
                         <div className={cn("p-5 rounded-[2rem] border transition-transform duration-500 group-hover:rotate-6 shadow-xl", 
                           plan.popular ? "bg-white/10 border-white/10" : "bg-slate-50 border-slate-100"
                         )}>
                            <plan.icon className={cn("w-8 h-8", plan.popular ? "text-brand-accent" : "text-brand-emerald")} />
                         </div>
                         <div className="text-right">
                            <div className={cn("text-5xl font-black italic tracking-tighter leading-none mb-1", plan.popular ? "text-white" : "text-brand-emerald")}>
                               £{price.toFixed(2)}
                            </div>
                            <div className={cn("text-[9px] font-bold uppercase tracking-widest leading-none", plan.popular ? "text-white/40" : "text-slate-400")}>
                               PER {cycle === "monthly" ? "MONTH" : "YEAR"}
                            </div>
                         </div>
                      </div>
                      
                      <h3 className={cn("text-3xl font-black italic tracking-tighter uppercase mb-2", plan.popular ? "text-white" : "text-slate-900")}>
                        {plan.name}
                      </h3>
                      <p className={cn("text-sm font-medium leading-relaxed max-w-[220px] mb-8", plan.popular ? "text-white/60" : "text-slate-400")}>
                        {plan.desc}
                      </p>
                      
                      <div className={cn("flex items-center gap-4 p-5 rounded-3xl border transition-all", 
                        plan.popular ? "bg-white/5 border-white/10 group-hover:bg-white/10" : "bg-slate-50 border-slate-100 group-hover:bg-emerald-50/50 group-hover:border-emerald-100"
                      )}>
                         <div className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center shrink-0">
                            <Heart className="text-rose-400 w-5 h-5 fill-rose-400" />
                         </div>
                         <span className={cn("text-[10px] font-black uppercase tracking-widest italic leading-tight", plan.popular ? "text-brand-accent" : "text-brand-emerald")}>
                           {plan.impact}
                         </span>
                      </div>
                   </div>

                   <ul className="space-y-5 mb-14 flex-1">
                      {plan.features.map(f => (
                         <li key={f} className="flex gap-4 items-start">
                            <CheckCircle2 className={cn("w-5 h-5 shrink-0", plan.popular ? "text-brand-accent" : "text-brand-emerald")} />
                            <span className={cn("text-sm font-semibold leading-snug", plan.popular ? "text-white/80" : "text-slate-600")}>{f}</span>
                         </li>
                      ))}
                   </ul>

                   <button 
                     disabled={!!loading}
                     onClick={() => handleCheckout(priceId)}
                     className={cn(
                       "w-full py-6 rounded-[2rem] font-black text-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 relative overflow-hidden group/btn disabled:opacity-70",
                       plan.popular 
                         ? "bg-brand-accent text-brand-emerald hover:bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]" 
                         : "bg-brand-emerald text-white hover:bg-brand-emerald/90 shadow-xl"
                     )}
                   >
                     {loading === priceId ? <Loader2 className="w-7 h-7 animate-spin" /> : (
                       <>
                         Select Membership
                         <ArrowRight className="w-6 h-6 transition-transform duration-500 group-hover/btn:translate-x-2" />
                       </>
                     )}
                   </button>
                </motion.div>
               );
             })}
          </div>

          {/* Detailed Feature Comparison Rule-based UI */}
          <div className="mt-40 max-w-5xl mx-auto">
             <div className="text-center mb-16">
                <h2 className="font-display font-black text-4xl text-brand-emerald italic mb-4">The Comparison.</h2>
                <div className="h-1.5 w-24 bg-brand-accent mx-auto rounded-full" />
             </div>
             
             <div className="bg-white rounded-[4rem] border border-slate-100 shadow-[0_60px_100px_rgba(0,0,0,0.06)] overflow-hidden">
                <table className="w-full text-left">
                   <thead>
                      <tr className="border-b border-slate-50">
                         <th className="p-10 text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] w-1/3">Feature Set</th>
                         <th className="p-10 text-[10px] font-black uppercase text-brand-emerald tracking-[0.2em] text-center">Basic</th>
                         <th className="p-10 text-[10px] font-black uppercase text-brand-emerald tracking-[0.2em] text-center bg-emerald-50/30">Pro</th>
                         <th className="p-10 text-[10px] font-black uppercase text-brand-emerald tracking-[0.2em] text-center">Premium</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {comparisonData.map((item) => (
                        <tr key={item.feature} className="group hover:bg-slate-50/50 transition-colors">
                           <td className="p-10">
                              <div className="font-black text-slate-900 italic tracking-tighter text-lg">{item.feature}</div>
                           </td>
                           <td className="p-10 text-center">
                              {typeof item.basic === "boolean" ? (item.basic ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /> : <Minus className="w-5 h-5 text-slate-200 mx-auto" />) : <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.basic}</span>}
                           </td>
                           <td className="p-10 text-center bg-emerald-50/20">
                              {typeof item.pro === "boolean" ? (item.pro ? <CheckCircle2 className="w-5 h-5 text-brand-emerald mx-auto" /> : <Minus className="w-5 h-5 text-slate-200 mx-auto" />) : <span className="text-[10px] font-black uppercase text-brand-emerald tracking-widest">{item.pro}</span>}
                           </td>
                           <td className="p-10 text-center">
                              {typeof item.premium === "boolean" ? (item.premium ? <CheckCircle2 className="w-5 h-5 text-brand-emerald mx-auto font-black" /> : <Minus className="w-5 h-5 text-slate-200 mx-auto" />) : <span className="text-[10px] font-black uppercase text-brand-gold tracking-widest">{item.premium}</span>}
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             
             <div className="mt-16 bg-brand-emerald rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] -mr-32 -mt-32" />
                <div className="flex items-center gap-8 relative z-10">
                   <div className="w-20 h-20 bg-white/10 rounded-[2.5rem] border border-white/5 flex items-center justify-center">
                      <ShieldCheck className="w-10 h-10 text-brand-accent shadow-2xl" />
                   </div>
                   <div>
                      <h4 className="font-display font-black text-3xl italic tracking-tighter mb-2">The Fairway Guarantee</h4>
                      <p className="text-white/60 text-sm font-medium">Cancel, pause or upgrade your account effortlessly at any time.</p>
                   </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                  <button 
                    onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-white text-brand-emerald hover:bg-brand-accent transition-all px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-2xl"
                  >
                    View Trust & Support
                  </button>
                  <button 
                    onClick={handlePortal}
                    className="bg-brand-accent text-brand-emerald hover:bg-white transition-all px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-2xl"
                  >
                    Manage Membership
                  </button>
                </div>
             </div>
          </div>

          {/* New Trust & Safety FAQ Section */}
          <section id="faq-section" className="mt-48 max-w-4xl mx-auto pb-32">
             <div className="text-center mb-16">
                <h2 className="font-display font-black text-4xl text-brand-emerald italic mb-4 uppercase tracking-tighter">Your Trust, Our Priority.</h2>
                <div className="h-1.5 w-16 bg-brand-accent mx-auto rounded-full" />
             </div>
             
             <div className="grid gap-6">
                {[
                  { q: "How are my donations tracked?", a: "Every penny of your tier-specified contribution goes through our audited impact partner network. You'll receive monthly reports detailing exactly where your funds were deployed." },
                  { q: "Can I cancel my membership at any time?", a: "Yes. Our 'No-Hassle' policy means you can cancel via your dashboard with a single click. No hidden fees or exit terms." },
                  { q: "How do monthly prize draws work?", a: "Each month, we draw winners for luxury golf gear and travel. Tiers determine your eligibility and number of entries. Winners are announced on the 1st of each month." },
                  { q: "Is my payment safe?", a: "We use Stripe for all transactions. We never see or store your credit card information. Your data is encrypted and secure." }
                ].map((item, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group"
                  >
                     <div className="flex items-start gap-6">
                        <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-brand-emerald font-black shrink-0 group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                           ?
                        </div>
                        <div>
                           <h5 className="font-black text-slate-900 italic text-xl mb-3 tracking-tight group-hover:text-brand-emerald transition-colors">{item.q}</h5>
                           <p className="text-slate-500 font-medium leading-relaxed">{item.a}</p>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
             
             <div className="mt-16 text-center">
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mb-6">Still have questions?</p>
                <a href="mailto:support@golfgreen.com" className="inline-flex items-center gap-3 bg-brand-emerald text-white px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest shadow-xl hover:bg-brand-accent hover:text-brand-emerald transition-all">
                   Contact Direct Support
                </a>
             </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
