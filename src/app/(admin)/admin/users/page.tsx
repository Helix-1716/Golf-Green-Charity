"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Ban, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import { AdminSidebar } from "@/components/layout/AdminNav";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createBrowserClient } from "@supabase/ssr";

type Profile = {
  id: string;
  full_name: string;
  avatar_url: string;
  role: string;
  subscription_status: string;
  created_at: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load users", { description: error.message });
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  }

  async function promoteToAdmin(userId: string) {
    const { error } = await supabase
      .from("profiles")
      .update({ role: "admin" })
      .eq("id", userId);

    if (error) {
      toast.error("Promotion failed", { description: error.message });
    } else {
      toast.success("User promoted to Admin access");
      fetchUsers();
    }
  }

  async function toggleStatus(userId: string, currentStatus: string) {
      // Logic for blocking/unblocking
      toast.info("Updating user status...");
  }

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <Users className="text-brand-emerald w-8 h-8" />
                </div>
                <div>
                    <h1 className="font-display font-black text-4xl text-slate-900 leading-none italic mb-1">User Directory</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Platform Residents & Roles</p>
                </div>
             </div>

             <div className="flex items-center gap-4">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-emerald transition-colors" />
                    <input 
                       type="text" 
                       placeholder="Search by name or role..."
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       className="bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-6 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-brand-emerald/10 focus:border-brand-emerald transition-all w-full md:w-80"
                    />
                </div>
                <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors">
                   <Filter className="w-5 h-5" />
                </button>
             </div>
          </div>

          {/* User Table Card */}
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden min-h-[500px] flex flex-col">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="border-b border-slate-50 uppercase text-[10px] font-black text-slate-400 tracking-widest">
                         <th className="px-10 py-8">User Information</th>
                         <th className="px-8 py-8">Status / Sub</th>
                         <th className="px-8 py-8">Role</th>
                         <th className="px-8 py-8">Joined</th>
                         <th className="px-10 py-8 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {loading ? (
                         Array.from({ length: 5 }).map((_, i) => (
                           <tr key={i} className="animate-pulse">
                              <td colSpan={5} className="px-10 py-8 h-20 bg-slate-50/50" />
                           </tr>
                         ))
                      ) : filteredUsers.length === 0 ? (
                        <tr>
                           <td colSpan={5} className="px-10 py-32 text-center">
                              <div className="flex flex-col items-center gap-4 text-slate-300">
                                 <ShieldAlert className="w-16 h-16 opacity-20" />
                                 <p className="text-xl font-black italic">No users found in directory</p>
                                 <button onClick={fetchUsers} className="text-brand-emerald hover:underline font-black text-sm">Refresh System</button>
                              </div>
                           </td>
                        </tr>
                      ) : filteredUsers.map((user) => (
                         <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-10 py-6">
                               <div className="flex items-center gap-5">
                                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center font-display font-black text-brand-emerald text-xl shadow-inner border border-brand-emerald/10 overflow-hidden">
                                     {user.avatar_url ? (
                                       <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                                     ) : (
                                       user.full_name?.[0] || "?"
                                     )}
                                  </div>
                                  <div>
                                     <div className="font-black text-slate-900 text-lg leading-tight group-hover:text-brand-emerald transition-colors lowercase italic">{user.full_name}</div>
                                     <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none mt-1">ID: ...{user.id.slice(-6)}</div>
                                  </div>
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <div className="flex flex-col gap-1.5">
                                  <div className="flex items-center gap-2">
                                     <div className={cn("w-2 h-2 rounded-full", user.subscription_status === "active" ? "bg-emerald-500" : "bg-slate-300")} />
                                     <span className="text-xs font-black uppercase tracking-tight text-slate-900">{user.subscription_status || "None"}</span>
                                  </div>
                                  <div className="text-[9px] font-black italic text-slate-400 uppercase tracking-widest pl-4">Member Status</div>
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <span className={cn(
                                 "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm border",
                                 user.role === "admin" 
                                   ? "bg-brand-accent/10 text-brand-emerald border-brand-accent/20" 
                                   : "bg-slate-100 text-slate-500 border-slate-200"
                               )}>
                                  {user.role}
                               </span>
                            </td>
                            <td className="px-8 py-6">
                               <div className="text-sm font-black text-slate-900 leading-none lowercase italic">
                                  {new Date(user.created_at).toLocaleDateString()}
                               </div>
                               <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1.5">Registration Date</div>
                            </td>
                            <td className="px-10 py-6 text-right">
                               <div className="flex items-center justify-end gap-2">
                                  {user.role !== "admin" && (
                                    <button 
                                      onClick={() => promoteToAdmin(user.id)}
                                      className="p-3 text-slate-400 hover:text-brand-emerald hover:bg-emerald-50 rounded-2xl transition-all"
                                      title="Promote to Admin"
                                    >
                                       <ShieldCheck className="w-5 h-5" />
                                    </button>
                                  )}
                                  <button className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">
                                     <Ban className="w-5 h-5" />
                                  </button>
                                  <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all">
                                     <MoreVertical className="w-5 h-5" />
                                  </button>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>

             {/* Pagination Bar */}
             <div className="mt-auto p-10 bg-slate-50/30 flex items-center justify-between border-t border-slate-50">
                <div className="text-xs font-bold text-slate-400">
                   Showing <span className="text-slate-900">{filteredUsers.length}</span> of <span className="text-slate-900">{users.length}</span> Global Residents
                </div>
                <div className="flex items-center gap-3">
                   <button className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed">
                      <ChevronLeft className="w-5 h-5" />
                   </button>
                   <button className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-400 hover:text-slate-900 transition-all">
                      <ChevronRight className="w-5 h-5" />
                   </button>
                </div>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}
