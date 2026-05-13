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

async function getSiteData() {
  try {
    const filePath = path.join(process.cwd(), "src/data/site-content.json");
    const fileData = await readFile(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData();
  const seo = data?.seo || {
    title: "DIPOL LTD. ŞTİ.",
    description: "Laboratuvar Çözümleri",
    keywords: ""
  };

  const siteUrl = "https://www.dipolltd.com";
  const ogImage = data?.logo || "/hero-lab.png";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.title,
      template: `%s | ${seo.title.split('|')[0].trim()}`
    },
    description: seo.description,
    keywords: seo.keywords.split(',').map((k: string) => k.trim()),
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
      title: seo.title,
      description: seo.description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}



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
