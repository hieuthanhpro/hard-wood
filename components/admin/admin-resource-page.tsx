"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  type AdminField,
  type AdminResource,
  type ResourceKey,
  ADMIN_RESOURCES,
} from "@/lib/admin/resources";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

type ItemRecord = Record<string, unknown> & { id: string };
type HierarchyItem = { item: ItemRecord; depth: number };

const PROTECTED_PAGES = new Set(["store"]);

function readValue(
  item: ItemRecord,
  field: AdminField,
  relations: Record<string, Array<{ value: string; label: string }>>,
) {
  const value = item[field.key];
  if (field.type === "boolean") {
    return value ? (
      <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
        Visible
      </span>
    ) : (
      <span className="inline-flex rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700">
        Hidden
      </span>
    );
  }
  if (field.type === "select") {
    const options = relations[field.key] ?? [];
    const matched = options.find((opt) => opt.value === String(value ?? ""));
    return matched?.label ?? String(value ?? "");
  }
  if (field.type === "date" && value) {
    return new Date(String(value)).toLocaleDateString();
  }
  return String(value ?? "");
}

function defaultForm(fields: AdminField[]) {
  const data: Record<string, string | number | boolean> = {};
  for (const field of fields) {
    if (field.type === "boolean") {
      data[field.key] = true;
    } else if (field.type === "number") {
      data[field.key] = 0;
    } else {
      data[field.key] = "";
    }
  }
  return data;
}

function isImageField(field: AdminField) {
  const key = field.key.toLowerCase();
  const label = field.label.toLowerCase();
  return key.includes("image") || label.includes("image");
}

function buildHierarchy(items: ItemRecord[]): HierarchyItem[] {
  const nodes = new Map<string, { item: ItemRecord; children: string[] }>();
  for (const item of items) {
    nodes.set(item.id, { item, children: [] });
  }
  const roots: string[] = [];
  for (const item of items) {
    const parentId = item.parentId ? String(item.parentId) : "";
    if (parentId && nodes.has(parentId)) {
      nodes.get(parentId)?.children.push(item.id);
    } else {
      roots.push(item.id);
    }
  }

  const sortIds = (ids: string[]) =>
    ids.sort((a, b) => {
      const aItem = nodes.get(a)?.item;
      const bItem = nodes.get(b)?.item;
      const aOrder = Number(aItem?.orderIndex ?? 0);
      const bOrder = Number(bItem?.orderIndex ?? 0);
      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }
      const aTitle = String(aItem?.title ?? "");
      const bTitle = String(bItem?.title ?? "");
      return aTitle.localeCompare(bTitle);
    });

  for (const node of nodes.values()) {
    node.children = sortIds(node.children);
  }
  const sortedRoots = sortIds(roots);

  const flat: HierarchyItem[] = [];
  const visiting = new Set<string>();
  const visited = new Set<string>();

  const walk = (id: string, depth: number) => {
    if (visiting.has(id) || visited.has(id)) {
      return;
    }
    visiting.add(id);
    const node = nodes.get(id);
    if (!node) {
      visiting.delete(id);
      return;
    }
    flat.push({ item: node.item, depth });
    for (const childId of node.children) {
      walk(childId, depth + 1);
    }
    visiting.delete(id);
    visited.add(id);
  };

  for (const rootId of sortedRoots) {
    walk(rootId, 0);
  }

  return flat;
}

