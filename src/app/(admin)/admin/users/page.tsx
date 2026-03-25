"use client";

import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal,
  Mail,
  Trophy,
  History,
  ShieldAlert,
  Edit,
  UserCheck,
  UserX
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AdminSidebar } from "@/components/layout/AdminNav";
import { toast } from "sonner";

const mockUsers = [
  { id: "1", name: "Anirban G.", email: "anirban@golfgood.com", joined: "2026-01-12", status: "active", sub: "Premium Plus", charity: "Green Golf Earth", lastScore: "38pts" },
  { id: "2", name: "Jessica R.", email: "jess@example.com", joined: "2026-02-15", status: "active", sub: "Club Pro", charity: "Mental Par", lastScore: "34pts" },
  { id: "3", name: "Liam O.", email: "liam@golf.com", joined: "2026-03-01", status: "inactive", sub: "Basic", charity: "None", lastScore: "None" },
  { id: "4", name: "Sarah M.", email: "sarah@link.com", joined: "2026-03-10", status: "active", sub: "Club Pro", charity: "Fairway Kids", lastScore: "35pts" },
  { id: "5", name: "Mike T.", email: "mike@golfgood.com", joined: "2026-01-05", status: "active", sub: "Premium Plus", charity: "Green Golf Earth", lastScore: "42pts" },
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <main className="p-10 md:p-14 max-w-7xl mx-auto w-full">
           {/* Header */}
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-slate-900 rounded-[2rem] flex items-center justify-center shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Users className="text-white w-8 h-8 relative z-10" />
                 </div>
                 <div>
                    <h1 className="font-display font-black text-4xl text-slate-900 leading-none italic mb-1">User Directory</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Platform Community Management</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-emerald transition-colors" />
                    <input 
                       type="text" 
                       placeholder="Search members..." 
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       className="pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl w-full md:w-80 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-emerald/10 transition-all shadow-sm"
                    />
                 </div>
                 <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all group">
                    <Filter className="w-5 h-5" />
                 </button>
              </div>
           </div>

           {/* User Table */}
           <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
              <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                 <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-brand-emerald italic">{filteredUsers.length}</span>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Total Members Matched</span>
                 </div>
                 <div className="flex gap-2">
                    {["All", "Active", "Inactive", "Premium"].map(f => (
                       <button key={f} className={cn(
                          "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                          f === "All" ? "bg-brand-emerald text-white" : "bg-white border border-slate-200 text-slate-400 hover:bg-slate-50"
                       )}>
                          {f}
                       </button>
                    ))}
                 </div>
              </div>

              <div className="overflow-x-auto overflow-y-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr>
                          <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Member Info</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Joined Date</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Status</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Subscription</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {filteredUsers.map((u) => (
                         <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-10 py-8">
                               <div className="flex items-center gap-5">
                                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center font-display font-black text-xl text-brand-emerald transition-transform group-hover:rotate-6 shadow-sm border border-emerald-100">
                                     {u.name[0]}
                                  </div>
                                  <div>
                                     <div className="font-black text-slate-900 text-lg leading-none mb-1.5">{u.name}</div>
                                     <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-brand-emerald transition-colors">
                                        <Mail className="w-3 h-3" />
                                        {u.email}
                                     </div>
                                  </div>
                               </div>
                            </td>
                            <td className="px-10 py-8">
                               <div className="text-sm font-bold text-slate-500">{u.joined}</div>
                               <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1">First Score Post</div>
                            </td>
                            <td className="px-10 py-8">
                               <div className={cn(
                                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                                  u.status === "active" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-100 text-slate-400 border border-slate-200"
                               )}>
                                  <div className={cn("w-1.5 h-1.5 rounded-full", u.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-slate-400")} />
                                  {u.status}
                               </div>
                            </td>
                            <td className="px-10 py-8">
                               <div className="text-sm font-black text-slate-900 italic tracking-tighter mb-1">{u.sub}</div>
                               <div className="text-[9px] font-black text-brand-accent uppercase tracking-widest">{u.charity}</div>
                            </td>
                            <td className="px-10 py-8 text-right">
                               <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-brand-emerald hover:bg-emerald-50 transition-all" title="Edit Profile">
                                     <Edit className="w-4 h-4" />
                                  </button>
                                  <button className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-all" title="View History">
                                     <History className="w-4 h-4" />
                                  </button>
                                  <button className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all" title="Restrict Access">
                                     <ShieldAlert className="w-4 h-4" />
                                  </button>
                               </div>
                               <button className="p-2 border border-slate-100 rounded-xl group-hover:hidden">
                                  <MoreHorizontal className="w-4 h-4 text-slate-300" />
                               </button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <div className="p-10 flex items-center justify-between bg-slate-50/20 text-xs font-bold text-slate-400">
                 <div>Showing 1 - {filteredUsers.length} of {mockUsers.length} MEMBERS</div>
                 <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-100 rounded-xl hover:bg-white transition-all disabled:opacity-30" disabled>PREV</button>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">1</button>
                    <button className="px-4 py-2 border border-slate-100 rounded-xl hover:bg-white transition-all">NEXT</button>
                 </div>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}
