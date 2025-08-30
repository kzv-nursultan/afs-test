import React from "react";
import s from "./Card.module.scss";

type Props = {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function Card({ title, actions, children }: Props) {
  return (
    <section className={s["card"]}>
      {(title || actions) && (
        <header className={s["card__header"]}>
          {title && <h3 className={s["card__title"]}>{title}</h3>}
          {actions && <div className={s["card__actions"]}>{actions}</div>}
        </header>
      )}
      <div className={s["card__body"]}>{children}</div>
    </section>
  );
}
