"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search, Globe, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: content } = useSWR("/api/content", fetcher);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
            <a href={`tel:${content?.contact?.phone}`} className="flex items-center gap-2 text-sm font-bold bg-primary text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
              <Phone className="w-4 h-4" />
              Teklif Al
            </a>
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
                <a href={`tel:${content?.contact?.phone}`} className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-bold">
                  <Phone className="w-4 h-4" /> Teklif Al
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
