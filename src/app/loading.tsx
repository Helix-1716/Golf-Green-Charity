"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-slate-50/80 backdrop-blur-md z-[9999] flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [1, 1.1, 1], opacity: 1 }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="relative"
      >
        <div className="w-24 h-24 bg-brand-emerald rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-emerald-900/20 rotate-12">
          <Trophy className="text-white w-12 h-12" />
        </div>
        
        {/* Pulsing ring */}
        <motion.div 
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-brand-emerald/20 rounded-[2.5rem] -z-10"
        />
      </motion.div>
      
      <div className="mt-10 flex flex-col items-center">
        <div className="font-display font-black text-2xl text-brand-emerald italic mb-2 tracking-tighter">
          Golf<span className="text-brand-accent italic">for</span>Good
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
             <motion.div 
               key={i}
               animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
               className="w-1.5 h-1.5 rounded-full bg-brand-emerald"
             />
          ))}
        </div>
      </div>
    </div>
  );
}
