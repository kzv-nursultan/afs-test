import type { SvgProps } from "../types/ui";

function Search(props: SvgProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M9.063 15.625a6.562 6.562 0 100-13.125 6.562 6.562 0 000 13.125zM13.703 13.703L17.5 17.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Search;
