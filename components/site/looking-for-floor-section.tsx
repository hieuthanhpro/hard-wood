import type { HomeBlockContent } from "@/lib/home-blocks-types";
import { toPlainText } from "@/lib/home-blocks-utils";

export function LookingForFloorSection({ block }: { block?: HomeBlockContent }) {
  const header = block?.header ?? "Looking for a new floor?";
  const content =
    toPlainText(block?.content) ||
    "Most flooring items are available within 48 hrs. Custom, or products delivered from outside the province of BC, will take longer. We'll help you plan ahead.";
  const ctaLabel = block?.ctaLabel ?? "Inquire here";
  const ctaHref = block?.ctaHref ?? "#";

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <h2 className="max-w-3xl text-2xl font-bold uppercase leading-tight tracking-wide text-black sm:text-3xl lg:text-[2rem]">
          {header}
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
          {content}
        </p>

        <a
          href={ctaHref}
          className="mt-10 rounded-md bg-[#ff7828] px-10 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 sm:px-12 sm:text-base"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
