"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // SECURITY: Store token (ideally in an HTTP-only cookie, but for this demo localStorage works with server-side validation)
        localStorage.setItem("dipol_admin_auth", data.token);
        router.push("/portal/dashboard");
      } else {
        setError(data.error || "Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      }
    } catch (err) {
      setError("Sunucu ile iletişim kurulamadı.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-background rounded-[2.5rem] border border-border p-10 shadow-2xl shadow-primary/5"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Girişi</h1>
          <p className="text-muted-foreground mt-2 text-sm">Dipol Ltd. İçerik Yönetim Sistemi</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Kullanıcı Adı</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-secondary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="admin"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Şifre</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-secondary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-destructive text-sm font-medium text-center bg-destructive/10 py-3 rounded-xl"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Giriş Yap"}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Şifrenizi mi unuttunuz? Sistem yöneticisi ile iletişime geçin.
        </p>
      </motion.div>
    </div>
  );
}
