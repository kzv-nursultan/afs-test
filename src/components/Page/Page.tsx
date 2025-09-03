import React from "react";
import s from "./Page.module.scss";
import { Button } from "../Button/Button";
import Chevron from "../../icons/Chevron";

type Props = {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function Page({ title, actions, children }: Props) {
  return (
    <section className={s["page"]}>
      <header className={s["page__header"]}>
        <div className={s["page__back"]}>
          <Button variant="icon" icon={<Chevron />} />
        </div>
        <h1 className={s["page__title"]}>{title}</h1>
        {actions && <div className={s["page__actions"]}>{actions}</div>}
      </header>

      <div className={s["page__content"]}>{children}</div>
    </section>
  );
}
