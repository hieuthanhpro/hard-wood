import type { Metadata } from "next";
import {
  Antic,
  Arapey,
  Be_Vietnam_Pro,
  DM_Sans,
  Geist_Mono,
  Inter,
  League_Spartan,
} from "next/font/google";

import { getDefaultSettingsMap } from "@/lib/site-content";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-figma-be-vietnam",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const heroScript = Arapey({
  variable: "--font-hero-script",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-figma-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const leagueSpartan = League_Spartan({
  variable: "--font-figma-league-spartan",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-figma-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const antic = Antic({
  variable: "--font-figma-antic",
  subsets: ["latin"],
  weight: ["400"],
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
        className={`${beVietnam.variable} ${geistMono.variable} ${heroScript.variable} ${inter.variable} ${leagueSpartan.variable} ${dmSans.variable} ${antic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
