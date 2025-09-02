import type { AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";

function hasGet(
  h: unknown
): h is { get: (name: string) => string | string[] | null } {
  return (
    typeof h === "object" &&
    h !== null &&
    "get" in h &&
    typeof (h as { get: unknown }).get === "function"
  );
}

export function readAxiosHeader(
  headers: AxiosResponseHeaders | RawAxiosResponseHeaders | undefined,
  name: string
): string | undefined {
  if (!headers) return undefined;

  if (hasGet(headers)) {
    const v =
      headers.get(name) ??
      headers.get(name.toLowerCase()) ??
      headers.get(name.toUpperCase());
    if (v == null) return undefined;
    return Array.isArray(v) ? String(v[0]) : String(v);
  }

  const raw = headers as RawAxiosResponseHeaders;

  const key = Object.keys(raw).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );
  const v = key ? raw[key] : undefined;
  if (v == null) return undefined;
  return Array.isArray(v) ? String(v[0]) : String(v);
}
