function decodeHtmlEntities(value: string) {
  return value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

export function toPlainText(value?: string | null) {
  if (!value) {
    return "";
  }
  const normalized = value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<p[^>]*>/gi, "")
    .replace(/<[^>]+>/g, "");
  return decodeHtmlEntities(normalized).trim();
}

export function splitLines(value?: string | null) {
  return toPlainText(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function splitParagraphs(value?: string | null) {
  return toPlainText(value)
    .split(/\n{2,}/)
    .map((para) => para.trim())
    .filter(Boolean);
}

export function toObjectPosition(value?: string | null) {
  const normalized = String(value ?? "").trim();
  return normalized.length > 0 ? normalized : "50% 50%";
}
