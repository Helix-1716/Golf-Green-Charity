"use client";

import { motion } from "framer-motion";
import { Heart, Globe, TrendingUp, Sparkles, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const charities = [
  { 
    id: "1", 
    name: "Green Golf Earth", 
    desc: "Dedicated to removing the carbon footprint of golf courses globally through reforestation and renewable energy transition.", 
    impact: "£14.2k raised this month",
    icon: "🌱",
    tags: ["Environment", "Global"],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400"
  },
  { 
    id: "2", 
    name: "Fairway Kids", 
    desc: "Providing equipment, coaching, and educational support to children in disadvantaged urban communities.", 
    impact: "£8.4k raised this month",
    icon: "🏌️",
    tags: ["Youth", "Sports"],
    image: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&q=80&w=400"
  },
  { 
    id: "3", 
    name: "Mental Par", 
    desc: "Using the therapeutic power of golf to support veterans and individuals struggling with mental health challenges.", 
    impact: "£11.1k raised this month",
    icon: "🧠",
    tags: ["Health", "Veterans"],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400"
  },
  { 
    id: "4", 
    name: "Oceans Clean", 
    desc: "Protecting coastal golf-adjacent ecosystems by removing plastics and restoring natural mangroves.", 
    impact: "£6.8k raised this month",
    icon: "🌊",
    tags: ["Oceans", "Environment"],
    image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&q=80&w=400"
  },
];

export default function CharityPage() {
  const currentId = "1";

  const handleSwitch = (name: string) => {
    toast.success(`Charity Switched!`, {
      description: `Your contributions will now support ${name} starting next billing cycle.`,
    });
  };

  return (
    <main className="p-8 md:p-14 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-12">
         <div className="flex items-center gap-6 mb-4">
            <div className="w-16 h-16 bg-rose-50 rounded-[2rem] flex items-center justify-center shadow-xl rotate-[-12deg]">
                <Heart className="text-rose-500 w-8 h-8" />
            </div>
            <div>
                <h1 className="font-display font-black text-4xl text-brand-emerald leading-none italic mb-1">Charity Impact</h1>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Purpose-Driven Performance</p>
            </div>
         </div>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
         {[
           { label: "My Total Contribution", value: "£148.50", icon: Sparkles, color: "text-brand-gold" },
           { label: "Total Community Raised", value: "£142,800", icon: Globe, color: "text-brand-accent" },
           { label: "Current Month Impact", value: "£42,150", icon: TrendingUp, color: "text-emerald-500" },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className={cn("w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center", stat.color)}>
                    <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <div className="text-4xl font-black text-brand-emerald italic tracking-tight mb-2">{stat.value}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</div>
              </div>
           </div>
         ))}
      </div>

      <div className="flex items-center justify-between mb-8">
         <h2 className="font-display font-black text-2xl text-brand-emerald italic underline decoration-brand-accent/30 decoration-4">Partner Organizations</h2>
         <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select One to Represent</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {charities.map((c) => (
           <div 
             key={c.id} 
             className={cn(
               "group bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl transition-all duration-500 overflow-hidden relative",
               c.id === currentId && "ring-4 ring-brand-emerald ring-offset-4"
             )}
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rotate-45 -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700" />
              
              <div className="flex flex-col md:flex-row gap-8 relative z-10">
                <div className="w-full md:w-40 aspect-square rounded-[2rem] overflow-hidden relative shadow-lg">
                   <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-brand-emerald/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="flex-1">
                   <div className="flex flex-wrap gap-2 mb-4">
                      {c.tags.map(tag => (
                         <span key={tag} className="px-2 py-0.5 bg-slate-50 rounded-md text-[9px] font-black uppercase tracking-widest text-slate-400 opacity-60">#{tag}</span>
                      ))}
                   </div>
                   <h3 className="font-display font-black text-3xl text-brand-emerald mb-3 italic tracking-tighter leading-none">{c.name}</h3>
                   <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 max-w-sm">
                     {c.desc}
                   </p>
                   <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">{c.impact}</span>
                         <div className="h-0.5 w-full bg-emerald-500/20 mt-1" />
                      </div>
                      {c.id === currentId ? (
                        <div className="flex items-center gap-2 bg-brand-emerald text-white px-4 py-2 rounded-xl text-xs font-bold drop-shadow-md">
                           <CheckCircle2 className="w-4 h-4" />
                           ACTIVE SELECTION
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleSwitch(c.name)}
                          className="bg-white border-2 border-slate-100 text-slate-400 px-6 py-2 rounded-xl text-xs font-black hover:bg-brand-emerald hover:text-white hover:border-brand-emerald transition-all active:scale-95 flex items-center gap-2"
                        >
                           Represent
                           <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                   </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                 <a href="#" className="flex items-center gap-2 text-[10px] font-black text-slate-300 hover:text-brand-emerald transition-colors tracking-widest uppercase group-link">
                    Vetted & Verified Impact Report
                    <ExternalLink className="w-3 h-3" />
                 </a>
                 <div className="text-[40px] opacity-10 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:rotate-12">{c.icon}</div>
              </div>
           </div>
         ))}
      </div>
    </main>
  );
}
