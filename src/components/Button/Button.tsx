import s from "./Button.module.scss";

type Variant = "filled" | "outline" | "ghost" | "icon";
type Size = "sm" | "md";

export function Button({
  label,
  icon,
  iconPosition = "start",
  variant = "filled",
  size = "md",
  block,
  disabled,
  ariaLabel,
  ...rest
}: {
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  variant?: Variant;
  size?: Size;
  block?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = [
    s["btn"],
    s[`btn--variant-${variant}`],
    s[`btn--size-${size}`],
    block ? s["btn--block"] : "",
    disabled ? s["btn--disabled"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={disabled}
      aria-label={variant === "icon" ? ariaLabel : undefined}
      {...rest}
    >
      {variant !== "icon" && icon && iconPosition === "start" && (
        <span className={`${s["btn__icon"]} ${s["btn__icon--start"]}`}>
          {icon}
        </span>
      )}
      {variant !== "icon" && <span className={s["btn__label"]}>{label}</span>}
      {variant !== "icon" && icon && iconPosition === "end" && (
        <span className={`${s["btn__icon"]} ${s["btn__icon--end"]}`}>
          {icon}
        </span>
      )}
      {variant === "icon" && (
        <span className={`${s["btn__icon"]} ${s["btn__icon--center"]}`}>
          {icon}
        </span>
      )}
    </button>
  );
}
