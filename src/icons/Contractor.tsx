import type { SvgProps } from "../types/ui";

function Contractor(props: SvgProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M11.667 4.633a7.166 7.166 0 015.491 6.959v1.591m-14.316 0v-1.591a7.142 7.142 0 015.491-6.959M17.158 13.183H2.842a1.592 1.592 0 000 3.184h14.316a1.592 1.592 0 100-3.184z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
      <path
        d="M12.383 13.183H7.617l.715-8.632a1 1 0 01.997-.918h1.342a1 1 0 01.997.918l.715 8.632z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
    </svg>
  );
}

export default Contractor;
