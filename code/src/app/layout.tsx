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

export const metadata: Metadata = {
  title: "DIPOL LTD. ŞTİ. | Laboratuvar Cihazları ve Çözümleri",
  description: "Laboratuvar cihazları, sarf malzemeleri ve yedek parçalarında dünyanın önde gelen markalarının Türkiye distribütörü ve çözüm ortağı.",
  keywords: ["laboratuvar cihazları", "sarf malzemeleri", "dipol ltd", "ankara laboratuvar", "bilimsel ekipman"],
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
