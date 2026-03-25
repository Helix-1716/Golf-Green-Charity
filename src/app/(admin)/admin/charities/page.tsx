"use client";

import { useState, useEffect } from "react";
import { 
  Heart, 
  Plus, 
  Search, 
  Edit,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AdminSidebar } from "@/components/layout/AdminNav";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase";

export default function AdminCharitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [charities, setCharities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchCharities = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('charities')
      .select('*')
      .order('name');
    
    if (error) {
      toast.error("Error fetching charities");
    } else {
      setCharities(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this partner?")) return;
    const { error } = await supabase.from('charities').delete().eq('id', id);
    if (error) toast.error("Could not remove partner");
    else {
      toast.success("Partner Removed");
      fetchCharities();
    }
  };

  const handleAddCharity = () => {
    toast.info("Add Charity Modal", {
      description: "This feature is being connected to the new partner onboarding flow."
    });
  };

  useEffect(() => {
    fetchCharities();
  }, []);

  const filtered = charities.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <main className="p-10 md:p-14 max-w-7xl mx-auto w-full">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-rose-50 rounded-[2rem] flex items-center justify-center shadow-xl rotate-12 transition-transform duration-500">
                    <Heart className="text-rose-500 w-8 h-8" />
                 </div>
                 <div>
                    <h1 className="font-display font-black text-4xl text-slate-900 leading-none italic mb-1">Impact Partners</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Charity Directory & Ledger</p>
                 </div>
              </div>
              <button 
                onClick={handleAddCharity}
                className="bg-brand-emerald text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-brand-emerald/90 transition-all flex items-center gap-3 shadow-lg active:scale-95"
              >
                Add New Charity
                <Plus className="w-5 h-5" />
              </button>
           </div>

           <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
              <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                 <div className="relative group flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                       type="text" 
                       placeholder="Search partners..." 
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl w-full text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-emerald/10 transition-all"
                    />
                 </div>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr>
                          <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Partner Name</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Total Raised</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Active Members</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Status</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {filtered.map((c) => (
                         <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-10 py-8">
                               <div className="flex items-center gap-5">
                                  <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-xl shadow-sm">
                                      {c.image_url ? <img src={c.image_url} alt={c.name} className="w-full h-full object-contain" /> : "🌱"}
                                  </div>
                                  <div>
                                     <div className="font-black text-slate-900 text-lg leading-none mb-1.5">{c.name}</div>
                                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{c.category || "General"} Sector</div>
                                  </div>
                               </div>
                            </td>
                            <td className="px-10 py-8">
                               <div className="text-xl font-black text-brand-emerald italic">£{(c.total_raised || 0).toLocaleString()}</div>
                               <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mt-1">Life-time funds</div>
                            </td>
                            <td className="px-10 py-8 text-sm font-bold text-slate-500">
                               {(c.member_count || 0).toLocaleString()} Representing
                            </td>
                            <td className="px-10 py-8">
                               <div className={cn(
                                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                                  c.status === "active" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-100 text-slate-400 border border-slate-200"
                               )}>
                                  {c.status}
                               </div>
                            </td>
                            <td className="px-10 py-8 text-right">
                               <div className="flex items-center justify-end gap-2">
                                  <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-brand-emerald hover:bg-emerald-50 transition-all">
                                     <Edit className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => handleDelete(c.id)}
                                    className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
                                  >
                                     <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
                 {filtered.length === 0 && !loading && (
                   <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-sm">
                      No partners found.
                   </div>
                 )}
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}
