import type { SvgProps } from "../types/ui";


function SignOut(props: SvgProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M13.595 6.719L16.875 10l-3.28 3.281M8.125 10h8.748M8.125 16.875H3.75a.625.625 0 01-.625-.625V3.75a.625.625 0 01.625-.625h4.375"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SignOut;
