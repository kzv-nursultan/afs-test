import { useEffect, useMemo, useRef, useState } from "react";
import s from "./MultiSelect.module.scss";
import Chevron from "../../icons/Chevron";
import Check from "../../icons/Check";

export type MultiSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type Props = {
  options: MultiSelectOption[];
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select…",
  id = "multi-select",
  disabled,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = useMemo(() => new Set(value), [value]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const toggle = (v: string) => {
    if (selected.has(v)) onChange(value.filter((x) => x !== v));
    else onChange([...value, v]);
  };

  const summary =
    value.length === 0
      ? placeholder
      : options
          .filter((o) => selected.has(o.value))
          .map((o) => o.label)
          .join(", ");

  return (
    <div
      ref={rootRef}
      className={[s["multi-select"], className].filter(Boolean).join(" ")}
    >
      {/* Control (looks like TextField) */}
      <button
        type="button"
        id={id}
        className={[
          s["multi-select__control"],
          open ? s["multi-select__control--open"] : "",
        ].join(" ")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${id}-listbox` : undefined}
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
      >
        <span
          className={[
            s["multi-select__value"],
            value.length === 0 ? s["multi-select__value--placeholder"] : "",
          ].join(" ")}
        >
          {summary}
        </span>

        <span
          className={[
            s["multi-select__chevron"],
            open ? s["multi-select__chevron--up"] : "",
          ].join(" ")}
          aria-hidden
        >
          <Chevron className={s["multi-select__chevron-icon"]} />
        </span>
      </button>

      {/* Popover panel */}
      {open && (
        <div
          className={s["multi-select__panel"]}
          role="listbox"
          aria-multiselectable="true"
          id={`${id}-listbox`}
        >
          <ul className={s["multi-select__list"]}>
            {options.map((opt) => {
              const checked = selected.has(opt.value);
              return (
                <li key={opt.value}>
                  <label
                    className={[
                      s["multi-select__option"],
                      checked ? s["multi-select__option--selected"] : "",
                    ].join(" ")}
                  >
            
                    <input
                      type="checkbox"
                      className={s["multi-select__checkbox"]}
                      checked={checked}
                      disabled={opt.disabled}
                      onChange={() => toggle(opt.value)}
                    />
                    <span className={s["multi-select__box"]} aria-hidden>
                      <Check className={s["multi-select__check"]} />
                    </span>
                    <span className={s["multi-select__label"]}>
                      {opt.label}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
