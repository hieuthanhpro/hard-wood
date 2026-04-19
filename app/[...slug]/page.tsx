import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site/site-shell";
import { prisma, safeDbCall } from "@/lib/db";

export default async function LandingPageBySlug({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugKey = slug.join("/");

  const page = await safeDbCall(null, async () =>
    prisma.pageStructure.findFirst({
      where: {
        OR: [{ slug: slugKey }, { slug: `/${slugKey}` }],
        visible: true,
      },
      select: {
        id: true,
        title: true,
        content: true,
        metaTitle: true,
        metaDescription: true,
      },
    }),
  );

  if (!page) {
    notFound();
  }

  return (
    <SiteShell>
      <section
        className="relative overflow-hidden bg-[#d8c7a8] px-6 py-14"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/figma/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="text-4xl font-semibold uppercase tracking-wide md:text-5xl">
            {page.title}
          </h1>
          {page.metaDescription ? (
            <p className="mt-4 text-sm leading-relaxed text-white/90 md:text-base">
              {page.metaDescription}
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-white px-6 py-10">
        <div className="mx-auto max-w-4xl text-sm text-gray-700">
          {page.content ? (
            <div
              className="space-y-4 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:text-xl [&_h3]:font-semibold [&_p]:leading-7 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-orange-600 [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <div className="rounded border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-gray-500">
              This page has no content yet. Add content in Admin → Pages & Structure.
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
