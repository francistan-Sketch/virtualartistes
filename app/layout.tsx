import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Virtual Artistes — Born from Imagination",
  description:
    "A new generation of artists. Born from imagination, shaped by story, performing for the world.",
  openGraph: {
    title: "Virtual Artistes",
    description: "Born from Imagination. Here to Stay.",
    url: "https://virtualartistes.ai",
    siteName: "Virtual Artistes",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="bg-black text-white min-h-screen">{children}</body>
    </html>
  );
}
