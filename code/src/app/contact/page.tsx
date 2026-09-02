"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Loader2, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Contact() {
  const { lang, t } = useLanguage();
  const { data: content, isLoading } = useSWR("/api/content", fetcher);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const contact = content?.contact || {};
  const email = contact.email || "info@dipolltd.com";
  const phone = contact.phone || "0312 428 88 06";
  const mapsQuery = contact.mapsQuery || "Aşağıöveçler Mah. 1325. Sok. No:13/B Çankaya Ankara";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = form.subject || (lang === "tr" ? "İletişim formu" : "Contact form");
    const body = [
      `${lang === "tr" ? "Ad Soyad" : "Name"}: ${form.name}`,
      `${lang === "tr" ? "E-posta" : "Email"}: ${form.email}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const details = [
    { icon: Phone, label: { tr: "Telefon", en: "Phone" }, value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    { icon: Mail, label: { tr: "E-posta", en: "Email" }, value: email, href: `mailto:${email}` },
    { icon: MapPin, label: { tr: "Adres", en: "Address" }, value: t(contact.address), href: null },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t(contact.title)}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t(contact.subtitle)}
          </p>
        </div>
      </section>

      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-12">
          <div className="space-y-8">
            {details.map((d) => (
              <div key={d.label.tr} className="flex items-start gap-3">
                <d.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold mb-1">{lang === "tr" ? d.label.tr : d.label.en}</p>
                  {d.href ? (
                    <a href={d.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {d.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">{d.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            {sent ? (
              <div className="border border-border rounded-xl p-10 text-center">
                <Check className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="font-semibold mb-1">
                  {lang === "tr" ? "Mesajınız hazırlandı" : "Your message is ready"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {lang === "tr"
                    ? "E-posta uygulamanız açıldı; mesajı onaylayıp gönderin."
                    : "Your email app has opened — confirm and send the message."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-border rounded-xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">
                      {lang === "tr" ? "Ad Soyad" : "Full name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">
                      {lang === "tr" ? "E-posta" : "Email"}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{lang === "tr" ? "Konu" : "Subject"}</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{lang === "tr" ? "Mesajınız" : "Message"}</label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-semibold transition-colors hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                  {lang === "tr" ? "Gönder" : "Send"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aspect-[21/9] rounded-xl border border-border overflow-hidden">
            <iframe
              title={lang === "tr" ? "Konum haritası" : "Location map"}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=15&output=embed`}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
