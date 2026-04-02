import type { Metadata } from "next";
import { Dancing_Script, Geist, Geist_Mono } from "next/font/google";

import { getDefaultSettingsMap } from "@/lib/site-content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const heroScript = Dancing_Script({
  variable: "--font-hero-script",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getDefaultSettingsMap();
  return {
    title: settings["site-title"] || "Hardwood Living",
    description: settings["site-description"] || "Hardwood Living public site and custom CMS",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${heroScript.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
