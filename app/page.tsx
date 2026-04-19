import { Check, Facebook, Instagram, MessageCircle, Send, Twitter } from "lucide-react";

import { BoutiqueExperienceSection } from "@/components/site/boutique-experience-section";
import { BrandCredentialsStrip } from "@/components/site/brand-credentials-strip";
import { FlooringWiseSection } from "@/components/site/flooring-wise-section";
import { FreeConsultationSection } from "@/components/site/free-consultation-section";
import { LookingForFloorSection } from "@/components/site/looking-for-floor-section";
import { ProductsServicesGallerySection } from "@/components/site/products-services-gallery-section";
import { SupplyToFinishSection } from "@/components/site/supply-to-finish-section";
import { ProductsSaleBestValueSection } from "@/components/site/products-sale-best-value-section";
import { WhyHardwoodlivingSection } from "@/components/site/why-hardwoodliving-section";
import { SiteShell } from "@/components/site/site-shell";
import { getHomeBlocks } from "@/lib/home-blocks";
import { splitLines, toObjectPosition, toPlainText } from "@/lib/home-blocks-utils";
import type { HomeBlockContent, HomeBlockMap } from "@/lib/home-blocks-types";

function toHomeBlockMap(blocks: HomeBlockContent[]) {
  return blocks.reduce<HomeBlockMap>((acc, block) => {
    acc[block.callbackKey] = block;
    return acc;
  }, {});
}

export default async function Home() {
  const blocks = await getHomeBlocks();
  const blockMap = toHomeBlockMap(blocks);

  const heroBlock = blockMap["[1. Hero] Main Block"];
  const heroImage = heroBlock?.imageUrl ?? "";
  const heroObjectPosition = toObjectPosition(heroBlock?.imageObjectPosition);
  const heroCtaLabel = heroBlock?.ctaLabel ?? "Inquire here";
  const heroCtaHref = heroBlock?.ctaHref ?? "#";
  const heroFaqBlock = blockMap["hero-faq"];
  const heroSecondaryCtaBlock = blockMap["[1. Hero] Secondary CTA Button"];
  const heroTradesBlock = blockMap["[1. Hero] Trades Sign In Link"];
  const heroCategoriesBlock = blockMap["[1. Hero] Categories List"];
  const heroCategories = splitLines(heroCategoriesBlock?.content).length
    ? splitLines(heroCategoriesBlock?.content)
    : ["Hardwoods", "Engineered", "Laminates", "Vinyl", "Mats"];

  return (
    <SiteShell heroLayout>
      <section className="relative flex min-h-[100svh] w-full flex-col bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})`, backgroundPosition: heroObjectPosition }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/15 to-black/25"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[100svh] flex-1 flex-col px-6 pb-8 pt-32 sm:px-10 sm:pt-36 lg:px-16 lg:pt-40">
            <div className="flex flex-1 items-center justify-start pl-8 md:pl-16 lg:pl-24 pb-24 lg:pb-60">
              <div className="w-full max-w-[802px]">
                <img 
                  src="/figma/text-in-homepage.svg" 
                  alt="Floors"
                  className="w-full h-auto object-contain" 
                />
              </div>
            </div>

          {/* CTA buttons + categories — pinned to bottom */}
          <div className="flex w-full flex-col items-center gap-6 pb-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              <a
                href={heroCtaHref}
                className="min-w-[220px] rounded-md bg-[#ff6b00] px-10 py-3.5 text-center text-[15px] font-semibold text-white shadow-md transition hover:brightness-95"
              >
                {heroCtaLabel}
              </a>
              {heroSecondaryCtaBlock?.ctaHref ? (
                <a
                  href={heroSecondaryCtaBlock.ctaHref}
                  className="min-w-[220px] rounded-md bg-[#585c41] px-10 py-3.5 text-center text-[15px] font-semibold text-white shadow-md transition hover:brightness-95"
                >
                  {heroSecondaryCtaBlock?.ctaLabel ?? "Request more info"}
                </a>
              ) : (
                <button
                  type="button"
                  className="min-w-[220px] rounded-md bg-[#585c41] px-10 py-3.5 text-center text-[15px] font-semibold text-white shadow-md transition hover:brightness-95"
                >
                  {heroSecondaryCtaBlock?.ctaLabel ?? "Request more info"}
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-900 sm:text-[14px]">
              {heroCategories.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <span>{item}</span>
                  <Check className="h-4 w-4 shrink-0 text-gray-900" strokeWidth={2} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BrandCredentialsStrip />

      <LookingForFloorSection block={blockMap["[3. Looking For Floor] Info Section"]} />

      <ProductsServicesGallerySection
        blocks={[
          blockMap["[4. Products/Services/Gallery] Products Block"],
          blockMap["[4. Products/Services/Gallery] Services Block"],
          blockMap["[4. Products/Services/Gallery] Gallery Block"],
        ].filter(Boolean) as HomeBlockContent[]}
      />

      <BoutiqueExperienceSection block={blockMap["[5. Boutique Experience] Split Content"]} />

      <SupplyToFinishSection
        centerBlock={blockMap["[6. Supply To Finish] Center Title & Roles"]}
        leftTopBlock={blockMap["[6. Supply To Finish] Residential Grid Item"]}
        leftBottomBlock={blockMap["[6. Supply To Finish] Strata Grid Item"]}
        rightTopBlock={blockMap["[6. Supply To Finish] Commercial Grid Item"]}
        rightBottomBlock={blockMap["[6. Supply To Finish] Construction Grid Item"]}
      />

      <FreeConsultationSection block={blockMap["[7. Free Consultation] Form Section"]} />

      <FlooringWiseSection
        rowOneBlock={blockMap["[8. Flooring Wise] Top Row Block"]}
        rowTwoBlock={blockMap["[8. Flooring Wise] Bottom Row Block"]}
      />

      <WhyHardwoodlivingSection
        copyBlock={blockMap["[9. Why Hardwoodliving] Left Text Paragraphs"]}
        cardBlock={blockMap["[9. Why Hardwoodliving] Right Image Card"]}
      />

      <ProductsSaleBestValueSection
        leftBlock={blockMap["[10. Best Value] Left Sale Block"]}
        centerBlock={blockMap["[10. Best Value] Mascot Block"]}
        rightBlock={blockMap["[10. Best Value] Right Products Block"]}
      />

    </SiteShell>
  );
}
