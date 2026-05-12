"use client";

import Link from "next/link";
import useSWR from "swr";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Footer() {
  const { data: content } = useSWR("/api/content", fetcher);
  
  const contact = content?.contact || {
    address: "Aşağıöveçler Mah. 1325. Sok. No:13/B Çankaya / Ankara",
    phone: "0312 428 88 06",
    email: "info@dipolltd.com"
  };

  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="relative w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl overflow-hidden shadow-lg transition-transform group-hover:scale-110">
                {content?.logo ? (
                  <Image src={content.logo} alt="Logo" fill className="object-contain p-1" />
                ) : (
                  "D"
                )}
              </div>
              <span className="font-bold text-xl tracking-tight">DIPOL</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 text-sm leading-relaxed">
              Laboratuvar cihazları ve sarf malzemelerinde 20 yılı aşkın tecrübe ile bilimsel çalışmalarınıza değer katıyoruz.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Hızlı Linkler</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Ürünler</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">İletişim</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">İletişim</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>{contact.address}</li>
              <li>Tel: {contact.phone}</li>
              <li>Email: {contact.email}</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 DIPOL LTD. ŞTİ. Tüm Hakları Saklıdır.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Kullanım Koşulları</a>
            <a href="#" className="hover:text-primary">Gizlilik Politikası</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
