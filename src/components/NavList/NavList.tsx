import React from "react";
import s from "./NavList.module.scss";
import { Button } from "../Button/Button";

type Item = {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
};

export function NavList({ items }: { items: Item[] }) {
  const isActive = true;
  return (
    <nav className={s["nav-list"]}>
      {items.map((it) => (
        <Button
          key={it.label}
          variant={isActive ? "filled" : "outline"}
          label={it.label}
          iconPosition="start"
          icon={it.icon}
        />
      ))}
    </nav>
  );
}
