"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Save, 
  Edit3, 
  Plus, 
  Trash2,
  CheckCircle2,
  Loader2,
  X,
  Info,
  Tag,
  Phone,
  MapPin,
  Mail,
  Zap,
  MessageSquare,
  Globe,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("content");
  const [logo, setLogo] = useState("");
  const [heroTitle, setHeroTitle] = useState({ tr: "", en: "" });
  const [heroDesc, setHeroDesc] = useState({ tr: "", en: "" });
  const [heroImage, setHeroImage] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [about, setAbout] = useState<any>({ title: "", subtitle: "", description: "", vision: "", mission: "", image: "" });
  const [brands, setBrands] = useState<string[]>([]);
  const [contact, setContact] = useState<any>({ title: "", subtitle: "", address: "", phone: "", email: "", mapsQuery: "" });
  const [stats, setStats] = useState<any>({});
  const [testimonials, setTestimonials] = useState<any[]>([]);
  
  const [seo, setSeo] = useState<any>({ 
    title: "", 
    description: "", 
    keywords: "", 
    en: { title: "", description: "", keywords: "" } 
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  useEffect(() => {
    fetch("/api/content")
      .then(res => {
        if (res.status === 401) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        setLogo(data.logo || "");
        setSeo(data.seo || { title: "", description: "", keywords: "", en: { title: "", description: "", keywords: "" } });
        setHeroTitle(data.hero.title || { tr: "", en: "" });
        setHeroDesc(data.hero.description || { tr: "", en: "" });
        setHeroImage(data.hero.image || "/hero-lab.png");
        setCategories(data.categories || []);
        setAbout(data.about || {});
        setBrands(data.brands || []);
        setContact(data.contact || {});
        setStats(data.stats || {});
        setTestimonials(data.testimonials || []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        router.push("/portal/login");
      });
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    }
    router.push("/portal/login");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          seo: seo,
          logo: logo,
          hero: { title: heroTitle, description: heroDesc, image: heroImage },
          stats: stats,
          about: about,
          contact: contact,
          brands: brands,
          categories: categories,
          testimonials: testimonials
        })
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (response.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "hero" | "about" | "logo") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(target);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();
      if (data.success) {
        if (target === "hero") setHeroImage(data.url);
        if (target === "about") setAbout({ ...about, image: data.url });
        if (target === "logo") setLogo(data.url);
      } else {
        alert(data.error || "Dosya yükleme başarısız.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Bağlantı hatası oluştu.");
    } finally {
      setUploadingImage(null);
    }
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const addCategory = () => {
    const newCat = {
      id: `cat_${Date.now()}`,
      name: "Yeni Kategori",
      description: "Kategori açıklaması buraya gelecek.",
      icon: "Beaker",
      items: ["Ürün 1", "Ürün 2"]
    };
    setCategories([...categories, newCat]);
    setEditingCategory(newCat);
  };

  const updateEditingCategory = (field: string, value: any) => {
    setEditingCategory({ ...editingCategory, [field]: value });
  };

  const saveEditedCategory = () => {
    setCategories(categories.map(c => c.id === editingCategory.id ? editingCategory : c));
    setEditingCategory(null);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/10">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-background border-r border-border flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">D</div>
          <span className="font-bold text-lg">Admin Panel</span>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: "settings", icon: Settings, label: "Genel Ayarlar" },
            { id: "seo", icon: Globe, label: "SEO Yönetimi" },
            { id: "content", icon: FileText, label: "Ana Sayfa" },
            { id: "about", icon: Info, label: "Hakkımızda" },
            { id: "testimonials", icon: MessageSquare, label: "Yorumlar" },
            { id: "contact", icon: MapPin, label: "İletişim" },
            { id: "brands", icon: Tag, label: "Markalar" },
            { id: "stats", icon: Zap, label: "İstatistikler" }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/5 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Çıkış Yap
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight uppercase">
              {activeTab === "settings" && "Genel Site Ayarları"}
              {activeTab === "seo" && "Arama Motoru Ayarları (SEO)"}
              {activeTab === "content" && "Ana Sayfa Yönetimi"}
              {activeTab === "about" && "Hakkımızda Sayfası"}
              {activeTab === "testimonials" && "Müşteri Yorumları"}
              {activeTab === "contact" && "İletişim Bilgileri"}
              {activeTab === "brands" && "Marka Yönetimi"}
              {activeTab === "stats" && "İstatistik Yönetimi"}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">Gerçek zamanlı site düzenleme modülü.</p>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={isSaving || isSaved}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              isSaved ? "bg-green-500 text-white" : "bg-primary text-white hover:shadow-xl active:scale-95 disabled:opacity-50"
            }`}
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {isSaving ? "Kaydediliyor..." : isSaved ? "Kaydedildi" : "Değişiklikleri Kaydet"}
          </button>
        </header>

        {activeTab === "settings" && (
          <section className="bg-background rounded-3xl border border-border p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Logo ve Marka Kimliği</h3>
            <div className="max-w-md space-y-6">
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase text-muted-foreground block">Firma Logosu</label>
                <div className="relative w-32 h-32 bg-secondary/10 rounded-2xl border border-border overflow-hidden group">
                  {logo ? (
                    <Image src={logo} alt="Logo" fill className="object-contain p-4" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary font-bold text-4xl">D</div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer bg-white text-black p-2 rounded-lg">
                      <Upload className="w-4 h-4" />
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "logo")}
                      />
                    </label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Önerilen: Şeffaf arka planlı PNG (512x512px)</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "seo" && (
          <div className="space-y-8">
            <section className="bg-background rounded-3xl border border-border p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <h3 className="text-lg font-bold">Türkçe SEO Ayarları</h3>
              </div>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Site Başlığı (Title)</label>
                  <input 
                    type="text" 
                    value={seo.title}
                    onChange={(e) => setSeo({...seo, title: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Site Açıklaması (Meta Description)</label>
                  <textarea 
                    rows={3}
                    value={seo.description}
                    onChange={(e) => setSeo({...seo, description: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Anahtar Kelimeler (Keywords - Virgülle ayırın)</label>
                  <textarea 
                    rows={3}
                    value={seo.keywords}
                    onChange={(e) => setSeo({...seo, keywords: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 resize-none"
                  />
                </div>
              </div>
            </section>

            <section className="bg-background rounded-3xl border border-border p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <h3 className="text-lg font-bold">English SEO Settings</h3>
              </div>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Site Title</label>
                  <input 
                    type="text" 
                    value={seo.en?.title}
                    onChange={(e) => setSeo({...seo, en: {...seo.en, title: e.target.value}})}
                    className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Meta Description</label>
                  <textarea 
                    rows={3}
                    value={seo.en?.description}
                    onChange={(e) => setSeo({...seo, en: {...seo.en, description: e.target.value}})}
                    className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Keywords (Comma separated)</label>
                  <textarea 
                    rows={3}
                    value={seo.en?.keywords}
                    onChange={(e) => setSeo({...seo, en: {...seo.en, keywords: e.target.value}})}
                    className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 resize-none"
                  />
                </div>
              </div>
            </section>

            <section className="bg-background rounded-3xl border border-border p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h3 className="text-lg font-bold">Analytics & Tracking</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Google Tag Manager ID</label>
                  <input 
                    type="text" 
                    placeholder="GTM-XXXXXXX"
                    value={seo.analytics?.gtmId}
                    onChange={(e) => setSeo({...seo, analytics: {...seo.analytics, gtmId: e.target.value}})}
                    className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Google Analytics 4 (GA4) ID</label>
                  <input 
                    type="text" 
                    placeholder="G-XXXXXXX"
                    value={seo.analytics?.gaId}
                    onChange={(e) => setSeo({...seo, analytics: {...seo.analytics, gaId: e.target.value}})}
                    className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 font-mono"
                  />
                </div>
              </div>
              <p className="mt-4 text-[10px] text-muted-foreground bg-secondary/5 p-4 rounded-xl">
                <strong>Not:</strong> Değişiklikler kaydedildikten sonra tüm sayfalarda otomatik olarak aktifleşecektir. GTM ID genellikle "GTM-" ile, GA4 ID ise "G-" ile başlar.
              </p>
            </section>
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-8">
            <section className="bg-background rounded-3xl border border-border p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Edit3 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Hero Bölümü</h3>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Ana Başlık (TR)</label>
                      <input 
                        type="text" 
                        value={heroTitle?.tr || ""}
                        onChange={(e) => setHeroTitle({ ...heroTitle, tr: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-semibold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Main Title (EN)</label>
                      <input 
                        type="text" 
                        value={heroTitle?.en || ""}
                        onChange={(e) => setHeroTitle({ ...heroTitle, en: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-semibold"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Alt Açıklama (TR)</label>
                      <textarea 
                        rows={3}
                        value={heroDesc?.tr || ""}
                        onChange={(e) => setHeroDesc({ ...heroDesc, tr: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Subtitle (EN)</label>
                      <textarea 
                        rows={3}
                        value={heroDesc?.en || ""}
                        onChange={(e) => setHeroDesc({ ...heroDesc, en: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary/10 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase text-muted-foreground block">Hero Görseli</label>
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-secondary/5 group">
                    <Image src={heroImage} alt="Hero" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        {uploadingImage === "hero" ? "Yükleniyor..." : "Görsel Seç"}
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, "hero")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-background rounded-3xl border border-border p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold">Kategori Yönetimi</h3>
                </div>
                <button onClick={addCategory} className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                  <Plus className="w-4 h-4" /> Yeni Kategori
                </button>
              </div>

              <div className="grid gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between p-6 rounded-2xl border border-border hover:border-primary/30 transition-all group bg-secondary/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <h4 className="font-bold">{cat.name}</h4>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingCategory(cat)} className="p-2 hover:bg-secondary rounded-lg"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => deleteCategory(cat.id)} className="p-2 hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4 text-destructive" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "about" && (
          <div className="space-y-8">
            <section className="bg-background rounded-3xl border border-border p-8 shadow-sm">
              <h3 className="text-lg font-bold mb-6">Hakkımızda Sayfa İçeriği</h3>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Sayfa Başlığı</label>
                    <input 
                      type="text" 
                      value={about.title}
                      onChange={(e) => setAbout({...about, title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Kısa Alt Başlık</label>
                    <textarea 
                      rows={2}
                      value={about.subtitle}
                      onChange={(e) => setAbout({...about, subtitle: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Ana Açıklama Metni</label>
                    <textarea 
                      rows={4}
                      value={about.description}
                      onChange={(e) => setAbout({...about, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/10"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase text-muted-foreground block">Hakkımızda Görseli</label>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-secondary/5 group">
                    {about.image ? (
                      <Image src={about.image} alt="About" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground"><ImageIcon className="w-10 h-10" /></div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        {uploadingImage === "about" ? "Yükleniyor..." : "Görsel Seç"}
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, "about")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 border-t border-border pt-6 mt-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Vizyonumuz</label>
                  <textarea 
                    rows={3}
                    value={about.vision}
                    onChange={(e) => setAbout({...about, vision: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Misyonumuz</label>
                  <textarea 
                    rows={3}
                    value={about.mission}
                    onChange={(e) => setAbout({...about, mission: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/10"
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "testimonials" && (
          <section className="bg-background rounded-3xl border border-border p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Müşteri Yorumlarını Yönet</h3>
            <div className="grid gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className="p-6 rounded-2xl border border-border hover:border-primary/30 transition-all bg-secondary/5 group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-xs">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{t.name}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{t.role} • {t.date}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteTestimonial(t.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">"{t.comment}"</p>
                </div>
              ))}
              {testimonials.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl">
                  <p className="text-muted-foreground">Henüz yorum bulunmuyor.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "contact" && (
          <div className="space-y-8">
            <section className="bg-background rounded-3xl border border-border p-8 shadow-sm">
              <h3 className="text-lg font-bold mb-6">İletişim Sayfa İçeriği</h3>
              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Sayfa Başlığı</label>
                    <input 
                      type="text" 
                      value={contact.title}
                      onChange={(e) => setContact({...contact, title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Alt Başlık</label>
                    <input 
                      type="text" 
                      value={contact.subtitle}
                      onChange={(e) => setContact({...contact, subtitle: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Adres</label>
                  <textarea 
                    rows={2}
                    value={contact.address}
                    onChange={(e) => setContact({...contact, address: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/10"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Telefon</label>
                    <input 
                      type="text" 
                      value={contact.phone}
                      onChange={(e) => setContact({...contact, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">E-posta</label>
                    <input 
                      type="email" 
                      value={contact.email}
                      onChange={(e) => setContact({...contact, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Google Maps Arama Terimi</label>
                  <input 
                    type="text" 
                    value={contact.mapsQuery}
                    onChange={(e) => setContact({...contact, mapsQuery: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/10"
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "brands" && (
          <section className="bg-background rounded-3xl border border-border p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Tedarikçi Markalar</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  id="newBrand"
                  placeholder="Yeni marka ekle..."
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-secondary/10"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.currentTarget;
                      if (input.value) {
                        setBrands([...brands, input.value]);
                        input.value = "";
                      }
                    }
                  }}
                />
                <button 
                  onClick={() => {
                    const input = document.getElementById('newBrand') as HTMLInputElement;
                    if (input.value) {
                      setBrands([...brands, input.value]);
                      input.value = "";
                    }
                  }}
                  className="bg-primary text-white px-6 py-3 rounded-xl font-bold"
                >
                  Ekle
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3 pt-4">
                {brands.map((brand, i) => (
                  <div key={i} className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full border border-border group transition-all hover:border-primary/30">
                    <span className="text-sm font-medium">{brand}</span>
                    <button 
                      onClick={() => setBrands(brands.filter((_, idx) => idx !== i))}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === "stats" && (
          <section className="bg-background rounded-3xl border border-border p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Site İstatistikleri</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.keys(stats).map((key) => (
                <div key={key} className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground capitalize">{key}</label>
                  <input 
                    type="text" 
                    value={stats[key]}
                    onChange={(e) => setStats({...stats, [key]: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/10"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Category Edit Modal */}
        <AnimatePresence>
          {editingCategory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-background rounded-[2rem] border border-border shadow-2xl w-full max-w-2xl overflow-hidden"
              >
                <div className="p-8 border-b border-border flex justify-between items-center bg-secondary/10">
                  <h3 className="text-xl font-bold">Kategori Düzenle</h3>
                  <button onClick={() => setEditingCategory(null)} className="p-2 hover:bg-secondary rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-8 space-y-6">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Kategori Adı</label>
                      <input 
                        type="text" 
                        value={editingCategory.name}
                        onChange={(e) => updateEditingCategory("name", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Açıklama</label>
                      <textarea 
                        rows={2}
                        value={editingCategory.description}
                        onChange={(e) => updateEditingCategory("description", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/10 resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Ürünler (Virgülle Ayırın)</label>
                      <textarea 
                        rows={3}
                        value={editingCategory.items.join(", ")}
                        onChange={(e) => updateEditingCategory("items", e.target.value.split(",").map((s: string) => s.trim()))}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/10 resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={saveEditedCategory} className="flex-1 bg-primary text-white py-4 rounded-xl font-bold">Uygula</button>
                    <button onClick={() => setEditingCategory(null)} className="flex-1 bg-secondary text-foreground py-4 rounded-xl font-bold">İptal</button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
