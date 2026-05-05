import type { HomeBlockContent } from "@/lib/home-blocks-types";
import { splitParagraphs, toObjectPosition } from "@/lib/home-blocks-utils";

function CheckIcon({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-full w-full"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="1.2" />
        <path d="M8 12.5L11 15L16 9" strokeWidth="2" />
      </svg>
    </div>
  );
}

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
        "We run a “by appointment” boutique, serving one client at the time. This means you are receiving our undivided attention. Always - as you should.",
        "Our knowledge comes from hands-on experience, working our craft for the past 20 years.",
        "Commercially, we supply, install and service any floors from carpet tiles to acrylic infused engineered and SPC oversized luxury vinyl planks or glue down engineered flooring.",
        "By offering a boutique service, we remain competitive, providing some of the best pricing on the market.",
        "For the past 20 years, we have served many home owners, designers, builders, contractors and other trades, with a successful track record.",
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
    <section className="w-full bg-[#fdfaf5] py-16 md:py-24" aria-labelledby="why-hardwoodliving-heading">
      <div className="mx-auto flex w-full max-w-[1502px] flex-col gap-16 px-4 sm:px-9 lg:px-15">
        <article className="relative overflow-hidden rounded-[20px]">
          <img
            src={sectionBg}
            alt="Wood background"
            className="h-[438px] w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/45" aria-hidden />
          <div className="absolute left-6 top-1/2 -translate-y-1/2 space-y-6 sm:left-10 md:left-16 lg:left-24">
            <h2
              id="why-hardwoodliving-heading"
              className="whitespace-pre-line text-4xl font-bold uppercase leading-[1.05] tracking-[-0.01em] text-white [font-family:var(--font-figma-league-spartan),ui-sans-serif,sans-serif] sm:text-5xl lg:text-6xl"
            >
              {heading}
            </h2>
            <div>
              <button
                type="button"
                className="rounded-md bg-[#FF751F] px-8 py-3 text-[17px] font-semibold leading-[1.45] text-white shadow-md transition hover:brightness-95 [font-family:var(--font-figma-be-vietnam),ui-sans-serif,sans-serif]"
              >
                {topCta}
              </button>
            </div>
          </div>
        </article>

        <article className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="space-y-8">
            <h3 className="text-[42px] font-bold uppercase leading-[1.1] tracking-[-0.01em] text-[#333333] [font-family:var(--font-figma-league-spartan),ui-sans-serif,sans-serif]">
              {detailHeading}
            </h3>
            
            <div className="space-y-6">
              {resolvedParagraphs.map((text, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <CheckIcon className="mt-0.5 size-7 shrink-0 text-[#514E26]" />
                  <p className="text-[17px] leading-relaxed text-[#737373] [font-family:var(--font-figma-be-vietnam),ui-sans-serif,sans-serif]">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="button"
                className="rounded-md bg-[#FF751F] px-8 py-3 text-[16px] font-semibold text-white shadow-sm transition hover:brightness-95 [font-family:var(--font-figma-be-vietnam),ui-sans-serif,sans-serif]"
              >
                {primaryCta}
              </button>
              <button
                type="button"
                className="rounded-md bg-[#514E26] px-8 py-3 text-[16px] font-semibold text-white shadow-sm transition hover:brightness-95 [font-family:var(--font-figma-be-vietnam),ui-sans-serif,sans-serif]"
              >
                {secondaryCta}
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl shadow-lg lg:mt-4">
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

