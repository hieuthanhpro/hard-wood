import type { HomeBlockContent } from "@/lib/home-blocks-types";
import { splitParagraphs, toObjectPosition } from "@/lib/home-blocks-utils";

/** End-grain / tree rings — warm, readable under overlay */
const SECTION_BG =
  "/figma/why-hardwood-bg.png";

/** Feet / walking on polished hardwood */
const CARD_IMAGE =
  "/figma/why-hardwood-card.png";

export function WhyHardwoodlivingSection({
  copyBlock,
  cardBlock,
}: {
  copyBlock?: HomeBlockContent;
  cardBlock?: HomeBlockContent;
}) {
  const paragraphs = splitParagraphs(copyBlock?.content);
  const resolvedParagraphs = paragraphs.length
    ? paragraphs
    : [
        "Hardwoodliving is a boutique flooring studio built around personal service and straight answers—not high-pressure sales. We take time to understand how you live in your space before we recommend a single plank or profile.",
        "With more than twenty years of experience across residential and commercial work, we supply and install everything from classic Herringbone and rich Walnut hardwoods to high-performance laminates and luxury vinyl when durability and moisture matter most.",
        "From strata refreshes to full commercial schedules, we coordinate product selection, timing, and installation so your floor looks intentional and performs for the long haul.",
      ];
  const primaryCta = copyBlock?.ctaLabel ?? "Apply here for a Discount";
  const secondaryCta = copyBlock?.subheader ?? "Find out what our clients say";

  const heading = cardBlock?.header ?? "Our craft\nbegins HERE";
  const sectionBg = cardBlock?.subheader ?? SECTION_BG;
  const cardImage = cardBlock?.imageUrl ?? CARD_IMAGE;
  const cardObjectPosition = toObjectPosition(cardBlock?.imageObjectPosition);
  const topCta = cardBlock?.ctaLabel ?? "Flooring knowledge corner";
  const detailHeading = copyBlock?.header || "WHY HARDWOODLIVING?";

  return (
    <section className="w-full bg-white py-16 md:py-20" aria-labelledby="why-hardwoodliving-heading">
      <div className="mx-auto flex w-full max-w-[1502px] flex-col gap-10 px-4 sm:px-9 lg:px-15">
        {/* 318:1192 block - must stay above 318:1224 */}
        <article className="relative overflow-hidden rounded-[20px]">
          <img
            src={sectionBg}
            alt="Wood background"
            className="h-[438px] w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/45" aria-hidden />
          <div className="absolute left-6 top-8 rounded-xl bg-black/35 px-6 py-5 text-white shadow-lg backdrop-blur-sm sm:left-10 sm:top-12">
            <h2
              id="why-hardwoodliving-heading"
              className="whitespace-pre-line text-4xl font-bold uppercase leading-[1.05] tracking-[-0.01em] [font-family:var(--font-figma-league-spartan),ui-sans-serif,sans-serif]"
            >
              {heading}
            </h2>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <button
              type="button"
              className="rounded-md bg-[#FF751F] px-6 pb-2.5 pt-1.5 text-[17px] font-semibold leading-[1.45] text-white shadow-sm transition hover:brightness-95 [font-family:var(--font-figma-be-vietnam),ui-sans-serif,sans-serif]"
            >
              {topCta}
            </button>
          </div>
        </article>

        {/* 318:1224 block - sits below 318:1192 */}
        <article className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10">
          <div className="space-y-5">
            <h3 className="text-[36px] font-bold uppercase leading-[1.1] tracking-[-0.01em] text-[#333333] [font-family:var(--font-figma-league-spartan),ui-sans-serif,sans-serif]">
              {detailHeading}
            </h3>
            <div className="space-y-4 text-[16px] leading-[1.45] text-[#737373] [font-family:var(--font-figma-be-vietnam),ui-sans-serif,sans-serif]">
              {resolvedParagraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                className="rounded-md bg-[#FF751F] px-6 pb-2.5 pt-1.5 text-[17px] font-semibold leading-[1.45] text-white shadow-sm transition hover:brightness-95 [font-family:var(--font-figma-be-vietnam),ui-sans-serif,sans-serif]"
              >
                {primaryCta}
              </button>
              <button
                type="button"
                className="rounded-md bg-[#514E26] px-6 pb-2.5 pt-1.5 text-[17px] font-semibold leading-[1.45] text-white shadow-sm transition hover:brightness-95 [font-family:var(--font-figma-be-vietnam),ui-sans-serif,sans-serif]"
              >
                {secondaryCta}
              </button>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl shadow-md">
            <img
              src={cardImage}
              alt="Polished hardwood flooring"
              className="aspect-[4/3] h-auto w-full object-cover"
              style={{ objectPosition: cardObjectPosition }}
              loading="lazy"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
