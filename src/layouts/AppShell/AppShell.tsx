import React from "react";
import s from "./AppShell.module.scss";

type Props = {
  sidebar: React.ReactNode; // the white panel with Organizations/Contractors/Clients
  rail?: React.ReactNode; // the dark icon rail
  children: React.ReactNode; // main content
};

export function AppShell({ rail, sidebar, children }: Props) {
  return (
    <div className={s["app-shell"]}>
      <aside className={s["app-shell__rail"]}>{rail}</aside>
      <aside className={s["app-shell__side"]}>{sidebar}</aside>
      <main className={s["app-shell__main"]}>{children}</main>
    </div>
  );
}
