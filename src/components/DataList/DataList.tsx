import React from "react";
import s from "./DataList.module.scss";

export type DataItem = { label: React.ReactNode; value: React.ReactNode };

type Props = {
  items: DataItem[];
  className?: string;
};

export function DataList({ items, className }: Props) {
  return (
    <dl className={[s["data-list"], className].filter(Boolean).join(" ")}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <dt className={s["data-list__term"]}>{it.label}</dt>
          <dd className={s["data-list__desc"]}>{it.value}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
