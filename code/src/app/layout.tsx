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




import Script from "next/script";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getSiteData();
  const analytics = data?.seo?.analytics || { gtmId: "", gaId: "" };

  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        {/* Google Tag Manager */}
        {analytics.gtmId && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${analytics.gtmId}');
              `,
            }}
          />
        )}
        {/* GA4 */}
        {analytics.gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${analytics.gaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${analytics.gaId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* GTM Noscript */}
        {analytics.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${analytics.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}

