import React from "react";
import s from "./Athentication.module.scss";

type Props = {
  children: React.ReactNode;
  logo?: React.ReactNode; // optional brand mark at top
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
};

export function AuthLayout({ children, logo, title, subtitle }: Props) {
  return (
    <div className={s["auth"]}>
      <div className={s["auth__card"]}>
        {logo && <div className={s["auth__logo"]}>{logo}</div>}
        {title && <h1 className={s["auth__title"]}>{title}</h1>}
        {subtitle && <p className={s["auth__subtitle"]}>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
