# 🧪 Dipol Ltd. — Modern Laboratuvar Çözümleri Portalı

> **Next.js 16** üzerine inşa edilmiş, tam yönetilebilir kurumsal web sitesi ve CMS platformu.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red)]()

---

## 📋 Proje Hakkında

**Dipol Ltd. Şti.**, Ankara merkezli laboratuvar cihazları ve sarf malzemeleri tedarikçisidir. Bu proje, şirketin mevcut web sitesini (`www.dipolltd.com`) modern teknolojilerle yeniden inşa eder ve teknik bilgi gerektirmeden tüm site içeriğini yönetebilmeyi sağlayan bir **Admin Portal** sunar.

### Temel Özellikler

| Özellik | Açıklama |
|---|---|
| 🏠 **Dinamik Ana Sayfa** | Hero, kategoriler, istatistikler ve marka listesi — tümü CMS'den yönetilir |
| 📝 **Hakkımızda Sayfası** | Vizyon, misyon, açıklama metinleri + müşteri yorumları sistemi |
| 📞 **İletişim Sayfası** | Dinamik adres/telefon/e-posta + Google Maps entegrasyonu |
| 🛒 **Ürünler Sayfası** | Kategoriye göre filtreleme destekli ürün kataloğu |
| 🔐 **Admin Portalı** | Giriş korumalı, 6 sekmeli tam içerik yönetim paneli |
| 💬 **Yorum Sistemi** | Kullanıcılar yorum bırakabilir, admin portaldan moderasyon yapılabilir |
| 📤 **Resim Yükleme API** | Siteye doğrudan görsel yükleme desteği |
| ⚡ **Gerçek Zamanlı Güncelleme** | SWR polling ile admin değişiklikleri anında siteye yansır |

---

## 🛠️ Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Stil** | Tailwind CSS 4 |
| **Animasyon** | Framer Motion |
| **İkonlar** | Lucide React |
| **Veri Çekme** | SWR (stale-while-revalidate) |
| **Veri Tabanı** | JSON tabanlı dosya sistemi (`site-content.json`) |
| **Paket Yönetimi** | pnpm |

---

## 📁 Proje Yapısı

```
Dipol/
├── README.md
├── memory.md
├── gitrepo.md
├── entities.json
│
└── code/                          # Next.js uygulaması
    ├── public/
    │   ├── uploads/               # Yüklenen görseller
    │   ├── hero-lab.png           # Hero görseli
    │   └── equipment-close.png    # Ekipman görseli
    │
    └── src/
        ├── app/
        │   ├── page.tsx           # Ana sayfa
        │   ├── layout.tsx         # Root layout
        │   ├── globals.css        # Global stiller
        │   ├── about/page.tsx     # Hakkımızda + yorumlar
        │   ├── contact/page.tsx   # İletişim + Google Maps
        │   ├── products/page.tsx  # Ürün kataloğu
        │   ├── portal/
        │   │   ├── login/page.tsx # Admin giriş ekranı
        │   │   └── dashboard/page.tsx # Admin yönetim paneli
        │   └── api/
        │       ├── content/route.ts  # GET/POST içerik API
        │       └── upload/route.ts   # Resim yükleme API
        │
        ├── components/
        │   ├── Navbar.tsx         # Navigasyon çubuğu
        │   └── Footer.tsx         # Dinamik alt bilgi
        │
        └── data/
            └── site-content.json  # Tüm site içeriği (CMS veritabanı)
```

---

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js 18+
- pnpm

### Adımlar

```bash
# 1. Repoyu klonla
git clone git@github.com:gturhan71/Dipol.git

# 2. Bağımlılıkları yükle
cd Dipol/code
pnpm install

# 3. Geliştirme sunucusunu başlat
pnpm dev --port 3005
```

Tarayıcıda **http://localhost:3005** adresinden siteye erişebilirsiniz.

---

## 🔐 Admin Portalı

| | |
|---|---|
| **URL** | `/portal/login` |
| **Kullanıcı** | `admin` |
| **Şifre** | `dipol2026` |

### Yönetim Sekmeleri

| Sekme | İşlev |
|---|---|
| **Ana Sayfa** | Hero başlık/açıklama + kategori CRUD |
| **Hakkımızda** | Sayfa başlığı, alt başlık, vizyon, misyon düzenleme |
| **Yorumlar** | Müşteri yorumlarını görüntüleme ve silme (moderasyon) |
| **İletişim** | Adres, telefon, e-posta, Google Maps konumu |
| **Markalar** | Tedarikçi marka listesi ekleme/çıkarma |
| **İstatistikler** | Site genelindeki sayısal verileri güncelleme |

---

## 📡 API Endpoints

| Method | Endpoint | Açıklama |
|---|---|---|
| `GET` | `/api/content` | Tüm site içeriğini döndürür |
| `POST` | `/api/content` | Site içeriğini günceller (JSON body) |
| `POST` | `/api/upload` | Resim dosyası yükler (FormData) |

---

## 🎨 Tasarım Özellikleri

- **Glassmorphism** efektli modern UI
- **Framer Motion** ile sayfa geçiş animasyonları
- **Responsive** — mobil, tablet ve masaüstü uyumlu
- **Dark/Light** tema desteği hazır altyapı
- **SWR Polling** ile admin panelinden yapılan değişiklikler 1 saniye içinde canlı siteye yansır

---

## 📌 Yol Haritası

- [ ] Supabase/PostgreSQL veritabanı entegrasyonu
- [ ] NextAuth ile gerçek kullanıcı yönetimi
- [ ] Resim optimizasyonu (`next/image` sizes prop)
- [ ] Google Maps API key ile gelişmiş harita
- [ ] E-posta bildirim sistemi (iletişim formu)
- [ ] Vercel/Cloudflare deploy

---

## 📄 Lisans

Bu proje **Dipol Ltd. Şti.** için özel olarak geliştirilmiştir. Tüm hakları saklıdır.

---

<p align="center">
  <b>Dipol Ltd. Şti.</b> — Bilimin Geleceğini Birlikte Şekillendiriyoruz 🔬
</p>