export function AdminResourcePage({ resourceKey }: { resourceKey: ResourceKey }) {
  const config: AdminResource = ADMIN_RESOURCES[resourceKey];
  const [items, setItems] = useState<ItemRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string | number | boolean>>(defaultForm(config.fields));
  const [relations, setRelations] = useState<Record<string, Array<{ value: string; label: string }>>>({});
  const editorSectionRef = useRef<HTMLDivElement | null>(null);

  const listFields = useMemo(() => {
    const base = config.fields.filter((field: AdminField) => field.list);
    if (resourceKey === "pages-structure") {
      return base
        .filter((field) => field.key !== "parentId" && field.key !== "orderIndex" && field.key !== "visible")
        .slice(0, 6);
    }
    return base.slice(0, 6);
  }, [config.fields, resourceKey]);

  const visibleField = useMemo(
    () => config.fields.find((field) => field.key === "visible" && field.type === "boolean"),
    [config.fields],
  );

  const displayItems = useMemo(() => {
    if (resourceKey !== "pages-structure") {
      return items.map((item) => ({ item, depth: 0 }));
    }
    return buildHierarchy(items);
  }, [items, resourceKey]);

  async function load() {
    const res = await fetch(`/api/admin/${resourceKey}`);
    const data = await res.json();
    setItems(data.items ?? []);
  }

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const [listRes, optionsRes] = await Promise.all([
        fetch(`/api/admin/${resourceKey}`),
        fetch(`/api/admin/${resourceKey}/options`),
      ]);
      if (cancelled) {
        return;
      }
      const listData = await listRes.json();
      const optionsData = await optionsRes.json();
      if (cancelled) {
        return;
      }
      setItems(listData.items ?? []);
      setRelations(optionsData.options ?? {});
      setLoading(false);
    }

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [resourceKey]);

  useEffect(() => {
    if (!open) {
      return;
    }
    editorSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [open]);

  function onCreate() {
    setCurrentId(null);
    setForm(defaultForm(config.fields));
    setOpen(true);
  }

  function onEdit(item: ItemRecord) {
    const next = defaultForm(config.fields);
    for (const field of config.fields) {
      if (field.type === "password") {
        next[field.key] = "";
        continue;
      }
      next[field.key] = (item[field.key] as string | number | boolean) ?? next[field.key];
    }
    setCurrentId(item.id);
    setForm(next);
    setOpen(true);
  }

  async function onDelete(id: string) {
    if (resourceKey === "pages-structure") {
      const item = items.find((entry) => entry.id === id);
      const slug = String(item?.slug ?? "").replace(/^\//, "");
      if (PROTECTED_PAGES.has(slug)) {
        window.alert("This page is protected and cannot be deleted.");
        return;
      }
    }
    if (!window.confirm("Delete this item?")) {
      return;
    }
    await fetch(`/api/admin/${resourceKey}/${id}`, { method: "DELETE" });
    setLoading(true);
    await load();
    setLoading(false);
  }

  async function uploadImage(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      window.alert(data.error ?? "Upload failed");
      return null;
    }
    const data = (await res.json()) as { url?: string };
    return data.url ?? null;
  }

  async function onSubmit() {
    const url = currentId ? `/api/admin/${resourceKey}/${currentId}` : `/api/admin/${resourceKey}`;
    const method = currentId ? "PATCH" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setOpen(false);
    setLoading(true);
    await load();
    setLoading(false);
  }

  async function onQuickToggle(item: ItemRecord, field: AdminField) {
    const current = Boolean(item[field.key]);
    const res = await fetch(`/api/admin/${resourceKey}/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field.key]: !current }),
    });
    if (!res.ok) {
      return;
    }
    await load();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{config.title}</h1>
          <p className="mt-1 text-sm text-slate-500">{config.subtitle}</p>
        </div>
        <button
          className="inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          onClick={onCreate}
          type="button"
        >
          Add New
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
          Records
        </div>

        {loading ? (
          <div className="p-6 text-sm text-slate-500">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  {listFields.map((field) => (
                    <th key={field.key} className="px-4 py-3">
                      {field.label}
                    </th>
                  ))}
                  {resourceKey === "pages-structure" && visibleField ? (
                    <th className="px-4 py-3">Visible</th>
                  ) : null}
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayItems.map(({ item, depth }) => {
                  const prefix =
                    resourceKey === "pages-structure" && depth > 0
                      ? `${"|  ".repeat(Math.max(0, depth - 1))}+- `
                      : "";
                  return (
                  <tr key={item.id} className="border-t">
                    {listFields.map((field) => (
                      <td key={field.key} className="px-4 py-3 text-slate-700">
                        {field.type === "boolean" ? (
                          <button
                            type="button"
                            onClick={() => onQuickToggle(item, field)}
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium transition ${
                              item[field.key]
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                            }`}
                          >
                            {item[field.key] ? "Visible" : "Hidden"}
                          </button>
                        ) : field.key === "title" && resourceKey === "pages-structure" ? (
                          <div className="flex items-center">
                            <span className="inline-flex items-center font-medium text-slate-800">
                              {prefix ? (
                                <span className="mr-2 font-mono text-xs text-slate-400">{prefix}</span>
                              ) : null}
                              <span style={{ paddingLeft: depth * 18 }}>{readValue(item, field, relations)}</span>
                            </span>
                          </div>
                        ) : (
                          readValue(item, field, relations)
                        )}
                      </td>
                    ))}
                    {resourceKey === "pages-structure" && visibleField ? (
                      <td className="px-4 py-3 text-slate-700">
                        <button
                          type="button"
                          onClick={() => onQuickToggle(item, visibleField)}
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium transition ${
                            item[visibleField.key]
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          }`}
                        >
                          {item[visibleField.key] ? "Visible" : "Hidden"}
                        </button>
                      </td>
                    ) : null}
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          className="inline-flex rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                          onClick={() => onEdit(item)}
                          type="button"
                        >
                          Edit
                        </button>
                      {resourceKey === "pages-structure" &&
                      PROTECTED_PAGES.has(String(item.slug ?? "").replace(/^\//, "")) ? null : (
                        <button
                          className="inline-flex rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                          onClick={() => onDelete(item.id)}
                          type="button"
                        >
                          Delete
                        </button>
                      )}
                      </div>
                    </td>
                  </tr>
                );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {open ? (
        <section ref={editorSectionRef} className="rounded-xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold">{currentId ? "Edit Item" : "Create Item"}</h2>
              <p className="text-sm text-slate-500">Update fields and save changes.</p>
            </div>
            <button
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
              onClick={() => setOpen(false)}
              type="button"
            >
              Close
            </button>
          </div>
          <div className="space-y-5 p-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {config.fields.map((field) => {
                const value = form[field.key];
                const fieldColSpan = field.type === "textarea" ? "md:col-span-2 xl:col-span-3" : "";
                return (
                  <div key={field.key} className={`space-y-1.5 ${fieldColSpan}`}>
                    <label htmlFor={field.key} className="text-sm font-medium text-slate-700">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <RichTextEditor
                        id={field.key}
                        value={String(value ?? "")}
                        onImageUpload={uploadImage}
                        onChange={(nextValue) =>
                          setForm((prev) => ({
                            ...prev,
                            [field.key]: nextValue,
                          }))
                        }
                      />
                    ) : field.type === "boolean" ? (
                      <select
                        id={field.key}
                        className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none ring-slate-300 focus:ring"
                        value={value ? "true" : "false"}
                        onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value === "true" }))}
                      >
                        <option value="true">Visible</option>
                        <option value="false">Hidden</option>
                      </select>
                    ) : field.type === "select" ? (
                      <select
                        id={field.key}
                        className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none ring-slate-300 focus:ring"
                        value={String(value ?? "")}
                        onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      >
                        <option value="">- Top Level -</option>
                        {(relations[field.key] ?? []).map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "text" && isImageField(field) ? (
                      <div className="space-y-2">
                        <input
                          id={field.key}
                          className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none ring-slate-300 focus:ring"
                          type="text"
                          value={String(value ?? "")}
                          placeholder="/uploads/example.jpg or https://..."
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              [field.key]: e.target.value,
                            }))
                          }
                        />
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor={`${field.key}-upload`}
                            className="inline-flex h-9 cursor-pointer items-center rounded-md border border-slate-300 px-3 text-xs font-medium text-slate-700 hover:bg-slate-100"
                          >
                            Upload image
                          </label>
                          <input
                            id={`${field.key}-upload`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (!file) {
                                return;
                              }
                              void uploadImage(file).then((url) => {
                                if (!url) {
                                  return;
                                }
                                setForm((prev) => ({
                                  ...prev,
                                  [field.key]: url,
                                }));
                              });
                              event.currentTarget.value = "";
                            }}
                          />
                          {value ? (
                            <a
                              href={String(value)}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-slate-500 underline"
                            >
                              Preview
                            </a>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <input
                        id={field.key}
                        className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none ring-slate-300 focus:ring"
                        type={
                          field.type === "number"
                            ? "number"
                            : field.type === "date"
                              ? "date"
                              : field.type === "email"
                                ? "email"
                                : field.type === "password"
                                  ? "password"
                                  : "text"
                        }
                        value={String(value ?? "")}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            [field.key]: field.type === "number" ? Number(e.target.value || 0) : e.target.value,
                          }))
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t pt-4">
              <button
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                onClick={onSubmit}
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
