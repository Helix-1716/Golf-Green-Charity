import Link from "next/link";
import { Trophy, Globe, Share2, Mail, Link2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-emerald rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Trophy className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-brand-emerald">
              Golf<span className="text-brand-accent">for</span>Good
            </span>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            The premium golf subscription platform dedicated to personal performance and global impact. 
            Play the game you love, change the lives of others.
          </p>
          <div className="flex items-center gap-4">
            {[Globe, Share2, Mail, Link2].map((Icon, idx) => (
              <a key={idx} href="#" className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-brand-emerald hover:shadow-md transition-all">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-slate-900 mb-8 uppercase tracking-wider text-xs">Platform</h4>
          <ul className="flex flex-col gap-4">
             <li>
               <Link href="/#how-it-works" className="text-slate-500 hover:text-brand-emerald transition-colors text-sm font-medium">How it Works</Link>
             </li>
             <li>
               <Link href="/dashboard/draws" className="text-slate-500 hover:text-brand-emerald transition-colors text-sm font-medium">Prize Draws</Link>
             </li>
             <li>
               <Link href="/dashboard/charity" className="text-slate-500 hover:text-brand-emerald transition-colors text-sm font-medium">Charity Partners</Link>
             </li>
             <li>
               <Link href="/dashboard/scores" className="text-slate-500 hover:text-brand-emerald transition-colors text-sm font-medium">Leaderboards</Link>
             </li>
             <li>
               <Link href="/pricing" className="text-slate-500 hover:text-brand-emerald transition-colors text-sm font-medium">Pricing</Link>
             </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-slate-900 mb-8 uppercase tracking-wider text-xs">Support</h4>
          <ul className="flex flex-col gap-4">
            <li>
               <Link href="/privacy" className="text-slate-500 hover:text-brand-emerald transition-colors text-sm font-medium">Membership Rules</Link>
            </li>
            <li>
               <Link href="/terms" className="text-slate-500 hover:text-brand-emerald transition-colors text-sm font-medium">Score Rules</Link>
            </li>
            <li>
               <Link href="/dashboard/profile" className="text-slate-500 hover:text-brand-emerald transition-colors text-sm font-medium">Stripe Billing</Link>
            </li>
            <li>
               <Link href="mailto:hello@golfforgood.com" className="text-slate-500 hover:text-brand-emerald transition-colors text-sm font-medium">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-slate-900 mb-8 uppercase tracking-wider text-xs">Newsletter</h4>
          <p className="text-slate-500 text-sm mb-6 font-medium">Get the latest on upcoming prizes and community impact.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-emerald/20 flex-1 transition-all"
            />
            <button className="bg-brand-emerald text-white p-3 rounded-xl hover:bg-brand-emerald/90 transition-all shadow-sm active:scale-95">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-slate-400 text-xs font-medium uppercase tracking-widest">
          &copy; 2026 Golf for Good Ltd. All rights reserved.
        </div>
        <div className="flex items-center gap-8">
           <Link href="/privacy" className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-medium uppercase tracking-widest">Privacy Policy</Link>
           <Link href="/terms" className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-medium uppercase tracking-widest">Terms of Service</Link>
           <Link href="/privacy#cookies" className="text-slate-400 hover:text-slate-900 transition-colors text-xs font-medium uppercase tracking-widest">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
