"use client";

import { motion } from "framer-motion";
import { Beaker, Settings, ShieldCheck, CheckCircle2, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  {
    id: "consumables",
    name: "Laboratuvar Sarfları",
    description: "Günlük laboratuvar operasyonlarınız için yüksek kaliteli sarf malzemeleri.",
    icon: Beaker,
    items: [
      "Pipetler (Otomatik & Manuel)",
      "Cam Sarf Malzemeleri (Beher, Erlen, Balon Joje)",
      "Örnek Toplama Kapları & Tüpler",
      "Analitik Laboratuvar Cihazları Sarfları",
      "Filtre Kağıtları & Membranlar",
      "Likit Handling Çözümleri"
    ]
  },
  {
    id: "equipment",
    name: "Cihazlar & Ekipman",
    description: "Dünya markalarından hassas ölçüm ve test cihazları.",
    icon: Settings,
    items: [
      "Santrifüj Sistemleri (Hermle)",
      "Ultrasonik Banyo & Homojenizatörler (Branson)",
      "Hassas Teraziler & Tartım Sistemleri",
      "İnkübatörler & Etüvler",
      "Su Banyoları & Sirkülatörler",
      "Ölçüm Cihazları (Refraktometre, Polarimetre)"
    ]
  },
  {
    id: "safety",
    name: "Özel Ürünler & Güvenlik",
    description: "İş sağlığı ve güvenliği için kritik laboratuvar çözümleri.",
    icon: ShieldCheck,
    items: [
      "İş Güvenliği Ekipmanları",
      "Kriminal & Adli Tıp Sarfları",
      "Tehlikeli Madde Saklama Dolapları",
      "Özel Amaçlı Üretimler",
      "Laboratuvar Mobilya Sistemleri"
    ]
  }
];

export default function Products() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12 bg-secondary/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-end gap-8"
          >
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Ürün Kataloğumuz</h1>
              <p className="text-muted-foreground text-lg">
                Geniş ürün yelpazemizle bilimsel araştırmalarınızın her aşamasında yanınızdayız.
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Ürün veya marka ara..." 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
              </div>
              <button className="p-3 rounded-xl border border-border bg-background hover:bg-secondary transition-all">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 space-y-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <cat.icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">{cat.name}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">{cat.description}</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {cat.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all group">
                        <CheckCircle2 className="w-5 h-5 text-primary opacity-60" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-primary/20 border border-primary/10 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-40" />
                    <cat.icon className="w-32 h-32 text-primary/20 transition-transform group-hover:scale-110 duration-500" />
                    <span className="absolute bottom-8 right-8 glass px-6 py-3 rounded-full text-sm font-bold shadow-xl">
                      Kataloğu Görüntüle
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Logos */}
      <section className="py-20 border-t border-border bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-12">Çözüm Ortaklarımız</h3>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {["Hermle", "Branson", "Geneon", "Kisker", "Atago", "Esco", "GFL"].map((brand) => (
               <span key={brand} className="text-2xl font-bold">{brand}</span>
             ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
