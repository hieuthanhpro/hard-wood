import type { HomeBlockContent } from "@/lib/home-blocks-types";
import { toObjectPosition } from "@/lib/home-blocks-utils";

const COLUMNS = [
  {
    title: "PRODUCTS",
    image: "/figma/home-products.png",
    alt: "Assorted hardwood and laminate flooring planks",
    cta: "Browse our catalogue",
    href: "#",
    objectPosition: "50% 50%",
  },
  {
    title: "SERVICES",
    image: "/figma/icon-services.svg",
    alt: "Professional floor sanding and refinishing",
    cta: "Explore Services",
    href: "#",
    objectPosition: "50% 50%",
  },
  {
    title: "GALLERY",
    image: "/figma/icon-gallery.svg",
    alt: "Light wood flooring with a puppy resting",
    cta: "View our work",
    href: "#",
    objectPosition: "50% 50%",
  },
] as const;

type ColumnBlock = {
  title: string;
  image: string;
  alt: string;
  cta: string;
  href: string;
  objectPosition: string;
};

export function ProductsServicesGallerySection({ blocks }: { blocks?: HomeBlockContent[] }) {
  const fallbackColumns: ColumnBlock[] = COLUMNS.map((item) => ({ ...item }));
  const resolvedColumns =
    blocks && blocks.length === 3
      ? blocks.map((block, index) => ({
          title: block?.header ?? fallbackColumns[index]?.title ?? "",
          image: block?.imageUrl ?? fallbackColumns[index]?.image ?? "",
          alt: block?.subheader ?? fallbackColumns[index]?.alt ?? "",
          cta: block?.ctaLabel ?? fallbackColumns[index]?.cta ?? "",
          href: block?.ctaHref ?? fallbackColumns[index]?.href ?? "#",
          objectPosition: toObjectPosition(block?.imageObjectPosition),
        }))
      : fallbackColumns;

  return (
    <section className="w-full bg-white py-14 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* flex + basis: reliable 3 equal columns from sm; single column on narrow phones */}
        <div className="flex w-full flex-col gap-12 sm:flex-row sm:gap-6 lg:gap-10">
          {resolvedColumns.map(({ title, image, alt, cta, href, objectPosition }) => (
            <div
              key={title}
              className="flex min-w-0 flex-1 flex-col items-center text-center sm:basis-0"
            >
              <h2 className="text-lg font-bold uppercase tracking-[0.12em] text-[#4B411D] sm:text-xl">
                {title}
              </h2>

              <div className="mt-8 w-full max-w-[280px] sm:max-w-[300px]">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-sm bg-neutral-200 shadow-sm ring-1 ring-black/5">
                  <img
                    src={image}
                    alt={alt}
                    className="h-full w-full object-cover"
                    style={{ objectPosition }}
                    loading="lazy"
                  />
                </div>
              </div>

              <a
                href={href}
                className="mt-8 inline-flex min-w-[200px] items-center justify-center rounded-md bg-[#8B7E6C] px-8 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:brightness-95 sm:px-10"
              >
                {cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
