"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, ArrowRight, User, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const supabase = createClient();
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      toast.success("Welcome aboard!", {
        description: "Please check your email to confirm your account.",
      });
      
      router.push("/onboarding");
    } catch (error: any) {
      toast.error("Auth Failure", {
        description: error.message || "Failed to create account.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <div className="text-center mb-10">
        <h1 className="font-display font-black text-3xl text-brand-emerald mb-3 italic underline decoration-brand-accent/30 decoration-8 underline-offset-[-2px]">Join the Club</h1>
        <p className="text-slate-500 font-medium">Elevate your performance and support a cause.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
            <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-emerald transition-colors" />
                <input 
                    type="text" 
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Anirban G."
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-emerald/10 focus:bg-white transition-all text-sm font-medium"
                />
            </div>
        </div>

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
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Password</label>
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
              Join Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-slate-50 text-center space-y-4">
        <p className="text-slate-500 text-sm font-medium">
          Already a Member? <Link href="/login" className="text-brand-emerald font-black hover:underline ml-1 text-sm tracking-tight">Access Your Account</Link>
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
