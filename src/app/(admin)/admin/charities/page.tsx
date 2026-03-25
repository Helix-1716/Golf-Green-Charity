"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  Plus, 
  Search, 
  MoreVertical, 
  Globe, 
  Mail, 
  Trash2, 
  Edit3,
  ExternalLink,
  ShieldCheck,
  Zap
} from "lucide-react";
import { AdminSidebar } from "@/components/layout/AdminNav";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createBrowserClient } from "@supabase/ssr";

type Charity = {
  id: string;
  name: string;
  description: string;
  website_url: string;
  logo_url: string;
  impact_stats: string;
  created_at: string;
};

export default function AdminCharitiesPage() {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchCharities();
  }, []);

  async function fetchCharities() {
    setLoading(true);
    const { data, error } = await supabase
      .from("charities")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      toast.error("Database Error", { description: error.message });
    } else {
      setCharities(data || []);
    }
    setLoading(false);
  }

  const filteredCharities = charities.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <main className="p-10 md:p-14 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-[2rem] flex items-center justify-center shadow-xl rotate-[-12deg] group hover:rotate-0 transition-transform duration-500">
                    <Heart className="text-rose-500 w-8 h-8" />
                </div>
                <div>
                    <h1 className="font-display font-black text-4xl text-slate-900 leading-none italic mb-1">Impact Partners</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Charity Directory & Distribution</p>
                </div>
             </div>

             <div className="flex items-center gap-4">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-emerald transition-colors" />
                    <input 
                       type="text" 
                       placeholder="Filter charities..."
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       className="bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-6 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-brand-emerald/10 focus:border-brand-emerald transition-all w-full md:w-64"
                    />
                </div>
                <button className="bg-brand-emerald text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-lg hover:shadow-emerald-900/10 active:scale-95 flex items-center gap-2">
                   <Plus className="w-4 h-4" />
                   Add New Cause
                </button>
             </div>
          </div>

          {/* Grid Layout */}
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3].map(i => (
                   <div key={i} className="h-64 bg-white rounded-[2.5rem] animate-pulse border border-slate-100" />
                ))}
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {filteredCharities.map((charity) => (
                  <motion.div 
                    key={charity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-8 group hover:-translate-y-2 transition-all relative overflow-hidden"
                  >
                     <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rotate-45 translate-x-16 -translate-y-16 group-hover:bg-emerald-50 transition-colors" />
                     
                     <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex items-center justify-center font-display font-black text-slate-300 text-2xl overflow-hidden shadow-inner group-hover:border-brand-emerald/20 transition-all">
                           {charity.logo_url ? (
                              <img src={charity.logo_url} alt={charity.name} className="w-full h-full object-cover" />
                           ) : (
                              charity.name[0]
                           )}
                        </div>
                        <div className="flex gap-1">
                           <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><Edit3 className="w-4 h-4" /></button>
                           <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                     </div>

                     <h3 className="font-black text-2xl text-slate-900 mb-2 leading-tight lowercase italic group-hover:text-brand-emerald transition-colors">{charity.name}</h3>
                     <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8 line-clamp-2">
                        {charity.description || "No description provided for this impact partner yet."}
                     </p>

                     <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-2 text-brand-emerald">
                           <Zap className="w-4 h-4 fill-brand-emerald" />
                           <span className="text-xs font-black uppercase tracking-widest">{charity.impact_stats || "0% Impact"}</span>
                        </div>
                        <a 
                          href={charity.website_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-brand-emerald hover:text-white transition-all"
                        >
                           <ExternalLink className="w-4 h-4" />
                        </a>
                     </div>
                  </motion.div>
               ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
