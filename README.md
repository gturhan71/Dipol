# 🧪 Dipol Ltd. — Modern Laboratuvar Çözümleri Portalı

> **Next.js 16** üzerine inşa edilmiş, tam yönetilebilir kurumsal web sitesi ve CMS platformu.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-Private-red)]()

---

## 📋 Proje Hakkında

**Dipol Ltd. Şti.**, Ankara merkezli laboratuvar cihazları ve sarf malzemeleri tedarikçisidir. Bu proje, şirketin mevcut web sitesini (`www.dipolltd.com`) modern teknolojilerle yeniden inşa eder ve teknik bilgi gerektirmeden tüm site içeriğini yönetebilmeyi sağlayan bir **Admin Portal** sunar.

### Temel Özellikler

| Özellik | Açıklama |
|---|---|
| 🌍 **Çoklu Dil (i18n)** | Türkçe ve İngilizce tam dil desteği (SEO uyumlu URL'ler ve metadata) |
| 🔒 **Güvenli Kimlik Doğrulama** | Firebase Auth ve HttpOnly Session Cookieleri üzerinden güvenli giriş |
| 🛡️ **Güvenlik Başlıkları** | CSP, X-Frame-Options ve Rate Limiting ile API koruması |
| 🏠 **Dinamik Ana Sayfa** | Hero, kategoriler, istatistikler ve marka listesi — tümü CMS'den yönetilir |
| 📝 **Hakkımızda Sayfası** | Vizyon, misyon, açıklama metinleri + müşteri yorumları sistemi |
| 📞 **İletişim Sayfası** | Dinamik adres/telefon/e-posta + Google Maps entegrasyonu |
| 🔐 **Admin Portalı** | Middleware ile korunan, 7 sekmeli (SEO, İçerik, Ayarlar vb.) yönetim paneli |
| ⚡ **Performans Odaklı** | SWR Caching, LazyMotion ve `@next/third-parties` ile optimize edilmiş (Lighthouse 90+ hedefi) |
| 📊 **SEO & Analytics** | Dinamik robots.txt, sitemap.xml, Google Tag Manager ve GA4 entegrasyonu |

---

## 🛠️ Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Stil** | Tailwind CSS 4 |
| **Animasyon** | Framer Motion (LazyMotion ile optimize) |
| **Kimlik Doğrulama**| Firebase Client & Admin SDK |
| **Veri Çekme** | SWR |
| **Veri Tabanı** | JSON tabanlı dosya sistemi (`site-content.json`) |
| **İkonlar** | Lucide React |

---

## 📁 Proje Yapısı

```
Dipol/
├── README.md
├── memory.md
├── gitrepo.md
│
└── code/                          # Next.js uygulaması
    ├── .env                       # Firebase ve API anahtarları
    ├── public/
    │   ├── uploads/               # Yüklenen görseller
    │   └── ...                    # Statik varlıklar
    │
    └── src/
        ├── app/
        │   ├── page.tsx           # Çok dilli Ana sayfa
        │   ├── layout.tsx         # Root layout (GTM, GA4, Caching)
        │   ├── middleware.ts      # Rota ve API güvenlik koruması
        │   ├── about/, contact/, products/
        │   ├── portal/
        │   │   ├── login/page.tsx # Firebase entegreli giriş ekranı
        │   │   └── dashboard/     # CMS Paneli
        │   └── api/
        │       ├── auth/          # Login, Session ve Logout API'leri
        │       ├── content/       # Rate-Limited İçerik API'si
        │       └── upload/        # Resim yükleme API'si
        │
        ├── components/
        │   ├── Navbar.tsx         # Çok dilli Navigasyon
        │   └── Footer.tsx         # Dinamik alt bilgi
        │
        └── data/
            └── site-content.json  # Tüm site içeriği (tr/en CMS veritabanı)
```

---

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js 18+
- pnpm
- Firebase Projesi (Service Account Key)

### Adımlar

```bash
# 1. Repoyu klonla
git clone git@github.com:gturhan71/Dipol.git

# 2. Bağımlılıkları yükle
cd Dipol/code
pnpm install

# 3. Ortam değişkenlerini yapılandır (.env dosyası oluştur)
cp .env.example .env
# İçerisine Firebase Client ve Admin SDK bilgilerini girin

# 4. Geliştirme sunucusunu başlat
pnpm dev
```

Tarayıcıda **http://localhost:3000** adresinden siteye erişebilirsiniz.

---

## 🔐 Admin Portalı

| | |
|---|---|
| **URL** | `/portal/login` |
| **Kullanıcı Adı** | `admin` |
| **Şifre** | `dipol2026` |

*Not: Sistem Firebase Authentication arka planını kullanmaktadır. `admin` girişi otomatik olarak `admin@dipolltd.com` e-posta adresine eşlenir.*

---

## 📡 API Endpoints

| Method | Endpoint | Güvenlik | Açıklama |
|---|---|---|---|
| `POST` | `/api/auth/session` | Public | Firebase ID Token'ı HttpOnly Cookie'ye çevirir |
| `POST` | `/api/auth/logout` | Public | Oturumu sonlandırıp Cookie'yi siler |
| `GET`  | `/api/content` | Rate Limited | Tüm site içeriğini (CMS) döndürür |
| `POST` | `/api/content` | Session Cookie | Site içeriğini günceller (Sadece Admin) |
| `POST` | `/api/upload` | Session Cookie | Resim yükler (Sadece Admin) |

---

## 🎨 Tasarım Özellikleri

- **Glassmorphism** efektli modern UI
- **LazyMotion** ile optimize edilmiş akıcı sayfa geçişleri
- **Responsive** — mobil, tablet ve masaüstü uyumlu
- **Hızlı Güncelleme** — Admin panelinden yapılan değişiklikler canlı siteye anında yansır

---

## 📌 Son Güncellemeler (v1.1)

- **Çoklu Dil Desteği:** Türkçe ve İngilizce (i18n) içerik mimarisi kuruldu.
- **Güvenlik Çemberi:** Firebase Auth, HttpOnly Cookies, Middleware rota koruması, API Rate Limiting ve Content-Security-Policy (CSP) başlıkları eklendi.
- **Performans:** SWR gereksiz sorguları azaltıldı, statik dosyalar `React.cache()` ile sarmalandı, GTM ve GA4 `@next/third-parties` ile asenkron hale getirildi.

---

## 📄 Lisans

Bu proje **Dipol Ltd. Şti.** için özel olarak geliştirilmiştir. Tüm hakları saklıdır.

---

<p align="center">
  <b>Dipol Ltd. Şti.</b> — Bilimin Geleceğini Birlikte Şekillendiriyoruz 🔬
</p>
