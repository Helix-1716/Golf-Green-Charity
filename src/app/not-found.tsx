import Link from "next/link";
import { Flag, ArrowLeft, Trophy } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-brand-emerald rounded-[2.5rem] flex items-center justify-center mb-12 shadow-2xl rotate-12 group hover:rotate-0 transition-transform duration-500">
          <Flag className="text-white w-12 h-12" />
      </div>
      
      <h1 className="font-display font-black text-7xl md:text-9xl text-brand-emerald mb-6 tracking-tighter italic">Out of <span className="text-brand-accent">Bounds</span>.</h1>
      
      <p className="text-slate-500 text-xl md:text-2xl font-medium max-w-lg mb-12 leading-relaxed">
        It looks like you've wandered onto the wrong fairway. This hole doesn't exist on our map.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <Link 
          href="/" 
          className="bg-brand-emerald text-white px-10 py-5 rounded-full text-lg font-black hover:bg-brand-emerald/90 transition-all flex items-center gap-3 shadow-xl active:scale-95 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Tee
        </Link>
        <Link 
          href="/dashboard" 
          className="text-slate-600 font-bold text-lg hover:text-brand-emerald transition-colors p-4"
        >
          View Dashboard
        </Link>
      </div>

      <div className="mt-24 pt-12 border-t border-slate-200 w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-30">
           <Trophy className="text-brand-emerald w-5 h-5" />
           <span className="font-display font-black text-emerald-900 tracking-tighter">Golf for Good</span>
        </div>
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-relaxed">
          Platform Integrity & Impact Foundation <br /> &copy; 2026
        </p>
      </div>
    </div>
  );
}
