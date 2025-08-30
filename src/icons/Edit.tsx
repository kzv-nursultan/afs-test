import type { SvgProps } from "../types/ui";

function Edit(props: SvgProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M7.241 16.875H3.75a.625.625 0 01-.625-.625v-3.491a.625.625 0 01.183-.442l9.375-9.375a.625.625 0 01.884 0l3.491 3.491a.625.625 0 010 .884l-9.375 9.375a.627.627 0 01-.442.183zM10.625 5L15 9.375M7.46 16.835L3.165 12.54"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Edit;
