import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site/site-shell";
import { prisma, safeDbCall } from "@/lib/db";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;

  const category = await safeDbCall(null, async () =>
    prisma.category.findFirst({
      where: { slug: categorySlug, visible: true },
      select: {
        id: true,
        name: true,
        description: true,
        content: true,
        metaTitle: true,
        metaDescription: true,
      },
    }),
  );

  if (!category) {
    notFound();
  }

  const products = await safeDbCall([], async () =>
    prisma.product.findMany({
      where: { categoryId: category.id, visible: true },
      orderBy: { orderIndex: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        imageUrl: true,
        announce: true,
      },
      take: 24,
    }),
  );

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-[#d8c7a8] px-6 py-14">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="text-4xl font-semibold uppercase tracking-wide md:text-5xl">
            {category.name}
          </h1>
          {category.metaDescription || category.description ? (
            <p className="mt-4 text-sm leading-relaxed text-white/90 md:text-base">
              {category.metaDescription ?? category.description}
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-white px-6 py-10">
        <div className="mx-auto max-w-4xl text-sm text-gray-700">
          {category.content ? (
            <div
              className="space-y-4 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:text-xl [&_h3]:font-semibold [&_p]:leading-7 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-orange-600 [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: category.content }}
            />
          ) : category.description ? (
            <p className="leading-7">{category.description}</p>
          ) : (
            <div className="rounded border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-gray-500">
              This category has no content yet. Add content in Admin → Product Catalog → Categories.
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-base font-bold uppercase tracking-wide text-gray-800">
            Products
          </h2>
          {products.length === 0 ? (
            <div className="mt-4 rounded border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
              No products found for this category.
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${categorySlug}/${product.slug}`}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:border-orange-200 hover:shadow-md"
                >
                  <div className="h-44 w-full bg-gray-200">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="space-y-2 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {product.announce ?? "Featured"}
                    </p>
                    <h3 className="text-base font-bold text-gray-900">{product.name}</h3>
                    {product.price ? (
                      <p className="text-sm font-semibold text-orange-600">
                        {priceFormatter.format(Number(product.price))}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">Contact for pricing</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
