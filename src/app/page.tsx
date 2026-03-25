import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { HowItWorks } from "@/components/layout/HowItWorks";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <section id="how-it-works">
        <HowItWorks />
      </section>
      
      {/* Charity Impact Section */}
      <section id="charity-impact" className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 shrink-0">
            <h2 className="font-display font-black text-4xl md:text-5xl text-brand-emerald mb-6 group">
              Golf with a <span className="text-brand-accent italic group-hover:underline underline-offset-8 transition-all">Purpose</span>.
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-xl">
              We believe the game of golf has the power to drive positive change. That's why every membership 
              on our platform directly supports world-class charities.
            </p>
            <div className="space-y-6">
              {[
                { title: "Choose Your Cause", desc: "Select from a curated list of high-impact charities." },
                { title: "Direct Contribution", desc: "20% of every subscription fee is donated monthly." },
                { title: "Track Your Impact", desc: "See exactly how much you've raised and the difference it makes." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-emerald/10 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-emerald animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full max-w-2xl aspect-[4/3] bg-brand-emerald rounded-[3rem] relative overflow-hidden premium-shadow group">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 mix-blend-overlay" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-emerald/40 via-transparent to-transparent" />
             <div className="absolute bottom-12 left-12 text-white">
                <div className="font-display font-black text-5xl mb-3 tracking-tight">Save the Children</div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-emerald-50 font-bold uppercase text-[10px] tracking-widest border border-white/20">Official Partner</div>
                  <div className="text-emerald-100/60 font-medium text-xs">Empowering 1m+ kids annually</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-emerald relative overflow-hidden px-6">
        {/* Animated Background Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/20 blur-[160px] rounded-full mix-blend-screen opacity-40 animate-pulse" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-display font-black text-5xl md:text-7xl text-white mb-10 leading-none">Ready to Elevate <br /><span className="text-brand-accent italic">Your Game</span>.</h2>
          <p className="text-emerald-100 text-xl md:text-2xl mb-14 max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
            Join thousands of golfers making a difference. Start your subscription today and get entered into this month's premium prize draw.
          </p>
          <Link href="/pricing" className="bg-white text-brand-emerald px-12 py-6 rounded-full text-2xl font-black hover:bg-emerald-50 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] active:scale-95 group flex items-center gap-3 mx-auto w-fit">
            Become a Member
            <div className="w-8 h-8 rounded-full bg-brand-emerald flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform">
              <span className="text-white text-xl">→</span>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
