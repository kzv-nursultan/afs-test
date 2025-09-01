import React, { useEffect, useMemo, useRef, useState } from "react";
import s from "./Select.module.scss";
import Chevron from "../../icons/Chevron";

export type SelectOption = { value: string; label: string; disabled?: boolean };

type Props = {
  options: SelectOption[];
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  maxHeight?: number; // popover height cap (px)
};

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select…",
  id = "select",
  disabled,
  className,
  maxHeight = 140,
}: Props) {
  const [open, setOpen] = useState(false);
  const controlRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selectedIdx = useMemo(
    () => options.findIndex((o) => o.value === value),
    [options, value]
  );
  const [activeIdx, setActiveIdx] = useState(Math.max(0, selectedIdx));
  useEffect(() => setActiveIdx(Math.max(0, selectedIdx)), [selectedIdx]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (
        !panelRef.current?.contains(e.target as Node) &&
        !controlRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const commit = (v: string) => {
    onChange?.(v);
    setOpen(false);
    controlRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (
      !open &&
      (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")
    ) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(options.length - 1, i + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const o = options[activeIdx];
      if (o && !o.disabled) commit(o.value);
    }
  };

  const display = selectedIdx >= 0 ? options[selectedIdx].label : placeholder;

  return (
    <div
      className={[s["select"], className].filter(Boolean).join(" ")}
      onKeyDown={onKeyDown}
    >
      <button
        ref={controlRef}
        id={id}
        type="button"
        className={[
          s["select__control"],
          open ? s["select__control--open"] : "",
        ].join(" ")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${id}-listbox` : undefined}
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
      >
        <span
          className={[
            s["select__value"],
            selectedIdx < 0 ? s["select__value--placeholder"] : "",
          ].join(" ")}
        >
          {display}
        </span>
        <span
          className={[
            s["select__chevron"],
            open ? s["select__chevron--up"] : "",
          ].join(" ")}
        >
          <Chevron className={s["select__chevron-icon"]} />
        </span>
      </button>

      {open && (
        <div
          ref={panelRef}
          className={s["select__panel"]}
          role="listbox"
          id={`${id}-listbox`}
          style={{ maxHeight }}
        >
          <ul className={s["select__list"]}>
            {options.map((o, i) => {
              const selected = i === selectedIdx;
              const active = i === activeIdx;
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={[
                      s["select__option"],
                      selected ? s["select__option--selected"] : "",
                      active ? s["select__option--active"] : "",
                    ].join(" ")}
                    disabled={o.disabled}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => !o.disabled && commit(o.value)}
                  >
                    {o.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
