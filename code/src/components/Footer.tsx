"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { KVKK_CONTENT } from "@/data/kvkk-content";
import { useLanguage } from "@/components/LanguageProvider";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const LEGAL_NAME = "Dipol Lab. ve Bilimsel Cihazlar Danışmanlık İth. İhr. San. ve Tic. Ltd. Şti.";

export default function Footer() {
  const { lang, t } = useLanguage();
  const { data: content } = useSWR("/api/content", fetcher);
  const [isKvkkOpen, setIsKvkkOpen] = useState(false);

  const contact = content?.contact || {
    address: { tr: "Aşağıöveçler Mah. 1325. Sok. No: 13/B Çankaya / Ankara", en: "" },
    phone: "0312 428 88 06",
    email: "info@dipolltd.com",
  };

  const nav = [
    { href: "/", label: { tr: "Ana Sayfa", en: "Home" } },
    { href: "/products", label: { tr: "Ürünler", en: "Products" } },
    { href: "/about", label: { tr: "Hakkımızda", en: "About" } },
    { href: "/contact", label: { tr: "İletişim", en: "Contact" } },
  ];

  const tr = (o: { tr: string; en: string }) => (lang === "tr" ? o.tr : o.en);

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold">
                D
              </span>
              <span className="font-bold text-lg tracking-tight">DIPOL</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {lang === "tr"
                ? "Laboratuvar cihazları, sarf malzemeleri ve yedek parçalarında 20 yılı aşkın tedarik tecrübesi."
                : "Over 20 years of supply experience in laboratory instruments, consumables and spare parts."}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">
              {lang === "tr" ? "Bağlantılar" : "Links"}
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {tr(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">
              {lang === "tr" ? "İletişim" : "Contact"}
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>{t(contact.address)}</li>
              <li>
                <a href={`tel:${(contact.phone || "").replace(/\s/g, "")}`} className="hover:text-foreground transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-foreground transition-colors">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {LEGAL_NAME}</p>
          <button
            onClick={() => setIsKvkkOpen(true)}
            className="hover:text-foreground transition-colors"
          >
            {lang === "tr" ? "KVKK Aydınlatma Metni" : "Privacy Notice (KVKK)"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isKvkkOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="bg-background rounded-xl border border-border w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                <h3 className="font-semibold">KVKK Aydınlatma Metni</h3>
                <button
                  onClick={() => setIsKvkkOpen(false)}
                  className="p-1.5 hover:bg-secondary rounded-md transition-colors"
                  aria-label="Kapat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 py-5 overflow-y-auto">
                <div className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">
                  {KVKK_CONTENT}
                </div>
              </div>
              <div className="px-6 py-4 border-t border-border text-right shrink-0">
                <button
                  onClick={() => setIsKvkkOpen(false)}
                  className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-primary/90"
                >
                  {lang === "tr" ? "Kapat" : "Close"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
