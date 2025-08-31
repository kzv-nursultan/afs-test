import React from "react";
import s from "./Rail.module.scss";
import { NavLink } from "react-router-dom";

export type RailItem = {
  id: string;
  icon: React.ReactNode;
  ariaLabel: string;
  to: string;
  active?: boolean;
  onClick?: () => void;
};

type Props = {
  logo?: React.ReactNode; // top logo (36x36 in your mock)
  items: RailItem[]; // vertical nav items
  footer?: React.ReactNode; // optional bottom area (e.g., settings)
};

export default function Rail({ logo, items, footer }: Props) {
  return (
    <aside className={s["rail"]} aria-label="Primary app rail">
      {logo && <div className={s["rail__logo"]}>{logo}</div>}

      <nav className={s["rail__nav"]}>
        {items.map((it) => (
          <NavLink
            key={it.id}
            type="button"
            to={it.to}
            className={[
              s["rail__link"],
              it.active ? s["rail__link--active"] : "",
            ].join(" ")}
            aria-label={it.ariaLabel}
            aria-current={it.active ? "page" : undefined}
            onClick={it.onClick}
          >
            <span className={s["rail__icon"]}>{it.icon}</span>
          </NavLink>
        ))}
      </nav>

      {footer && <div className={s["rail__footer"]}>{footer}</div>}
    </aside>
  );
}
