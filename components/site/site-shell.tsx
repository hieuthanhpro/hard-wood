import type { ReactNode } from "react";
import Link from "next/link";

import { prisma, safeDbCall } from "@/lib/db";

export async function SiteShell({ children }: { children: ReactNode }) {
  const navPages = await safeDbCall([], async () =>
    prisma.pageStructure.findMany({
      where: { visible: true },
      orderBy: { orderIndex: "asc" },
      select: { id: true, title: true, slug: true, parentId: true },
    }),
  );
  const categories = await safeDbCall([], async () =>
    prisma.category.findMany({
      where: { visible: true },
      orderBy: { orderIndex: "asc" },
      select: { id: true, name: true, slug: true },
    }),
  );

  const fallbackNav = [
    { id: "products", label: "Products", href: "/products" },
    { id: "best-value", label: "Best Value", href: "/best-value" },
    { id: "on-sale", label: "On Sale", href: "/on-sale" },
    { id: "service", label: "Service", href: "/service" },
    { id: "reviews", label: "Reviews", href: "/reviews" },
    { id: "us", label: "Us", href: "/us" },
  ];

  const navItems =
    navPages.length > 0
      ? navPages.map((page) => ({
          id: page.id,
          label: page.title,
          href: page.slug.startsWith("/") ? page.slug : `/${page.slug}`,
          parentId: page.parentId,
          slug: page.slug,
        }))
      : fallbackNav.map((item) => ({ ...item, parentId: null as string | null, slug: item.href }));

  const childMap = new Map<string, typeof navItems>();
  for (const item of navItems) {
    if (!item.parentId) {
      continue;
    }
    const list = childMap.get(item.parentId) ?? [];
    list.push(item);
    childMap.set(item.parentId, list);
  }

  const topLevel = navItems.filter((item) => !item.parentId);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-black">
      <header className="w-full border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 py-3 text-xs font-semibold text-gray-600">
            <span>2328</span>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:604.726.5453"
                className="rounded bg-orange-500 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-orange-600"
              >
                604.726.5453
              </a>
              <a
                href="mailto:info@hardwoodliving.com"
                className="rounded bg-gray-500 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-gray-600"
              >
                info@hardwoodliving.com
              </a>
              <Link
                href="/admin"
                className="rounded border border-gray-300 px-3 py-1.5 text-xs font-bold text-gray-700 transition hover:text-orange-500"
              >
                Admin
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 py-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center bg-black text-lg font-bold text-white">
                H
              </div>
              <div className="text-xs font-bold tracking-widest">
                <div className="text-black">HARDWOOD</div>
                <div className="text-orange-500">LIVING</div>
              </div>
            </div>

            <nav className="relative z-20 hidden flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-wide text-gray-800 lg:flex">
              {topLevel.map((item) => {
                const slugKey = String(item.slug ?? "").replace(/^\//, "");
                const isStore = slugKey === "store";
                const storeChildren = categories.map((category) => ({
                  id: category.id,
                  label: category.name,
                  href: `/products/${category.slug}`,
                }));
                const children = isStore ? storeChildren : childMap.get(item.id) ?? [];
                if (children.length === 0) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="transition hover:text-orange-500"
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <div key={item.id} className="relative group">
                    <Link href={item.href} className="transition hover:text-orange-500">
                      {item.label}
                    </Link>
                    <div className="absolute left-0 top-full z-30 hidden min-w-[190px] flex-col gap-1 rounded border border-gray-200 bg-white p-2 text-[11px] font-semibold uppercase text-gray-700 shadow-lg group-hover:flex">
                      {children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          className="rounded px-2 py-1 hover:bg-orange-50 hover:text-orange-600"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </nav>

            <a
              href="#"
              className="hidden text-xs font-bold uppercase text-gray-700 transition hover:text-orange-500 lg:block"
            >
              Trades Sign In
            </a>
          </div>
        </div>
      </header>

      <main className="w-full flex-1">{children}</main>

      <footer className="w-full bg-gray-800 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-400">
            <p>&copy; 2024 Hardwood Living. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
