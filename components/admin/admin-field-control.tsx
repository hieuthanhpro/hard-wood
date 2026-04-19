"use client";

import { type Dispatch, type SetStateAction } from "react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { type AdminField } from "@/lib/admin/resources";

function isImageField(field: AdminField) {
  const key = field.key.toLowerCase();
  const label = field.label.toLowerCase();
  return key.includes("image") || label.includes("image");
}

type AdminFieldControlProps = {
  field: AdminField;
  value: string | number | boolean | string[];
  selectOptions: Array<{ value: string; label: string }>;
  setForm: Dispatch<SetStateAction<Record<string, string | number | boolean | string[]>>>;
  uploadImage: (file: File) => Promise<string | null>;
  selectPlaceholder?: string;
  imagePreviewFrameClassName?: string;
  imagePreviewHint?: string;
  imageObjectPosition?: string;
  onImageObjectPositionChange?: (nextValue: string) => void;
};

export function AdminFieldControl({
  field,
  value,
  selectOptions,
  setForm,
  uploadImage,
  selectPlaceholder,
  imagePreviewFrameClassName,
  imagePreviewHint,
  imageObjectPosition,
  onImageObjectPositionChange,
}: AdminFieldControlProps) {
  if (field.type === "textarea") {
    return (
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
    );
  }

  if (field.type === "boolean") {
    return (
      <select
        id={field.key}
        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none ring-slate-300 focus:ring"
        value={value ? "true" : "false"}
        onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value === "true" }))}
      >
        <option value="true">Visible</option>
        <option value="false">Hidden</option>
      </select>
    );
  }

  if (field.type === "select") {
    return (
      <select
        id={field.key}
        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none ring-slate-300 focus:ring"
        value={String(value ?? "")}
        onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
      >
        <option value="">{selectPlaceholder ?? "- Top Level -"}</option>
        {selectOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "text" && isImageField(field)) {
    const previewSrc = String(value ?? "").trim();
    const showPreview = previewSrc.length > 0;
    const [rawX = "50", rawY = "50"] = String(imageObjectPosition ?? "50% 50%")
      .replaceAll("%", "")
      .split(/\s+/);
    const posX = Number.isFinite(Number(rawX)) ? Math.min(100, Math.max(0, Number(rawX))) : 50;
    const posY = Number.isFinite(Number(rawY)) ? Math.min(100, Math.max(0, Number(rawY))) : 50;
    const objectPosition = `${posX}% ${posY}%`;

    return (
      <div className="space-y-2">
        <input
          id={field.key}
          className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none ring-slate-300 focus:ring"
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
        <div className="flex flex-wrap items-center gap-2">
          <label
            htmlFor={`${field.key}-upload`}
            className="inline-flex h-9 cursor-pointer items-center rounded-md border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-100"
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
            <a href={String(value)} target="_blank" rel="noreferrer" className="text-xs text-slate-500 underline">
              Preview
            </a>
          ) : null}
        </div>
        {showPreview ? (
          <div className="space-y-2">
            <div
              className={`w-full max-w-sm overflow-hidden rounded-md border border-slate-200 bg-slate-50 ${imagePreviewFrameClassName ?? "h-16 w-16"}`}
            >
              <img src={previewSrc} alt="" className="h-full w-full object-cover" style={{ objectPosition }} />
            </div>
            <span className="text-xs text-slate-500">{imagePreviewHint ?? "Image preview"}</span>
            {onImageObjectPositionChange ? (
              <div className="max-w-sm space-y-2 rounded-md border border-slate-200 bg-white p-3">
                <div className="text-xs font-medium text-slate-700">Image alignment</div>
                <label className="block text-xs text-slate-600">
                  Horizontal ({Math.round(posX)}%)
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={posX}
                    onChange={(event) =>
                      onImageObjectPositionChange(`${event.currentTarget.value}% ${Math.round(posY)}%`)
                    }
                    className="mt-1 w-full"
                  />
                </label>
                <label className="block text-xs text-slate-600">
                  Vertical ({Math.round(posY)}%)
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={posY}
                    onChange={(event) =>
                      onImageObjectPositionChange(`${Math.round(posX)}% ${event.currentTarget.value}%`)
                    }
                    className="mt-1 w-full"
                  />
                </label>
                <div className="text-[11px] text-slate-500">Saved as: {objectPosition}</div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <input
      id={field.key}
      className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none ring-slate-300 focus:ring"
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
  );
}
