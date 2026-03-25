import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Scale, FileCheck, HelpCircle, Trophy } from "lucide-react";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center shadow-xl">
                 <Scale className="text-brand-emerald w-6 h-6" />
             </div>
             <div>
                 <h1 className="font-display font-black text-4xl text-brand-emerald italic tracking-tight leading-none">Terms of Service</h1>
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">v1.2 • Last Modified: March 25, 2026</p>
             </div>
          </div>

          <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl space-y-12">
             <section>
                <div className="flex items-center gap-3 mb-6">
                   <Trophy className="w-5 h-5 text-brand-accent" />
                   <h2 className="font-display font-black text-2xl text-slate-900 italic">1. Membership Eligibility</h2>
                </div>
                <p className="text-slate-500 leading-relaxed font-medium">
                  By joining Golf for Good, you agree to provide accurate and verifiable golf performance data. 
                  Monthly prize draw eligibility requires the submission of at least 2 Stableford scores per calendar month. 
                  Scores must be verified by a secondary marker via the Golf for Good app or a physical club-verified scorecard.
                </p>
             </section>

             <section>
                <div className="flex items-center gap-3 mb-6">
                   <FileCheck className="w-5 h-5 text-brand-accent" />
                   <h2 className="font-display font-black text-2xl text-slate-900 italic">2. Financial Impact & Subscriptions</h2>
                </div>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Membership subscriptions are billed monthly via Stripe. A pre-defined percentage of your 
                  subscription fees is allocated directly to your selected charity partner. Subscriptions may be 
                  paused or upgraded through the Member Portal at any time. Donations are processed within 30 days of 
                  successful subscription renewal.
                </p>
             </section>

             <section>
                <div className="flex items-center gap-3 mb-6">
                   <HelpCircle className="w-5 h-5 text-brand-accent" />
                   <h2 className="font-display font-black text-2xl text-slate-900 italic">3. Fair Play & Dispute Resolution</h2>
                </div>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Members found to be falsifying scores or handicaps will have their membership revoked immediately. 
                  All disputes related to prize draws are final and handled by the Golf for Good Draw Engine v2.4.1. 
                  We reserve the right to audit member performance history for tournament-standard compliance.
                </p>
             </section>

             <section className="pt-8 border-t border-slate-100">
                <h3 className="font-display font-black text-xl text-slate-900 mb-4 italic">Platform Governance</h3>
                <p className="text-slate-500 text-sm font-medium">
                  Golf for Good is operated by Golf for Good Ltd. By accessing this platform, you agree to these legal terms. 
                  For legal inquiries, contact <span className="text-brand-emerald font-bold ml-1">legal@golfforgood.com</span>
                </p>
             </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
