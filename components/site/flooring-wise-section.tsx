import type { HomeBlockContent } from "@/lib/home-blocks-types";
import { splitLines, splitParagraphs, toObjectPosition } from "@/lib/home-blocks-utils";

const ROW_IMAGE_1 =
  "/figma/flooring-wise-row1.png";

const ROW_IMAGE_2 =
  "/figma/flooring-wise-row2.png";

/** Dark bronze / olive heading color aligned with site luxury flooring palette */
const HEADING = "text-[#4d4428]";

export function FlooringWiseSection({
  rowOneBlock,
  rowTwoBlock,
}: {
  rowOneBlock?: HomeBlockContent;
  rowTwoBlock?: HomeBlockContent;
}) {
  const rowOneHeading = rowOneBlock?.header ?? "Are you flooring wise?";
  const rowOneParagraphs = splitParagraphs(rowOneBlock?.content);
  const resolvedRowOneParagraphs = rowOneParagraphs.length
    ? rowOneParagraphs
    : [
        "One of the first question asked when purchasing a floor is what will be it's core purpose? Design, upgrade, replacing the old, increasing a home value, it's function, ...?",
        "Whichever the answer, it is a significant investment which should not be treated lightly. Hardwood or engineered, finished or unfinished, species, cuts, grades, dimensions, applications on grade or below, radiant heat, hardness coeficient, humidity, installation techniques, price, color of stain, natural variations - all play a role into the decision. With so many considerations, even for laminates and vinyls it is wise to consult a specialist to ensure your flooring investment holds true for its intent.",
      ];
  const rowOneCtaLabel = rowOneBlock?.ctaLabel ?? "Book a free consultation";
  const rowOneImage = rowOneBlock?.imageUrl ?? ROW_IMAGE_1;
  const rowOneObjectPosition = toObjectPosition(rowOneBlock?.imageObjectPosition);
  const rowOneAlt =
    rowOneBlock?.subheader ??
    "Modern interior with wide-plank wood flooring, glass wall, and staircase";

  const rowTwoImage = rowTwoBlock?.imageUrl ?? ROW_IMAGE_2;
  const rowTwoObjectPosition = toObjectPosition(rowTwoBlock?.imageObjectPosition);
  const rowTwoAlt = rowTwoBlock?.subheader ?? "Decorative wood floor with metallic inlay detail";
  const rowTwoLines = splitLines(rowTwoBlock?.content);
  const resolvedRowTwoLines = rowTwoLines.length
    ? rowTwoLines
    : [
        "White Oak 7 in. custom prefinished long planks with inhouse manufactured column floated stair treads in a North Vancouver home.",
        "Stainless steel veneer Italian Design Walnut tiles installed as an entry feature in a Vancouver West side home.",
      ];

  return (
    <section
      className="w-full min-w-0 bg-white py-14 md:py-20 lg:py-[7rem]"
      aria-labelledby="flooring-wise-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Row 1: text left, image right */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-0 xl:gap-x-16">
          <div className="min-w-0 lg:pr-2">
            <h2
              id="flooring-wise-heading"
              className={`${HEADING} text-[1.65rem] font-bold uppercase leading-[1.15] tracking-[0.06em] sm:text-3xl lg:text-[2.125rem] lg:leading-[1.2] [font-family:var(--font-figma-league-spartan),ui-sans-serif,sans-serif]`}
            >
              {rowOneHeading}
            </h2>

            <div className="mt-7 space-y-5 text-[16px] font-normal leading-[1.4] text-neutral-900 lg:mt-8 [font-family:var(--font-hero-script),Georgia,serif]">
              {resolvedRowOneParagraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>

            <div className="mt-9 lg:mt-10">
              <button
                type="button"
                className="rounded-[3px] bg-[#8B7E6C] px-9 py-3 text-[1.125rem] font-semibold tracking-wide text-white shadow-sm transition hover:brightness-[0.97] sm:px-10 sm:text-sm [font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif]"
              >
                {rowOneCtaLabel}
              </button>
            </div>
          </div>

          <div className="min-w-0 lg:pl-1">
            <div className="overflow-hidden bg-neutral-200 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <img
                src={rowOneImage}
                alt={rowOneAlt}
                className="aspect-[4/3] h-auto w-full object-cover sm:aspect-[5/4] lg:aspect-[11/9] lg:min-h-[min(520px,50vw)]"
                style={{ objectPosition: rowOneObjectPosition }}
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Row 2: image left, text right */}
        <div className="mt-16 grid grid-cols-1 items-center gap-10 md:mt-20 lg:mt-28 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-0 xl:gap-x-16">
          <div className="min-w-0 lg:pr-2">
            <div className="overflow-hidden bg-neutral-200 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <img
                src={rowTwoImage}
                alt={rowTwoAlt}
                className="aspect-[4/3] h-auto w-full object-cover sm:aspect-[5/4] lg:aspect-[11/9] lg:min-h-[min(480px,48vw)]"
                style={{ objectPosition: rowTwoObjectPosition }}
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="lazy"
              />
            </div>
          </div>

          <div className="min-w-0 space-y-8 lg:space-y-10 lg:pl-3">
            {resolvedRowTwoLines.map((text) => (
              <div key={text} className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#4d4428]">
                  <svg className="h-4 w-4 text-[#4d4428]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p
                  className={`${HEADING} text-[1.125rem] leading-[1.45] sm:text-[1.1875rem] lg:text-[1.25rem] lg:leading-[1.5] [font-family:var(--font-hero-script),Georgia,serif]`}
                >
                  {text}
                </p>
              </div>
            ))}
            <div className="pt-2">
              <button
                type="button"
                className="rounded-md bg-[#FF751F] px-10 py-3.5 text-[1.05rem] text-white shadow-sm transition hover:brightness-95 [font-family:var(--font-figma-be-vietnam),ui-sans-serif,sans-serif]"
              >
                {rowOneCtaLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
