import React from "react";
import s from "./PageHeader.module.scss";

type Props = {
  title: string;
  actions?: React.ReactNode; // edit/trash icons
  back?: React.ReactNode; // back chevron
};

export function PageHeader({ title, actions, back }: Props) {
  return (
    <header className={s["page-header"]}>
      <div className={s["page-header__left"]}>
        {back && <div className={s["page-header__back"]}>{back}</div>}
        <h1 className={s["page-header__title"]}>{title}</h1>
      </div>
      <div className={s["page-header__actions"]}>{actions}</div>
    </header>
  );
}
