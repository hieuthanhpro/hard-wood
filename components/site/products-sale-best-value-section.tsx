import type { HomeBlockContent } from "@/lib/home-blocks-types";
import { toObjectPosition, toPlainText } from "@/lib/home-blocks-utils";

const IMG_FOREST =
  "/figma/best-value-left.png";

const IMG_RACCOON =
  "/figma/best-value-right.png";

const IMG_MOUNTAIN =
  "/figma/best-value-center.png";

const ctaBtn =
  "inline-flex w-full items-center justify-center rounded-md bg-[#514E26] px-6 pb-2.5 pt-1.5 text-center text-[17px] font-semibold leading-[1.45] text-white shadow-sm transition hover:brightness-95 [font-family:var(--font-figma-be-vietnam),ui-sans-serif,sans-serif]";

export function ProductsSaleBestValueSection({
  leftBlock,
  centerBlock,
  rightBlock,
}: {
  leftBlock?: HomeBlockContent;
  centerBlock?: HomeBlockContent;
  rightBlock?: HomeBlockContent;
}) {
  const leftImage = leftBlock?.imageUrl ?? IMG_FOREST;
  const leftObjectPosition = toObjectPosition(leftBlock?.imageObjectPosition);
  const leftAlt = leftBlock?.header ?? "Products on sale";
  const leftCta = leftBlock?.ctaLabel ?? "Explore what’s on Sale";
  const leftHref = leftBlock?.ctaHref ?? "/on-sale";

  const rightImage = rightBlock?.imageUrl ?? IMG_RACCOON;
  const rightObjectPosition = toObjectPosition(rightBlock?.imageObjectPosition);
  const rightAlt = rightBlock?.header ?? "best value products";
  const rightCta = rightBlock?.ctaLabel ?? "Explore Best Value";
  const rightHref = rightBlock?.ctaHref ?? "/best-value";

  const centerImage = centerBlock?.imageUrl ?? IMG_MOUNTAIN;
  const centerObjectPosition = toObjectPosition(centerBlock?.imageObjectPosition);
  const centerAlt = centerBlock?.header ?? "Raccoon in forest";
  const centerCopy =
    toPlainText(centerBlock?.content) ||
    "Who would have thought that I will make it on the Hardwoodliving’s website page - “How?” would you ask ... Well, me and my family always hang out in the woods around. We know our woods, just like Hardwoodliving does. More so, I’m always looking for a bargain - who doesn’t like a good bargain? Am I always lucky? No, but I’m sure to keep trying.";
  const centerCta = centerBlock?.ctaLabel ?? "Apply here for a Discount";
  const centerCtaHref = centerBlock?.ctaHref ?? "#";

  return (
    <section className="w-full bg-white py-16" aria-labelledby="products-on-sale-heading">
      <div className="mx-auto flex w-full max-w-[1502px] flex-col gap-[50px] px-4 sm:px-9 lg:px-20">
        <div className="mx-auto flex w-full max-w-[980px] flex-col gap-10 lg:flex-row lg:justify-center lg:gap-[60px]">
          <article className="flex w-full max-w-[460px] flex-col gap-6">
            <h2
              id="products-on-sale-heading"
              className="text-center text-[32px] font-bold uppercase leading-[1.1] tracking-[-0.01em] text-[#333333] [font-family:var(--font-figma-league-spartan),ui-sans-serif,sans-serif]"
            >
              Products on sale
            </h2>
            <img
              src={leftImage}
              alt={leftAlt}
              className="aspect-[460/445] w-full object-cover"
              style={{ objectPosition: leftObjectPosition }}
              loading="lazy"
            />
            <a href={leftHref} className={ctaBtn}>
              {leftCta}
            </a>
          </article>

          <article className="flex w-full max-w-[460px] flex-col gap-6">
            <h2 className="text-center text-[32px] font-bold uppercase leading-[1.1] tracking-[-0.01em] text-[#333333] [font-family:var(--font-figma-league-spartan),ui-sans-serif,sans-serif]">
              best value products
            </h2>
            <img
              src={rightImage}
              alt={rightAlt}
              className="aspect-[460/445] w-full object-cover"
              style={{ objectPosition: rightObjectPosition }}
              loading="lazy"
            />
            <a href={rightHref} className={ctaBtn}>
              {rightCta}
            </a>
          </article>
        </div>

        <article className="relative aspect-[1402/438] w-full overflow-hidden rounded-[20px]">
          <img
            src={centerImage}
            alt={centerAlt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: centerObjectPosition }}
            loading="lazy"
          />
          <div className="absolute left-4 right-4 top-6 rounded-[12px] bg-[#706961]/85 p-6 shadow-[0_12px_28px_rgba(0,0,0,0.35)] sm:left-10 sm:right-10 lg:left-14 lg:right-auto lg:top-[86px] lg:w-[640px] lg:p-6">
            <p className="text-[16px] font-semibold leading-[1.4] text-white [font-family:var(--font-figma-be-vietnam),ui-sans-serif,sans-serif]">
              {centerCopy}
            </p>
            <div className="mt-4 flex">
              <a href={centerCtaHref} className={`${ctaBtn} w-auto px-6`}>
                {centerCta}
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
