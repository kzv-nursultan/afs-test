import type { SvgProps } from "../types/ui";

function Inventory(props: SvgProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M10 9a2 2 0 100-4 2 2 0 000 4z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 7c0 4.5-5 8-5 8s-5-3.5-5-8a5 5 0 1110 0v0z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        d="M5.75 17.25h8.5"
      />
    </svg>
  );
}

export default Inventory;
