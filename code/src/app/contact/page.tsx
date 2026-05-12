"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageSquare, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Contact() {
  const { data: content, isLoading } = useSWR("/api/content", fetcher);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/10">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  const contact = content?.contact || {
    address: "Aşağıöveçler Mah. 1325. Sok. No:13/B Çankaya / Ankara",
    phone: "0312 428 88 06",
    email: "info@dipolltd.com",
    mapsQuery: "Aşağıöveçler Mah. 1325. Sok. No:13/B Çankaya Ankara"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">İletişim</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sorularınız, teknik destek talepleriniz veya fiyat teklifi almak için bize ulaşın.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div className="p-8 rounded-3xl bg-secondary/20 border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">Telefon</h3>
                <p className="text-muted-foreground">{contact.phone}</p>
              </div>

              <div className="p-8 rounded-3xl bg-secondary/20 border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">E-posta</h3>
                <p className="text-muted-foreground">{contact.email}</p>
              </div>

              <div className="p-8 rounded-3xl bg-secondary/20 border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">Adres</h3>
                <p className="text-muted-foreground">{contact.address}</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="p-10 rounded-[2.5rem] bg-background border border-border shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-primary" />
                  Bize Mesaj Gönderin
                </h2>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1">Adınız Soyadınız</label>
                      <input 
                        type="text" 
                        placeholder="Örn: Ahmet Yılmaz"
                        className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1">E-posta Adresiniz</label>
                      <input 
                        type="email" 
                        placeholder="Örn: ahmet@mail.com"
                        className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Konu</label>
                    <input 
                      type="text" 
                      placeholder="Örn: Teknik Destek"
                      className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Mesajınız</label>
                    <textarea 
                      rows={5}
                      placeholder="Size nasıl yardımcı olabiliriz?"
                      className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    ></textarea>
                  </div>

                  <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl shadow-primary/20 transition-all">
                    Mesajı Gönder <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Integration */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aspect-[21/9] rounded-[3rem] bg-secondary/30 border border-border overflow-hidden relative shadow-inner">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.5) contrast(1.2) invert(0.05)" }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD-NO_REAL_KEY_NEEDED_FOR_SIMPLE_EMBED_SOMETIMES_BUT_GOOGLE_ALLOWS_DIRECT_SEARCH_IFRAME&q=${encodeURIComponent(contact.mapsQuery)}`}
              // Note: For standard embed without key, we can use the search URL
              srcDoc={`
                <style>body{margin:0;overflow:hidden;}iframe{border:0;width:100%;height:100%;filter:grayscale(0.2);}</style>
                <iframe src="https://maps.google.com/maps?q=${encodeURIComponent(contact.mapsQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed"></iframe>
              `}
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
