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

import { readFile } from "fs/promises";
import path from "path";
import { cache } from "react";

const getSiteData = cache(async () => {
  try {
    const filePath = path.join(process.cwd(), "src/data/site-content.json");
    const fileData = await readFile(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    return null;
  }
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData();
  const seo = data?.seo || {
    title: { tr: "DIPOL LTD. ŞTİ.", en: "DIPOL LTD." },
    description: { tr: "Laboratuvar Çözümleri", en: "Laboratory Solutions" },
    keywords: { tr: "", en: "" }
  };

  const siteUrl = "https://www.dipolltd.com";
  const ogImage = data?.logo || "/hero-lab.png";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.title.tr,
      template: `%s | ${seo.title.tr.split('|')[0].trim()}`
    },
    description: seo.description.tr,
    keywords: seo.keywords.tr.split(',').map((k: string) => k.trim()),
    alternates: {
      canonical: "/",
      languages: {
        "tr-TR": "/tr",
        "en-US": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      alternateLocale: ["en_US"],
      url: siteUrl,
      title: seo.title.tr,
      description: seo.description.tr,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title.tr,
      description: seo.description.tr,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}




import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getSiteData();
  const analytics = data?.seo?.analytics || { gtmId: "", gaId: "" };

  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      {analytics.gaId && <GoogleAnalytics gaId={analytics.gaId} />}
      {analytics.gtmId && <GoogleTagManager gtmId={analytics.gtmId} />}
    </html>
  );
}

