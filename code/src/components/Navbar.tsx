"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-110">
              D
            </div>
            <span className="font-bold text-xl tracking-tight">DIPOL</span>
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Ürünler</Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">Hakkımızda</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">İletişim</Link>
            <a 
              href="http://www.dipolltd.com/magaza/" 
              target="_blank" 
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <ShoppingCart className="w-4 h-4" />
              Mağaza
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
