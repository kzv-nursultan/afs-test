export function formatUSPhoneIntl(input: string): string {
  const digits = input.replace(/\D/g, "");
  const country = "1";
  let rest = "";

  if (digits.length === 11 && digits.startsWith("1")) {
    rest = digits.slice(1);
  } else if (digits.length === 10) {
    rest = digits;
  } else if (digits.length > 11 && digits.startsWith("1")) {
    rest = digits.slice(1, 11);
  } else if (digits.length > 10) {
    rest = digits.slice(0, 10);
  } else {
    return input;
  }

  const area = rest.slice(0, 3);
  const central = rest.slice(3, 6);
  const line = rest.slice(6, 10);

  const ext =
    digits.length > 11 && digits.startsWith("1") ? digits.slice(11) : "";

  return `+${country} ${area} ${central} ${line}${ext ? " x" + ext : ""}`;
}
