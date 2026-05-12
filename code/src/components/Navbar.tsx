"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search, Globe, Mail, Phone, User, MessageSquare, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: content } = useSWR("/api/content", fetcher);

  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call/Mail sending
    // In a real app, this would POST to /api/send-mail
    const mailBody = `Ad Soyad: ${quoteForm.name}%0D%0AE-posta: ${quoteForm.email}%0D%0ATelefon: ${quoteForm.phone}%0D%0AMesaj: ${quoteForm.message}`;
    window.location.href = `mailto:info@dipolltd.com?subject=Yeni Teklif Talebi - ${quoteForm.name}&body=${mailBody}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsQuoteModalOpen(false);
        setQuoteForm({ name: "", email: "", phone: "", message: "" });
      }, 2000);
    }, 1000);
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border py-2" : "bg-transparent py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white overflow-hidden shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                {content?.logo ? (
                  <Image src={content.logo} alt="Logo" fill className="object-contain p-1" />
                ) : (
                  <span className="font-bold text-2xl">D</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight leading-none">DIPOL</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Laboratuvar Çözümleri</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Ana Sayfa</Link>
              <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Ürünler</Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">Hakkımızda</Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">İletişim</Link>
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center gap-6">
              <button className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-primary">
                <Search className="w-5 h-5" />
              </button>
              <div className="h-4 w-[1px] bg-border" />
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="flex items-center gap-2 text-sm font-bold bg-primary text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
              >
                <Mail className="w-4 h-4" />
                Teklif Al
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-muted-foreground">
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                <Link href="/" className="block px-3 py-4 text-base font-medium border-b border-border/50">Ana Sayfa</Link>
                <Link href="/products" className="block px-3 py-4 text-base font-medium border-b border-border/50">Ürünler</Link>
                <Link href="/about" className="block px-3 py-4 text-base font-medium border-b border-border/50">Hakkımızda</Link>
                <Link href="/contact" className="block px-3 py-4 text-base font-medium border-b border-border/50">İletişim</Link>
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      setIsQuoteModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-bold"
                  >
                    <Mail className="w-4 h-4" /> Teklif Al
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Quote Request Modal */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background rounded-[2.5rem] border border-border shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-8 border-b border-border flex justify-between items-center bg-secondary/10">
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">Teklif Talebi Oluştur</h3>
                </div>
                <button onClick={() => setIsQuoteModalOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="p-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                    <Send className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold">Talebiniz Alındı!</h4>
                  <p className="text-muted-foreground">E-posta istemciniz açılıyor, lütfen formu onaylayıp gönderin.</p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="p-8 space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Ad Soyad</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        required
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-secondary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Örn: Gökhan Turhan"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-muted-foreground ml-1">E-posta</label>
                      <input 
                        type="email" 
                        required
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-secondary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="mail@örnek.com"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Telefon</label>
                      <input 
                        type="tel" 
                        required
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-secondary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="05xx..."
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">İhtiyacınız Olan Ürün / Mesaj</label>
                    <textarea 
                      required
                      rows={3}
                      value={quoteForm.message}
                      onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-secondary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Teklif almak istediğiniz ürünleri belirtiniz..."
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 mt-2"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    Teklif Talebi Gönder
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
