import React from "react";
import s from "./DataList.module.scss";

export type DataItem = { label: React.ReactNode; value: React.ReactNode };

type Props = {
  items: DataItem[];
  labelWidth?: number | string; // default 160px
  rowGap?: number; // default 12px
  className?: string;
};

export function DataList({
  items,
  labelWidth = 160,
  rowGap = 12,
  className,
}: Props) {
  return (
    <dl
      className={[s["data-list"], className].filter(Boolean).join(" ")}
      style={{ gridTemplateColumns: `${labelWidth}px 1fr`, rowGap }}
    >
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <dt className={s["data-list__term"]}>{it.label}</dt>
          <dd className={s["data-list__desc"]}>{it.value}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
