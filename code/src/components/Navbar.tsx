"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe, Mail, User, Send, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useSWR from "swr";
import { useLanguage } from "@/components/LanguageProvider";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Navbar() {
  const { lang, setLang } = useLanguage();
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

  const email = content?.contact?.email || "info@dipolltd.com";

  const nav = [
    { href: "/", label: { tr: "Ana Sayfa", en: "Home" } },
    { href: "/products", label: { tr: "Ürünler", en: "Products" } },
    { href: "/about", label: { tr: "Hakkımızda", en: "About" } },
    { href: "/contact", label: { tr: "İletişim", en: "Contact" } },
  ];

  const tr = (o: { tr: string; en: string }) => (lang === "tr" ? o.tr : o.en);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const subject =
      lang === "tr" ? `Teklif talebi - ${quoteForm.name}` : `Quote request - ${quoteForm.name}`;
    const body = [
      `${lang === "tr" ? "Ad Soyad" : "Name"}: ${quoteForm.name}`,
      `${lang === "tr" ? "E-posta" : "Email"}: ${quoteForm.email}`,
      `${lang === "tr" ? "Telefon" : "Phone"}: ${quoteForm.phone}`,
      "",
      quoteForm.message,
    ].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsQuoteModalOpen(false);
        setQuoteForm({ name: "", email: "", phone: "", message: "" });
      }, 2000);
    }, 600);
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-colors duration-200 border-b ${
          scrolled
            ? "bg-background/95 backdrop-blur border-border py-2"
            : "bg-background border-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative w-9 h-9 bg-primary rounded-md flex items-center justify-center text-white overflow-hidden">
                {content?.logo ? (
                  <Image src={content.logo} alt="DIPOL" fill className="object-contain p-1" />
                ) : (
                  <span className="font-bold text-lg">D</span>
                )}
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-bold text-lg tracking-tight">DIPOL</span>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  {lang === "tr" ? "Laboratuvar Tedariği" : "Laboratory Supply"}
                </span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tr(item.label)}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setLang(lang === "tr" ? "en" : "tr")}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Globe className="w-4 h-4" />
                {lang === "tr" ? "EN" : "TR"}
              </button>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="inline-flex items-center gap-2 text-sm font-semibold bg-primary text-white px-4 py-2 rounded-lg transition-colors hover:bg-primary/90"
              >
                <Mail className="w-4 h-4" />
                {lang === "tr" ? "Teklif Al" : "Get a Quote"}
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-muted-foreground"
              aria-label="Menu"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-background border-t border-border overflow-hidden"
            >
              <div className="px-4 py-3">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-1 py-3 text-base font-medium border-b border-border last:border-0"
                  >
                    {tr(item.label)}
                  </Link>
                ))}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    onClick={() => setLang(lang === "tr" ? "en" : "tr")}
                    className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-border text-sm font-semibold"
                  >
                    <Globe className="w-4 h-4" />
                    {lang === "tr" ? "EN" : "TR"}
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsQuoteModalOpen(true);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg font-semibold"
                  >
                    <Mail className="w-4 h-4" />
                    {lang === "tr" ? "Teklif Al" : "Get a Quote"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="bg-background rounded-xl border border-border w-full max-w-lg overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                <h3 className="font-semibold flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  {lang === "tr" ? "Teklif Talebi" : "Quote Request"}
                </h3>
                <button
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="p-1.5 hover:bg-secondary rounded-md transition-colors"
                  aria-label={lang === "tr" ? "Kapat" : "Close"}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="p-10 text-center">
                  <Check className="w-10 h-10 text-primary mx-auto mb-3" />
                  <p className="font-semibold mb-1">
                    {lang === "tr" ? "Talebiniz hazırlandı" : "Your request is ready"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {lang === "tr"
                      ? "E-posta uygulamanız açılıyor; lütfen mesajı onaylayıp gönderin."
                      : "Your email app is opening — please confirm and send the message."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">
                      {lang === "tr" ? "Ad Soyad" : "Full name"}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">
                        {lang === "tr" ? "E-posta" : "Email"}
                      </label>
                      <input
                        type="email"
                        required
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">
                        {lang === "tr" ? "Telefon" : "Phone"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">
                      {lang === "tr" ? "İhtiyacınız / mesajınız" : "Your requirement / message"}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={quoteForm.message}
                      onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg font-semibold transition-colors hover:bg-primary/90 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {lang === "tr" ? "Gönder" : "Send"}
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
