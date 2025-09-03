// keep only digits (optionally allow leading 1)
export function normalizeUSDigits(input: string): string {
  const digits = input.replace(/\D/g, "");
  // allow max 11, with optional leading country '1'
  if (digits.startsWith("1")) return digits.slice(0, 11);
  return digits.slice(0, 10);
}

// format for display as the user types/deletes
export function formatUSPhoneIntl(digits: string): string {
  const only = normalizeUSDigits(digits);
  const hasCountry = only.startsWith("1");
  const country = "1";
  const rest = hasCountry ? only.slice(1) : only;

  let out = `+${country}`;
  if (rest.length > 0) out += " " + rest.slice(0, 3);
  if (rest.length > 3) out += " " + rest.slice(3, 6);
  if (rest.length > 6) out += " " + rest.slice(6, 10);

  // extension if someone pasted longer (normalize guards this, but keep for safety)
  if (hasCountry && only.length > 11) out += " x" + only.slice(11);
  if (!hasCountry && only.length > 10) out += " x" + only.slice(10);

  return out;
}

// useful if you need to send to API in E.164 later
export function toE164FromDigits(digits: string): string | undefined {
  const only = normalizeUSDigits(digits);
  const rest = only.startsWith("1") ? only.slice(1) : only;
  if (rest.length !== 10) return undefined;
  return `+1${rest}`;
}
