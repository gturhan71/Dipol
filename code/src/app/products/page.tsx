"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Beaker, Settings, ShieldCheck, Check, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GroupIcons: Record<string, typeof Beaker> = {
  Beaker,
  Settings,
  ShieldCheck,
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.4 },
};

export default function Products() {
  const { lang, t } = useLanguage();
  const { data: content, isLoading } = useSWR("/api/content", fetcher);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const groups: any[] = content?.productGroups || content?.categories || [];
  const brands: string[] = content?.brands || [];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="pt-32 pb-14 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {lang === "tr" ? "Ürün grupları" : "Product groups"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {lang === "tr"
                ? "Analitik ve genel laboratuvar sarflarından ekipman ve yedek parçalara, kullanım alanlarına göre tedarik ettiğimiz ürünler."
                : "From analytical and general lab consumables to equipment and spare parts — what we supply, organised by area of use."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-14">
          {groups.map((group, idx) => {
            const Icon = GroupIcons[group.icon] || Beaker;
            return (
              <motion.div
                key={group.id}
                {...fadeUp}
                className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start"
              >
                <div className="lg:col-span-1">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-3 mt-2 mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold tracking-tight">{t(group.name)}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(group.description)}
                  </p>
                </div>
                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {(group.items?.[lang] || []).map((item: string) => (
                    <div key={item} className="flex items-start gap-2.5 py-2 border-b border-border">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {brands.length > 0 && (
        <section className="py-16 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeUp} className="text-2xl font-bold tracking-tight mb-8">
              {lang === "tr" ? "Çözüm ortaklarımız" : "Our partners"}
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden">
              {brands.map((brand) => (
                <div
                  key={brand}
                  className="bg-background px-5 py-6 text-center font-semibold text-muted-foreground"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-border rounded-xl p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                {lang === "tr" ? "Aradığınız ürünü bulamadınız mı?" : "Can't find what you need?"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {lang === "tr"
                  ? "Marka ve model belirterek yazın; orijinal ürünü veya uyumlu alternatifini tedarik edelim."
                  : "Send us the brand and model — we'll source the original or a compatible alternative."}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors hover:bg-primary/90"
            >
              {lang === "tr" ? "Teklif isteyin" : "Request a quote"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
