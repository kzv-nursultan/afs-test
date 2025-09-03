import React, { useState } from "react";
import s from "./Rail.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import Settings from "../../icons/Settings";
import SignOut from "../../icons/SignOut";
import LogOut from "../../features/modals/LogOut";

export type RailItem = {
  id: string;
  icon: React.ReactNode;
  ariaLabel: string;
  to: string;
};

type Props = {
  logo?: React.ReactNode;
  items: RailItem[];
};

export default function Rail({ logo, items }: Props) {
  const { pathname } = useLocation();
  const [openLogOut, setOpenLogOut] = useState(false);

  const openLogOutModal = () => setOpenLogOut(true);

  return (
    <>
      <aside className={s["rail"]} aria-label="Primary app rail">
        {logo && <div className={s["rail__logo"]}>{logo}</div>}

        <nav className={s["rail__nav"]}>
          {items.map((it) => {
            const isActive = pathname === it.to;
            return (
              <NavLink
                key={it.id}
                type="button"
                to={it.to}
                className={[
                  s["rail__link"],
                  isActive ? s["rail__link--active"] : "",
                ].join(" ")}
                aria-label={it.ariaLabel}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={s["rail__icon"]}>{it.icon}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className={s["rail__footer"]}>
          <span className={s["rail__separator"]} />

          <button className={s["rail__btn"]}>
            <span className={s["rail__icon"]}>
              <Settings />
            </span>
          </button>

          <button className={s["rail__btn"]} onClick={openLogOutModal}>
            <span className={s["rail__icon"]}>
              <SignOut />
            </span>
          </button>
        </div>
      </aside>
      <LogOut openModal={openLogOut} setOpenModal={setOpenLogOut} />
    </>
  );
}
