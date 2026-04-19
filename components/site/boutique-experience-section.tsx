import type { HomeBlockContent } from "@/lib/home-blocks-types";
import { toPlainText } from "@/lib/home-blocks-utils";

export function BoutiqueExperienceSection({ block }: { block?: HomeBlockContent }) {
  const content =
    toPlainText(block?.content) ||
    "Experience Hardwoodliving Boutique's hospitality and guiding knowledge to find the right product for your project.";
  const ctaLabel = block?.ctaLabel ?? "Inquire here";
  const ctaHref = block?.ctaHref ?? "#";

  return (
    <section className="w-full bg-white py-14 lg:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <p className="text-base leading-relaxed text-[#3d3420] sm:text-lg lg:text-xl">
          {content}
        </p>
        <a
          href={ctaHref}
          className="mt-8 inline-flex rounded-md bg-[#ff7828] px-10 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 sm:px-12 sm:text-base"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
