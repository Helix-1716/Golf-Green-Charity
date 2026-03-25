"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 bg-gradient-to-b from-brand-mint to-white rounded-b-[100px]" />

      {/* Animated Shapes */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[15%] w-64 h-64 bg-brand-accent/20 blur-[100px] -z-10"
      />
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 left-[10%] w-80 h-80 bg-brand-emerald/10 blur-[120px] -z-10"
      />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-emerald-50 text-brand-emerald px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-8 border border-emerald-100"
        >
          <Sparkles className="w-3.5 h-3.5" />
          The New Era of Golf Performance
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-brand-emerald mb-8 max-w-4xl"
        >
          Play for <span className="text-brand-accent italic">Better</span>.<br />
          Golf for <span className="text-brand-gold">Good</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mb-12 leading-relaxed"
        >
          Your passion for the game, redirected for real-world impact. Track your performance,
          support your favorite charity, and win exclusive monthly prizes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link
            href="/signup"
            className="group relative bg-brand-emerald text-white px-8 py-5 rounded-full text-lg font-bold hover:bg-brand-emerald/90 transition-all premium-shadow flex items-center gap-2"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#how-it-works"
            className="text-slate-600 font-semibold text-lg hover:text-brand-emerald transition-colors p-4"
          >
            How it Works
          </Link>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
        >
          {[
            { label: "Community Support", value: "£142k+", icon: Heart, color: "text-rose-500" },
            { label: "Active Members", value: "8.4k+", icon: Trophy, color: "text-brand-gold" },
            { label: "Prizes Awarded", value: "£25k+", icon: Sparkles, color: "text-brand-accent" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 premium-shadow flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300">
              <div className={cn("w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", stat.color)}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="font-display font-black text-4xl text-brand-emerald mb-2">{stat.value}</div>
              <div className="text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
