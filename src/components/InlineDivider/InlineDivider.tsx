import React from "react";
import s from "./InlineDivider.module.scss";

type Props = {
  parts: React.ReactNode[]; // e.g. ["1624/2-24", "03.12.2024"]
  gap?: number; // px between items and the slash (default 12)
  separator?: React.ReactNode; // default "/"
};

export function InlineDivider({ parts, gap = 12, separator = "/" }: Props) {
  return (
    <span className={s["inline-divider"]} style={{ columnGap: gap }}>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          <span className={s["inline-divider__part"]}>{p}</span>
          {i < parts.length - 1 && (
            <span className={s["inline-divider__sep"]} aria-hidden="true">
              {separator}
            </span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}
