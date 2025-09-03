import React from "react";
import s from "./InlineDivider.module.scss";

type Props = {
  parts: React.ReactNode[];
  separator?: React.ReactNode;
};

export function InlineDivider({ parts, separator = "/" }: Props) {
  return (
    <span className={s["inline-divider"]}>
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
