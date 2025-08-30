import type { SvgProps } from "../types/ui";

function Settings(props: SvgProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M4.086 7.156c.14-.297.305-.578.492-.851l-.031-2.032c0-.187.078-.367.226-.492a8.105 8.105 0 012.47-1.43.605.605 0 01.53.055l1.743 1.047c.328-.023.656-.023.984 0l1.742-1.047a.653.653 0 01.54-.054c.89.32 1.726.796 2.468 1.421a.62.62 0 01.219.493l-.031 2.03c.187.274.351.556.492.852l1.773.985c.164.094.281.25.313.437.164.93.172 1.899 0 2.844a.623.623 0 01-.313.438l-1.773.984c-.14.297-.305.578-.492.851l.03 2.032a.638.638 0 01-.226.492 8.109 8.109 0 01-2.469 1.43.605.605 0 01-.53-.055L10.5 16.539a6.91 6.91 0 01-.984 0l-1.743 1.047a.653.653 0 01-.539.055 8.067 8.067 0 01-2.468-1.422.62.62 0 01-.22-.492l.032-2.032a6.17 6.17 0 01-.492-.851l-1.773-.985A.623.623 0 012 11.422a8.087 8.087 0 010-2.844.623.623 0 01.313-.437l1.773-.985z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 13.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Settings;
