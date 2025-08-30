import type { SvgProps } from "../types/ui";

function Share(props: SvgProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M7.158 11.258l5.692 3.317m-.008-9.15L7.158 8.742M17.5 4.167a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM7.5 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm10 5.833a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Share;
