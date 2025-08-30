import type { SvgProps } from "../types/ui";

function Trash(props: SvgProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M16.875 4.375H3.125M8.125 8.125v5M11.875 8.125v5M15.625 4.375V16.25a.624.624 0 01-.625.625H5a.625.625 0 01-.625-.625V4.375M13.125 4.375v-1.25a1.25 1.25 0 00-1.25-1.25h-3.75a1.25 1.25 0 00-1.25 1.25v1.25"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Trash;
