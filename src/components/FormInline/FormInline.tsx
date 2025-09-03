import React from "react";
import s from "./FormInline.module.scss";

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
  rightLabel: string; // e.g. "Date:"
  gap?: number; // default 12px
};

export function FormInline({ left, right, rightLabel, gap = 12 }: Props) {
  return (
    <div className={s.inline} style={{ gap }}>
      {left}
      <span className={s.label}>{rightLabel}</span>
      {right}
    </div>
  );
}
