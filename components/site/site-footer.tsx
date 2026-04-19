import Link from "next/link";
import { Facebook, Instagram, Leaf, MessageCircle, Send, Twitter } from "lucide-react";

import { FooterScrollTop } from "@/components/site/footer-scroll-top";
import { toPlainText } from "@/lib/home-blocks-utils";

const social = [
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Twitter, label: "X", href: "#" },
  { Icon: Send, label: "Telegram", href: "#" },
  { Icon: MessageCircle, label: "WhatsApp", href: "#" },
] as const;

type FooterLink = { label: string; href: string };

export function SiteFooter({
  links,
  aboutText,
  copyrightText,
}: {
  links: FooterLink[];
  aboutText?: string | null;
  copyrightText?: string | null;
}) {
  const resolvedAboutText =
    toPlainText(aboutText) ||
    "Hardwoodliving is a family owned and operated business serving the Greater Vancouver area. We believe in value added service and lasting relationships with our clients.";
  const resolvedCopyrightText = toPlainText(copyrightText) || "Copyright © 2026 Hardwoodliving";

  return (
    <footer className="w-full bg-[#514E26] text-white [font-family:var(--font-geist-sans),ui-sans-serif,sans-serif]">
      {/* Logo */}
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pt-16 lg:px-10">
        <div className="flex flex-col items-center">
          <Link href="/" className="group flex flex-col items-center">
            <img 
              src="/figma/logo.svg" 
              alt="Hardwoodliving Logo" 
              className="h-24 w-auto transition hover:opacity-80 brightness-0 invert" 
            />
          </Link>
        </div>

        <div className="mx-auto mt-10 h-px max-w-4xl bg-white/35" aria-hidden />

        {/* About */}
        <p className="mx-auto mt-10 max-w-3xl text-center text-sm italic leading-relaxed text-white/95 sm:text-base [font-family:Georgia,Cambria,ui-serif,serif]">
          {resolvedAboutText}
        </p>

        <div className="mx-auto mt-10 h-px max-w-4xl bg-white/35" aria-hidden />

        {/* Social | Nav | Scroll top */}
        <div className="mx-auto mt-10 flex max-w-7xl flex-col items-stretch gap-8 lg:mt-12 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start lg:min-w-[200px] lg:flex-nowrap">
            {social.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white transition hover:bg-white/15"
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </a>
            ))}
          </div>

          <nav
            className="flex flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white sm:gap-x-5 sm:text-xs"
            aria-label="Footer"
          >
            {links.map((item) =>
              item.href.startsWith("mailto:") ? (
                <a
                  key={item.href + item.label}
                  href={item.href}
                  className="whitespace-nowrap hover:text-white/80"
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.href + item.label} href={item.href} className="whitespace-nowrap hover:text-white/80">
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex justify-center lg:min-w-[40px] lg:justify-end">
            <FooterScrollTop />
          </div>
        </div>

        <p className="mt-12 pb-8 text-center text-xs text-white/75 sm:text-sm">
          {resolvedCopyrightText}
        </p>
      </div>
    </footer>
  );
}
