import React, { useRef } from "react";
import s from "./DatePickerTextField.module.scss";
import {
  formatIsoToDMY,
  isoToYMD,
} from "../../features/utils/isoDateFormatter";

type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function DatePickerTextField({
  value,
  onChange,
  placeholder = "DD.MM.YYYY",
  disabled,
  ...rest
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    const el = inputRef.current;
    if (!el || disabled) return;

    if (typeof el.showPicker === "function") {
      el.showPicker();
    } else {
      el.focus();
      el.click();
    }
  };

  return (
    <div
      className={s.wrapper}
      data-disabled={disabled ? "" : undefined}
      onPointerDown={(e) => {
        e.preventDefault();
        openPicker();
      }}
      role="button"
      aria-haspopup="dialog"
      aria-disabled={disabled || undefined}
    >
      <span
        className={[s.value, value ? "" : s["value--placeholder"]].join(" ")}
      >
        {value ? formatIsoToDMY(value) : placeholder}
      </span>

      <input
        ref={inputRef}
        type="date"
        className={s.native}
        value={isoToYMD(value || "")}
        onChange={onChange}
        disabled={disabled}
        onClick={openPicker}
        {...rest}
      />
    </div>
  );
}
