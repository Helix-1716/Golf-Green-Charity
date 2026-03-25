import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-12 h-12 bg-brand-emerald rounded-2xl flex items-center justify-center shadow-xl">
                 <Shield className="text-white w-6 h-6" />
             </div>
             <div>
                 <h1 className="font-display font-black text-4xl text-brand-emerald italic tracking-tight leading-none">Privacy Policy</h1>
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Effective Date: March 25, 2026</p>
             </div>
          </div>

          <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl space-y-12">
             <section>
                <div className="flex items-center gap-3 mb-6">
                   <Lock className="w-5 h-5 text-brand-accent" />
                   <h2 className="font-display font-black text-2xl text-slate-900 italic">1. Member Data Collection</h2>
                </div>
                <p className="text-slate-500 leading-relaxed font-medium">
                  At Golf for Good, we are committed to protecting the privacy of our distinguished club members. 
                  When you join our membership, we collect essential information required to provide our performance tracking and 
                  charitable impact services. This includes your name, email address, handicap, and payment information processed through Stripe.
                </p>
             </section>

             <section>
                <div className="flex items-center gap-3 mb-6">
                   <Eye className="w-5 h-5 text-brand-accent" />
                   <h2 className="font-display font-black text-2xl text-slate-900 italic">2. Use of Information</h2>
                </div>
                <p className="text-slate-500 leading-relaxed font-medium">
                  We use your information exclusively to:
                </p>
                <ul className="list-disc list-inside mt-4 text-slate-500 space-y-2 font-medium">
                   <li>Verify eligibility for monthly prize draws via Stableford score tracking.</li>
                   <li>Facilitate donations to your selected charity partners.</li>
                   <li>Maintain the security and integrity of the Golf for Good leaderboard.</li>
                   <li>Communicate updates regarding your membership and club performance.</li>
                </ul>
             </section>

             <section>
                <div className="flex items-center gap-3 mb-6">
                   <FileText className="w-5 h-5 text-brand-accent" />
                   <h2 className="font-display font-black text-2xl text-slate-900 italic">3. Data Security & Sovereignty</h2>
                </div>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Our platform utilizes industry-standard encryption and security protocols (Supabase & Stripe) to ensure your data remains sovereign. 
                  We never sell member data to third parties. Your performance metrics are shared only within the club leaderboard according to your privacy settings.
                </p>
             </section>

             <section className="pt-8 border-t border-slate-100">
                <h3 className="font-display font-black text-xl text-slate-900 mb-4 italic">Contact Our Data Steward</h3>
                <p className="text-slate-500 text-sm font-medium">
                  If you have questions regarding your data or wish to exercise your right to be forgotten, please contact 
                  <span className="text-brand-emerald font-bold ml-1">privacy@golfforgood.com</span>
                </p>
             </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
