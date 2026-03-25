"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const supabase = createClient();
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Identify account role (check metadata first for resilience, then DB)
      const isAdmin = data.user.user_metadata?.role === "admin";
      
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (isAdmin || profile?.role === "admin") {
        await supabase.auth.signOut();
        toast.error("Restricted Account", {
          description: "This is an administrator account. Please use the Admin Portal.",
        });
        router.push("/admin/login");
        return;
      }

      toast.success("Welcome back!", {
        description: "Redirecting to your dashboard...",
      });
      router.push("/dashboard");
    } catch (error: any) {
      toast.error("Auth Failure", {
        description: error.message || "Failed to sign in.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <div className="text-center mb-10">
        <h1 className="font-display font-black text-3xl text-brand-emerald mb-3">Welcome Back</h1>
        <p className="text-slate-500 font-medium">Continue your performance and impact journey.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-emerald transition-colors" />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="golf@example.com"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-emerald/10 focus:bg-white transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between ml-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Password</label>
            <Link href="#" className="text-xs font-bold text-brand-emerald hover:underline">Forgot?</Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-emerald transition-colors" />
            <input 
              type={showPassword ? "text" : "password"} 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-emerald/10 focus:bg-white transition-all text-sm font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-emerald transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button 
          disabled={loading}
          type="submit"
          className="w-full bg-brand-emerald text-white py-5 rounded-2xl font-black text-lg hover:bg-brand-emerald/90 transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
            <>
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-slate-50 text-center space-y-4">
        <p className="text-slate-500 text-sm font-medium">
          New to Golf for Good? <Link href="/signup" className="text-brand-emerald font-black hover:underline ml-1">Join the Club</Link>
        </p>
        <div className="flex justify-center">
          <Link 
            href="/admin/login" 
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-brand-emerald transition-colors p-2"
          >
            <ShieldCheck className="w-4 h-4" />
            Admin Entrance
          </Link>
        </div>
      </div>
    </div>
  );
}
