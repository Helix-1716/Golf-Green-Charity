"use client";

import { motion } from "framer-motion";
import { UserPlus, CreditCard, Target, Trophy, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const steps = [
  {
    icon: UserPlus,
    title: "Join the Club",
    description: "Create your profile and select a charity that resonates with you.",
    color: "bg-blue-50 text-blue-600",
    link: "/signup"
  },
  {
    icon: CreditCard,
    title: "Subscribe & Support",
    description: "A portion of your monthly subscription goes directly to your chosen cause.",
    color: "bg-emerald-50 text-emerald-600",
    link: "/pricing"
  },
  {
    icon: Target,
    title: "Submit Scores",
    description: "Submit at least 2 Stableford scores per month to stay eligible.",
    color: "bg-amber-50 text-amber-600",
    link: "/dashboard/scores"
  },
  {
    icon: Trophy,
    title: "Win Exclusive Prizes",
    description: "Qualify for our monthly draws featuring premium golf gear and experiences.",
    color: "bg-purple-50 text-purple-600",
    link: "/dashboard/draws"
  },
];

export function HowItWorks() {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden px-6" id="how-it-works">
      {/* Background Decor - Large Subtle Numbering */}
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] select-none pointer-events-none hidden lg:block">
        <span className="font-display font-black text-[20rem] leading-none text-brand-emerald italic">01-04</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="font-display font-black text-5xl md:text-7xl text-[#334155] mb-8 leading-[0.9] tracking-tighter">
            How it <span className="text-brand-emerald italic">Works</span>.
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            A premium membership experience built for the modern golfer. Professional performance tracking meets global charitable impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="relative p-10 bg-white rounded-[3rem] border border-slate-100/50 hover:border-brand-emerald/20 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-700 group flex flex-col h-full"
            >
              {/* Step Number Overlay */}
              <div className="absolute top-8 right-10 text-4xl font-display font-black text-slate-100 group-hover:text-brand-emerald/10 transition-colors italic leading-none">
                0{idx + 1}
              </div>

              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500",
                step.color
              )}>
                <step.icon className="w-8 h-8" />
              </div>
              
              <h3 className="font-display font-black text-2xl text-slate-800 mb-6 italic tracking-tight leading-none">{step.title}</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed font-semibold opacity-70 group-hover:opacity-100 group-hover:text-slate-900 transition-all duration-500 mb-8 flex-1">
                {step.description}
              </p>

              <Link 
                href={step.link}
                className="inline-flex items-center gap-2 text-brand-emerald font-black text-[10px] uppercase tracking-widest bg-emerald-50/50 hover:bg-brand-emerald hover:text-white px-4 py-3 rounded-xl transition-all duration-500 active:scale-95 group/btn border border-emerald-100/30"
              >
                Explore More
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>

              {/* Hover Glow */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-emerald scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/signup" className="group flex items-center gap-4 bg-brand-emerald text-white px-10 py-6 rounded-full font-black text-lg uppercase tracking-tight hover:bg-brand-emerald/90 transition-all shadow-xl shadow-emerald-900/10 active:scale-95">
             Begin Your Membership
             <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform">
               <ArrowRight className="w-4 h-4 text-brand-emerald" />
             </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
