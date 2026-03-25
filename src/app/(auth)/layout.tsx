import Link from "next/link";
import { Trophy } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-12">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-12 h-12 bg-brand-emerald rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg">
            <Trophy className="text-white w-7 h-7" />
          </div>
          <span className="font-display font-black text-2xl tracking-tighter text-brand-emerald drop-shadow-sm">
            Golf<span className="text-brand-accent italic">for</span>Good
          </span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col items-center px-6 pb-20">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] border border-slate-100 premium-shadow overflow-hidden">
          {children}
        </div>
        <p className="mt-8 text-slate-400 text-xs font-medium uppercase tracking-widest text-center">
          &copy; 2026 Golf for Good Ltd. <br />
          Experience the Game with Purpose.
        </p>
      </div>
    </div>
  );
}
