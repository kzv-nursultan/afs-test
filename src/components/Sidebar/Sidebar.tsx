import React from "react";
import s from "./Sidebar.module.scss";
import { Button } from "../Button/Button";

export type SidebarItem = {
  label: string;
  icon?: React.ReactNode;
  active?: boolean; // pass true for the current section
  onClick?: () => void; // or wire to router later
};

type Props = {
  title?: string;
  subtitle?: string;
  items: SidebarItem[];
  footerText?: string;
};

export function Sidebar({
  title = "Oak Tree Cemetery",
  subtitle = "Process Manager",
  items,
  footerText = "All Funeral Services © 2015–2025",
}: Props) {
  return (
    <aside className={s["sidebar"]}>
      <header className={s["sidebar__header"]}>
        <h2 className={s["sidebar__title"]}>{title}</h2>
        <div className={s["sidebar__subtitle"]}>{subtitle}</div>
      </header>

      <div className={s["sidebar__separator"]} role="separator" />

      <nav className={s["sidebar__nav"]} aria-label="Main">
        <ul className={s["nav-list"]}>
          {items.map((it) => (
            <li className={s["nav-list__item"]} key={it.label}>
              <Button
                variant={it.active ? "filled" : "outline"}
                label={it.label}
                iconPosition="start"
                icon={it.icon}
                onClick={it.onClick}
                block
                layout="nav"
              />
            </li>
          ))}
        </ul>
      </nav>

      <footer className={s["sidebar__footer"]}>
        <small className={s["sidebar__footnote"]}>{footerText}</small>
      </footer>
    </aside>
  );
}
