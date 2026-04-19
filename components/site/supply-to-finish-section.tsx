import { Check } from "lucide-react";
import type { HomeBlockContent } from "@/lib/home-blocks-types";
import { splitLines, toObjectPosition } from "@/lib/home-blocks-utils";

const AUDIENCE = [
  "Restoration",
  "Renovators",
  "Developers",
  "Builders",
  "Designers",
  "Property Managers",
  "Home Owners",
  "Contractors",
] as const;

export function SupplyToFinishSection({
  centerBlock,
  leftTopBlock,
  leftBottomBlock,
  rightTopBlock,
  rightBottomBlock,
}: {
  centerBlock?: HomeBlockContent;
  leftTopBlock?: HomeBlockContent;
  leftBottomBlock?: HomeBlockContent;
  rightTopBlock?: HomeBlockContent;
  rightBottomBlock?: HomeBlockContent;
}) {
  const audience = splitLines(centerBlock?.content);
  const resolvedAudience = audience.length ? audience : [...AUDIENCE];

  const leftTop = {
    title: leftTopBlock?.header ?? "Residential",
    image: leftTopBlock?.imageUrl ?? "/figma/supply-residential.png",
    alt: leftTopBlock?.subheader ?? "Suburban home with lawn",
    objectPosition: toObjectPosition(leftTopBlock?.imageObjectPosition),
  };
  const leftBottom = {
    title: leftBottomBlock?.header ?? "Strata Buildings",
    image: leftBottomBlock?.imageUrl ?? "/figma/supply-strata.png",
    alt: leftBottomBlock?.subheader ?? "Modern strata apartment building",
    objectPosition: toObjectPosition(leftBottomBlock?.imageObjectPosition),
  };
  const rightTop = {
    title: rightTopBlock?.header ?? "Commercial",
    image: rightTopBlock?.imageUrl ?? "/figma/supply-commercial.png",
    alt: rightTopBlock?.subheader ?? "Modern office interior",
    objectPosition: toObjectPosition(rightTopBlock?.imageObjectPosition),
  };
  const rightBottom = {
    title: rightBottomBlock?.header ?? "New Construction",
    image: rightBottomBlock?.imageUrl ?? "/figma/supply-construction.png",
    alt: rightBottomBlock?.subheader ?? "Blueprints and planning for new construction",
    objectPosition: toObjectPosition(rightBottomBlock?.imageObjectPosition),
  };

  const heading = centerBlock?.header ?? "Crafted for Every Sector";

  return (
    <section className="w-full min-w-0 bg-white py-14 lg:py-20">
      <div className="mx-auto w-full min-w-0 max-w-[1402px] px-4 sm:px-9 lg:px-15">
        {/* Heading */}
        <h2 className="text-center text-[28px] font-bold uppercase leading-[1.1] tracking-[-0.01em] text-[#333] sm:text-[36px] lg:text-[42px] [font-family:var(--font-figma-league-spartan),ui-sans-serif,sans-serif]">
          {heading}
        </h2>

        {/* Audience tags row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-7">
          {resolvedAudience.map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#3d3420] sm:text-xs"
            >
              <Check className="h-3.5 w-3.5 text-[#3d3420]" strokeWidth={2.5} aria-hidden />
              {label}
            </span>
          ))}
        </div>

        {/* 4-column grid: alternating label-cells and image-cells */}
        <div className="mt-10 grid grid-cols-2 gap-0 lg:grid-cols-4">
          {/* Row 1 */}
          {/* Cell: RESIDENTIAL label */}
          <div className="flex items-end bg-[#fdf9ee] p-5 sm:p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#3d3420] sm:text-base [font-family:var(--font-figma-league-spartan),ui-sans-serif,sans-serif]">
              {leftTop.title}
            </h3>
          </div>
          {/* Cell: Office image */}
          <div className="overflow-hidden bg-neutral-200">
            <img
              src={rightTop.image}
              alt={rightTop.alt}
              className="aspect-[4/3] h-full w-full object-cover"
              style={{ objectPosition: rightTop.objectPosition }}
              loading="lazy"
            />
          </div>
          {/* Cell: COMMERCIAL label */}
          <div className="flex items-end bg-[#fdf9ee] p-5 sm:p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#3d3420] sm:text-base [font-family:var(--font-figma-league-spartan),ui-sans-serif,sans-serif]">
              {rightTop.title}
            </h3>
          </div>
          {/* Cell: Blueprints image */}
          <div className="overflow-hidden bg-neutral-200">
            <img
              src={rightBottom.image}
              alt={rightBottom.alt}
              className="aspect-[4/3] h-full w-full object-cover"
              style={{ objectPosition: rightBottom.objectPosition }}
              loading="lazy"
            />
          </div>

          {/* Row 2 */}
          {/* Cell: House image */}
          <div className="overflow-hidden bg-neutral-200">
            <img
              src={leftTop.image}
              alt={leftTop.alt}
              className="aspect-[4/3] h-full w-full object-cover"
              style={{ objectPosition: leftTop.objectPosition }}
              loading="lazy"
            />
          </div>
          {/* Cell: STRATA BUILDINGS label */}
          <div className="flex items-start bg-[#efefef] p-5 pt-auto sm:p-6">
            <h3 className="mt-auto text-sm font-bold uppercase tracking-wide text-[#3d3420] sm:text-base [font-family:var(--font-figma-league-spartan),ui-sans-serif,sans-serif]">
              {leftBottom.title}
            </h3>
          </div>
          {/* Cell: Modern building image */}
          <div className="overflow-hidden bg-neutral-200">
            <img
              src={leftBottom.image}
              alt={leftBottom.alt}
              className="aspect-[4/3] h-full w-full object-cover"
              style={{ objectPosition: leftBottom.objectPosition }}
              loading="lazy"
            />
          </div>
          {/* Cell: NEW CONSTRUCTION label */}
          <div className="flex items-start bg-[#efefef] p-5 sm:p-6">
            <h3 className="mt-auto text-sm font-bold uppercase tracking-wide text-[#3d3420] sm:text-base [font-family:var(--font-figma-league-spartan),ui-sans-serif,sans-serif]">
              {rightBottom.title}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
