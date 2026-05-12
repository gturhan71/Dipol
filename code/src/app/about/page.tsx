"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Target, Rocket, Award, Loader2, MessageSquare, Star, Send, X } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function About() {
  const { data: content, isLoading } = useSWR("/api/content", fetcher);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", role: "", comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedTestimonials = [
        ...(content?.testimonials || []),
        { ...newReview, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] }
      ];
      
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...content, testimonials: updatedTestimonials })
      });

      if (response.ok) {
        mutate("/api/content"); // Update SWR cache
        setIsModalOpen(false);
        setNewReview({ name: "", role: "", comment: "" });
      }
    } catch (error) {
      console.error("Review submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/10">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  const about = content?.about || {};
  const testimonials = content?.testimonials || [];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">{about.title}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {about.subtitle}
              </p>
              <div className="flex gap-4">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-secondary flex items-center justify-center font-bold text-xs text-muted-foreground">
                      D
                    </div>
                  ))}
                </div>
                <div className="flex flex-col text-sm">
                  <span className="font-bold">{content?.stats?.clients || "1000+"}</span>
                  <span className="text-muted-foreground">Müşteri Memnuniyeti</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mt-12 lg:mt-0"
            >
              <Image 
                src="/equipment-close.png" 
                alt="Dipol Office" 
                fill 
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Müşteri Deneyimleri</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                İş ortaklarımızın ve müşterilerimizin laboratuvar çözümlerimiz hakkındaki görüşleri.
              </p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:shadow-xl transition-all active:scale-95"
            >
              <MessageSquare className="w-5 h-5" /> Yorum Yap
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t: any, idx: number) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[2rem] border border-border bg-secondary/5 relative"
              >
                <div className="flex gap-1 text-primary mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary" />)}
                </div>
                <p className="text-muted-foreground italic mb-6 leading-relaxed">"{t.comment}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background rounded-[2.5rem] border border-border shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-8 border-b border-border flex justify-between items-center bg-secondary/10">
                <h3 className="text-xl font-bold">Deneyiminizi Paylaşın</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmitReview} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Adınız Soyadınız</label>
                  <input 
                    type="text" 
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Örn: Dr. Emre Ak"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Ünvan / Kurum</label>
                  <input 
                    type="text" 
                    required
                    value={newReview.role}
                    onChange={(e) => setNewReview({...newReview, role: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Örn: Lab Yöneticisi"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Yorumunuz</label>
                  <textarea 
                    required
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Görüşlerinizi buraya yazabilirsiniz..."
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  Yorumu Gönder
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
