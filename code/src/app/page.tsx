"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Beaker, Zap, Settings, ShieldCheck, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const IconMap = {
  Beaker,
  Settings,
  ShieldCheck,
  Zap
};

export default function Home() {
  const [lang, setLang] = useState<"tr" | "en">("tr");
  const { data: content } = useSWR("/api/content", fetcher, {
    refreshInterval: 1000,
    fallbackData: {
      hero: { title: { tr: "...", en: "..." }, description: { tr: "...", en: "..." }, image: "/hero-lab.png" },
      categories: [],
      brands: [],
      stats: { experience: { tr: "20+ Yıl", en: "20+ Years" } }
    }
  });

  const t = (obj: any) => obj?.[lang] || obj?.tr || "";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              key={t(content?.hero?.title)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                {t(content?.hero?.title)?.split(' ').slice(0, -2).join(' ')} <br />
                <span className="text-primary">{t(content?.hero?.title)?.split(' ').slice(-2).join(' ')}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                {t(content?.hero?.description)}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#categories" className="bg-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:gap-4 transition-all shadow-xl shadow-primary/30">
                  {lang === "tr" ? "Ürünleri İncele" : "Explore Products"} <ArrowRight className="w-5 h-5" />
                </a>
                <button className="bg-secondary text-foreground px-8 py-4 rounded-xl font-semibold hover:bg-secondary/80 transition-all border border-border">
                  {lang === "tr" ? "Kurumsal" : "Corporate"}
                </button>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-8 grayscale opacity-60">
                {content?.brands?.slice(0, 5).map((brand: string) => (
                  <span key={brand} className="font-bold text-lg">{brand}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mt-12 lg:mt-0"
            >
              <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 dark:border-zinc-800">
                <Image
                  src={content?.hero?.image || "/hero-lab.png"}
                  alt="Modern Laboratory"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-xl max-w-xs"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg text-primary">
                    <Beaker className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{t(content?.stats?.experience) || (lang === "tr" ? "20+ Yıl" : "20+ Years")}</p>
                    <p className="text-sm text-muted-foreground">{lang === "tr" ? "Güvenilir Laboratuvar Çözümleri" : "Reliable Lab Solutions"}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="categories" className="py-24 bg-secondary/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              {lang === "tr" ? "Ürün Kategorilerimiz" : "Our Product Categories"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {lang === "tr" 
                ? "Laboratuvarınızın tüm ihtiyaçlarını tek bir çatı altında topluyoruz. Orijinal ve yüksek kaliteli çözümler."
                : "We gather all your laboratory needs under one roof. Original and high-quality solutions."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content?.categories?.map((cat: any, idx: number) => {
              const Icon = IconMap[cat.icon as keyof typeof IconMap] || Beaker;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-background p-8 rounded-3xl border border-border shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{t(cat.name)}</h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{t(cat.description)}</p>
                  <ul className="space-y-3">
                    {cat.items?.[lang]?.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary opacity-70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-8 text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    {lang === "tr" ? "Tümünü Gör" : "View All"} <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-1/2" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Özel Bir Projeniz mi Var?</h2>
              <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed font-medium">
                Laboratuvar kurulumu, ekipman tedariği veya teknik destek ihtiyaçlarınız için uzman ekibimiz yanınızda.
              </p>
              <button className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all">
                Bizimle İletişime Geçin
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
