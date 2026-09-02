"use client";

import Image from "next/image";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  ArrowRight,
  Beaker,
  Settings,
  ShieldCheck,
  Wrench,
  Repeat,
  Truck,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ServiceIcons: Record<string, typeof Beaker> = {
  Wrench,
  Beaker,
  Repeat,
  Truck,
};

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

export default function Home() {
  const { lang, t } = useLanguage();
  const { data: content } = useSWR("/api/content", fetcher, {
    fallbackData: {
      hero: { title: {}, description: {}, image: "/hero-lab.png" },
      stats: {},
      consulting: { points: {} },
      services: [],
      partners: [],
      brands: [],
      productGroups: [],
      about: { values: {} },
    },
  });

  const hero = content?.hero || {};
  const stats = content?.stats || {};
  const consulting = content?.consulting || {};
  const services: any[] = content?.services || [];
  const partners: string[] = content?.partners || [];
  const brands: string[] = content?.brands || [];
  const groups: any[] = content?.productGroups || [];
  const values: string[] = content?.about?.values?.[lang] || [];

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
              <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <p className="text-sm font-semibold text-primary mb-4">
                  {lang === "tr" ? "Ankara merkezli laboratuvar tedariği" : "Ankara-based laboratory supply"}
                </p>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5">
                  {t(hero.title)}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                  {t(hero.description)}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold transition-colors hover:bg-primary/90"
                  >
                    {lang === "tr" ? "Ürün gruplarını görün" : "See product groups"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-semibold transition-colors hover:bg-secondary"
                  >
                    {lang === "tr" ? "Teklif isteyin" : "Request a quote"}
                  </Link>
                </div>

                {partners.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                      {lang === "tr" ? "İş ortaklıklarımızdan bazıları" : "Some of our partners"}
                    </p>
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                      {partners.map((p) => (
                        <span key={p} className="text-base font-semibold text-muted-foreground">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative mt-12 lg:mt-0"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border">
                  <Image
                    src={hero.image || "/hero-lab.png"}
                    alt={lang === "tr" ? "Laboratuvar" : "Laboratory"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="border border-border rounded-lg p-4">
                    <p className="text-2xl font-bold">{t(stats.experience)}</p>
                    <p className="text-sm text-muted-foreground">
                      {lang === "tr" ? "Sektör tecrübesi" : "Industry experience"}
                    </p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="text-2xl font-bold">{t(stats.brands)}</p>
                    <p className="text-sm text-muted-foreground">
                      {lang === "tr" ? "Global tedarik markası" : "Global supply brands"}
                    </p>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </section>

        {/* Procurement consultancy */}
        <section className="py-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <m.div {...fadeUp} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-5">{t(consulting.title)}</h2>
                <p className="text-muted-foreground leading-relaxed">{t(consulting.description)}</p>
              </div>
              <ul className="space-y-4">
                {(consulting.points?.[lang] || []).map((point: string) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </m.div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 border-b border-border bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <m.h2 {...fadeUp} className="text-3xl font-bold tracking-tight mb-3">
              {lang === "tr" ? "Servislerimiz" : "Our services"}
            </m.h2>
            <m.p {...fadeUp} className="text-muted-foreground mb-12 max-w-2xl">
              {lang === "tr"
                ? "Tedarik sürecinin her aşamasında yanınızdayız."
                : "We support you at every stage of the procurement process."}
            </m.p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
              {services.map((service) => {
                const Icon = ServiceIcons[service.icon] || Wrench;
                return (
                  <div key={service.id} className="bg-background p-6">
                    <Icon className="w-6 h-6 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">{t(service.title)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(service.description)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Brand portfolio */}
        <section className="py-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <m.h2 {...fadeUp} className="text-3xl font-bold tracking-tight mb-3">
              {lang === "tr" ? "Ürün portföyümüz" : "Our portfolio"}
            </m.h2>
            <m.p {...fadeUp} className="text-muted-foreground mb-12 max-w-2xl">
              {lang === "tr"
                ? "Farklı uygulamalara yönelik çözümler sunduğumuz markalar."
                : "Brands we work with across a range of applications."}
            </m.p>
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

        {/* Product groups */}
        <section className="py-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <m.h2 {...fadeUp} className="text-3xl font-bold tracking-tight mb-3">
              {lang === "tr" ? "Ürün grupları" : "Product groups"}
            </m.h2>
            <m.p {...fadeUp} className="text-muted-foreground mb-12 max-w-2xl">
              {lang === "tr" ? "Kullanım alanlarına göre" : "Organised by area of use"}
            </m.p>
            <div className="grid md:grid-cols-3 gap-8">
              {groups.map((group) => {
                const Icon = GroupIcons[group.icon] || Beaker;
                return (
                  <m.div
                    key={group.id}
                    {...fadeUp}
                    className="border border-border rounded-xl p-6"
                  >
                    <Icon className="w-6 h-6 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{t(group.name)}</h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                      {t(group.description)}
                    </p>
                    <ul className="space-y-2">
                      {(group.items?.[lang] || []).map((item: string) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </m.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-20 border-b border-border bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <m.h2 {...fadeUp} className="text-3xl font-bold tracking-tight mb-12">
              {lang === "tr" ? "Vizyonumuz" : "Our vision"}
            </m.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, i) => (
                <m.div key={i} {...fadeUp} className="border-t-2 border-primary pt-5">
                  <span className="text-sm font-semibold text-muted-foreground">
                    0{i + 1}
                  </span>
                  <p className="mt-2 text-foreground leading-relaxed">{value}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border border-border rounded-xl p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                  {lang === "tr" ? "Bir projeniz mi var?" : "Have a project in mind?"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {lang === "tr"
                    ? "İhtiyaç duyduğunuz ekipman, sarf ve yedek parçalar için fiyat teklifi ve teknik destek alın."
                    : "Get a quote and technical support for the equipment, consumables and spare parts you need."}
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
    </LazyMotion>
  );
}
