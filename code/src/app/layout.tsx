import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteConfig = {
  name: "DIPOL LTD. ŞTİ.",
  url: "https://www.dipolltd.com",
  ogImage: "/hero-lab.png",
  description: {
    tr: "Laboratuvar cihazları, sarf malzemeleri ve yedek parçalarında dünyanın önde gelen markalarının Türkiye distribütörü ve çözüm ortağı.",
    en: "Turkey's leading distributor and solution partner for world-renowned laboratory equipment, consumables, and spare parts."
  },
  keywords: [
    "laboratuvar cihazları", "laboratory equipment", "sarf malzemeleri", "consumables", 
    "dipol ltd", "ankara laboratuvar", "scientific equipment", "bilimsel ekipman",
    "analitik cihazlar", "analytical instruments", "distribütör", "distributor"
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Laboratuvar Çözümleri`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description.tr,
  keywords: siteConfig.keywords,
  authors: [{ name: "DIPOL LTD" }],
  creator: "DIPOL LTD",
  publisher: "DIPOL LTD",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/tr",
      "en-US": "/en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description.tr,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description.tr,
    images: [siteConfig.ogImage],
    creator: "@dipolltd",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
