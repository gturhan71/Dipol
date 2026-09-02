"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.4 },
};

export default function About() {
  const { lang, t } = useLanguage();
  const { data: content, isLoading } = useSWR("/api/content", fetcher);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const about = content?.about || {};
  const values: string[] = about?.values?.[lang] || [];
  const services: any[] = content?.services || [];
  const groups: any[] = content?.productGroups || [];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Intro */}
      <section className="pt-32 pb-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{t(about.title)}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">{t(about.subtitle)}</p>
              <p className="text-muted-foreground leading-relaxed">{t(about.description)}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border mt-12 lg:mt-0"
            >
              <Image
                src={about.image || "/equipment-close.png"}
                alt="Dipol"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision / values */}
      <section className="py-20 border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl font-bold tracking-tight mb-3">
            {lang === "tr" ? "Vizyonumuz" : "Our vision"}
          </motion.h2>
          <motion.p {...fadeUp} className="text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            {t(about.vision)}
          </motion.p>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div key={i} {...fadeUp} className="border-t-2 border-primary pt-5">
                <span className="text-sm font-semibold text-muted-foreground">0{i + 1}</span>
                <p className="mt-2 leading-relaxed">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl font-bold tracking-tight mb-3">
            {lang === "tr" ? "Ne yapıyoruz" : "What we do"}
          </motion.h2>
          <motion.p {...fadeUp} className="text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            {t(about.mission)}
          </motion.p>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
            {services.map((service) => (
              <motion.div key={service.id} {...fadeUp} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">{t(service.title)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(service.description)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product groups summary */}
      {groups.length > 0 && (
        <section className="py-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeUp} className="text-3xl font-bold tracking-tight mb-12">
              {lang === "tr" ? "Çalıştığımız ürün grupları" : "Product groups we cover"}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {groups.map((group) => (
                <motion.div key={group.id} {...fadeUp} className="border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-3">{t(group.name)}</h3>
                  <ul className="space-y-2">
                    {(group.items?.[lang] || []).map((item: string) => (
                      <li key={item} className="text-sm text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-border rounded-xl p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                {lang === "tr" ? "Tedarik ihtiyaçlarınızı konuşalım" : "Let's talk about your supply needs"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {lang === "tr"
                  ? "Ekip, ürün ve alternatif belirleme sürecinde size yardımcı olur."
                  : "Our team helps you scope products and identify suitable alternatives."}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors hover:bg-primary/90"
            >
              {lang === "tr" ? "İletişime geçin" : "Get in touch"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
