import { Check, Facebook, Instagram, MessageCircle, Send, Twitter } from "lucide-react";

import { LookingForFloorSection } from "@/components/site/looking-for-floor-section";
import { SiteShell } from "@/components/site/site-shell";

const categories = ["Hardwoods", "Engineered", "Laminates", "Vinyl", "Mats"] as const;

const HERO_BACKGROUND_IMAGE =
  "https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Home() {
  return (
    <SiteShell heroLayout>
      <section className="relative flex min-h-[100svh] w-full flex-col bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BACKGROUND_IMAGE})` }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/15 to-black/25"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[100svh] flex-1 flex-col px-4 pb-6 pt-44 sm:px-6 sm:pt-48 lg:px-10 lg:pt-52">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                <div>
                  <h1 className="text-6xl font-black leading-[0.95] tracking-tight text-black sm:text-7xl lg:text-[5.5rem]">
                    FLOORS
                  </h1>
                  <p className="mt-2 text-xl font-semibold uppercase tracking-[0.12em] text-[var(--brand-warm-brown)] sm:text-2xl">
                    CRAFTED WITH CARE
                  </p>
                  <p
                    className="mt-3 text-2xl text-gray-800 sm:text-3xl"
                    style={{ fontFamily: "var(--font-hero-script), cursive" }}
                  >
                    Complimentary consultation
                  </p>
                </div>
                <a
                  href="#faq"
                  className="mt-4 shrink-0 self-start text-sm font-bold uppercase tracking-wide text-gray-900 underline decoration-gray-900/40 underline-offset-4 transition hover:text-[var(--brand-orange)] sm:mt-16 sm:self-auto"
                >
                  FAQ
                </a>
              </div>
            </div>
            <div className="hidden flex-1 lg:block" aria-hidden />
          </div>

          <div className="mx-auto mt-auto flex w-full max-w-7xl flex-col gap-8 pt-10">
            <div className="flex flex-col items-stretch justify-between gap-6 lg:flex-row lg:items-end">
              <div className="order-2 flex justify-center gap-2 lg:order-1 lg:justify-start">
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Twitter, label: "X" },
                  { Icon: Send, label: "Telegram" },
                  { Icon: MessageCircle, label: "WhatsApp" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-md transition hover:bg-gray-800"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </a>
                ))}
              </div>

              <div className="order-1 flex flex-1 flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:order-2">
                <button
                  type="button"
                  className="w-full min-w-[200px] rounded-xl bg-[var(--brand-orange)] px-8 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-95 sm:w-auto sm:px-10"
                >
                  Book a showroom visit
                </button>
                <button
                  type="button"
                  className="w-full min-w-[200px] rounded-xl bg-gray-700 px-8 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-gray-800 sm:w-auto sm:px-10"
                >
                  Request more info
                </button>
              </div>

              <div className="order-3 flex justify-center lg:justify-end">
                <a
                  href="#"
                  className="rounded-md border border-gray-300 bg-white/90 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900 shadow-sm backdrop-blur-sm transition hover:border-gray-400"
                >
                  Trades Sign In
                </a>
              </div>
            </div>

            <div className="border-t border-gray-900/15 bg-white/90 px-3 py-4 shadow-sm backdrop-blur-md sm:px-6">
              <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-800 sm:gap-x-8 sm:text-xs">
                {categories.map((item, i) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    {i > 0 ? <span className="hidden text-gray-400 sm:inline">|</span> : null}
                    <span>{item}</span>
                    <Check className="h-3.5 w-3.5 shrink-0 text-[var(--brand-orange)] sm:h-4 sm:w-4" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <LookingForFloorSection />

      <section className="w-full bg-gray-100 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-8 lg:col-span-5">
              <div>
                <h3 className="mb-4 text-base font-bold uppercase tracking-wide text-gray-800 sm:text-lg">
                  Residential
                </h3>
                <div className="h-48 overflow-hidden rounded-lg bg-gray-300 sm:h-56">
                  <img
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=400&fit=crop"
                    alt="Residential"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-base font-bold uppercase tracking-wide text-gray-800 sm:text-lg">
                  Strata Buildings
                </h3>
                <div className="h-48 overflow-hidden rounded-lg bg-gray-300 sm:h-56">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop"
                    alt="Strata Buildings"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8 lg:col-span-2">
              <div>
                <h3 className="mb-4 text-base font-bold uppercase tracking-wide text-gray-800 sm:text-lg">
                  Quality It Finish
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    "Home Owners",
                    "Designers",
                    "Builders",
                    "Contractors",
                    "Property Managers",
                    "Developers",
                    "Restoration",
                    "Renovators",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="h-4 w-4 flex-shrink-0 text-orange-500" />
                      <span className="text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8 lg:col-span-5">
              <div>
                <h3 className="mb-4 text-base font-bold uppercase tracking-wide text-gray-800 sm:text-lg">
                  Commercial
                </h3>
                <div className="h-48 overflow-hidden rounded-lg bg-gray-300 sm:h-56">
                  <img
                    src="https://images.unsplash.com/photo-1585355731055-d0b0165eefac?w=500&h=400&fit=crop"
                    alt="Commercial"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-base font-bold uppercase tracking-wide text-gray-800 sm:text-lg">
                  New Construction
                </h3>
                <div className="h-48 overflow-hidden rounded-lg bg-gray-300 sm:h-56">
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=400&fit=crop"
                    alt="New Construction"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
