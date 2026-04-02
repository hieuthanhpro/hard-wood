import { Check, Facebook, Instagram, MessageCircle, Twitter } from "lucide-react";

import { SiteShell } from "@/components/site/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center py-6 lg:py-0">
              <h1 className="text-6xl font-black leading-none text-black sm:text-7xl lg:text-8xl">
                FLOORS
              </h1>
              <p className="mb-1 text-xl font-light italic text-gray-700 sm:text-2xl">
                CRAFTED WITH CARE
              </p>
              <p className="mb-8 text-base font-light italic text-gray-600 sm:text-lg">
                Complimentary consultation
              </p>

              <div className="mb-8 mt-4 flex flex-col gap-3 sm:flex-row">
                <button className="rounded-none bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600 sm:px-8 sm:text-base">
                  Book a showroom visit
                </button>
                <button className="rounded-none bg-gray-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-600 sm:px-8 sm:text-base">
                  Request more info
                </button>
              </div>

              <a href="#faq" className="mb-8 w-fit text-sm font-semibold text-blue-600 underline">
                FAQ
              </a>

              <div className="mt-4 flex gap-4">
                <Facebook className="h-6 w-6 cursor-pointer text-black transition hover:text-orange-500" />
                <Instagram className="h-6 w-6 cursor-pointer text-black transition hover:text-orange-500" />
                <Twitter className="h-6 w-6 cursor-pointer text-black transition hover:text-orange-500" />
                <MessageCircle className="h-6 w-6 cursor-pointer text-black transition hover:text-orange-500" />
              </div>
            </div>

            <div className="min-h-96 h-96 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 lg:h-full">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9eqMeLheqDP8rSJoda625Yivlk7UXZ.png"
                alt="Luxury hardwood living room"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-t border-gray-300 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid grid-cols-2 gap-4 text-center text-xs font-bold uppercase tracking-wide sm:grid-cols-5 sm:gap-6 sm:text-sm">
            {["Hardwoods", "Engineered", "Laminates", "Vinyl", "Mats"].map((item) => (
              <div key={item} className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
                <span>{item}</span>
                <Check className="h-4 w-4 flex-shrink-0 text-orange-500 sm:h-5 sm:w-5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-100 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto mb-12 max-w-2xl text-center text-base leading-relaxed text-gray-700 sm:text-lg">
            Experience Hardwoodliving Boutique&apos;s hospitality and guiding knowledge to find
            the right product for your project.
          </p>

          <div className="mb-16 text-center">
            <button className="rounded-none bg-orange-500 px-8 py-3 text-sm font-bold text-white transition hover:bg-orange-600 sm:text-base">
              Inquire here
            </button>
          </div>

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
