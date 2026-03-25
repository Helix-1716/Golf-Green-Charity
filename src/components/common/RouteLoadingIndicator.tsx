"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function RouteLoadingIndicator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Show loader on route change
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Mimic a small delay for premium feel
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ originX: 0 }}
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-emerald via-brand-accent to-brand-gold z-[10000] shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        />
      )}
    </AnimatePresence>
  );
}
