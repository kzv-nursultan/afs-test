import type { ISODateTimeString } from "../../types/shared";

export function formatIsoToDMY(iso: ISODateTimeString): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (m) return `${m[3]}.${m[2]}.${m[1]}`;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = d.getUTCFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

export type YMDString = `${number}-${number}-${number}`; // "YYYY-MM-DD"

export function isoToYMD(iso: ISODateTimeString): YMDString | undefined {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? (`${m[1]}-${m[2]}-${m[3]}` as YMDString) : undefined;
}
export function ymdToISO(ymd: YMDString | string): ISODateTimeString | undefined {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  if (!m) return undefined;

  const y = Number(m[1]),
    mo = Number(m[2]),
    d = Number(m[3]);
  const dt = new Date(Date.UTC(y, mo - 1, d));

  const ok =
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === mo - 1 &&
    dt.getUTCDate() === d;

  return ok ? dt.toISOString().slice(0, 19) + "Z" : undefined;
}
