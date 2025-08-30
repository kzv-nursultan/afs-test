import React from "react";
import s from "./NavList.module.scss";
import { Button } from "../Button/Button";

type Item = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
};

export function NavList({ items }: { items: Item[] }) {
  return (
    <nav className={s["nav-list"]}>
      {items.map((it) => (
        <Button
          key={it.label}
          variant={it.active ? "filled" : "outline"}
          value=""
          label={it.label}
        />
      ))}
    </nav>
  );
}
