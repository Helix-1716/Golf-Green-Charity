"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const consent = localStorage.getItem("golf_for_good_cookie_consent");
    if (!consent) {
      // Delay slightly for premium entry effect
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("golf_for_good_cookie_consent", "true");
    setShowBanner(false);
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 200,
            duration: 0.6 
          }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:w-[420px] z-[9999]"
        >
          <div className="bg-white/70 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-[2.5rem] p-8 relative overflow-hidden group">
            {/* Background Accent Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald/10 blur-3xl -mr-16 -mt-16 group-hover:bg-brand-emerald/20 transition-all duration-700" />
            
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md animate-bounce-slow">
                  <Cookie className="text-brand-emerald w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-black text-lg text-slate-900 italic tracking-tight mb-1">
                    Cookie <span className="text-brand-emerald">Refinement</span>
                  </h3>
                  <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest opacity-60">
                    Privacy Governance v2.1
                  </p>
                </div>
                <button 
                  onClick={() => setShowBanner(false)}
                  className="text-slate-300 hover:text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-slate-600 text-[13px] font-medium leading-relaxed mb-8">
                We use cookies to enhance your experience. By continuing to navigate the digital clubhouse, you agree to our 
                <Link href="/privacy" className="text-brand-emerald font-black underline decoration-brand-emerald/30 underline-offset-4 ml-1 hover:decoration-brand-emerald transition-all">
                   Cookie Policy
                </Link>.
              </p>

              <div className="flex items-center gap-3">
                <button 
                  onClick={handleAccept}
                  className="flex-1 bg-brand-emerald text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-emerald-900/10 hover:bg-brand-emerald/90 transition-all active:scale-95"
                >
                  Accept All Cookies
                </button>
                <button 
                  onClick={() => setShowBanner(false)}
                  className="px-6 py-4 rounded-xl text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
