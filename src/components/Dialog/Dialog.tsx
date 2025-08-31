import React, { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import s from "./Dialog.module.scss";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode; // body content
  actions?: React.ReactNode; // buttons row
  closeOnBackdrop?: boolean; // default: true
  id?: string; // optional id suffix for a11y
};

export function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
  closeOnBackdrop = true,
  id = "dialog",
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // focus panel on open
  useLayoutEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  // close on Esc + focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const els = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href],button,textarea,input,select,[tabindex]:not([tabindex="-1"])'
        );
        if (els.length === 0) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const titleId = `${id}-title`;
  const descId = `${id}-desc`;

  return createPortal(
    <div className={s["dialog"]} role="presentation">
      <div
        className={s["dialog__backdrop"]}
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className={s["dialog__panel"]}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={children ? descId : undefined}
        tabIndex={-1}
      >
        {title && (
          <header className={s["dialog__header"]}>
            <h2 id={titleId} className={s["dialog__title"]}>
              {title}
            </h2>
          </header>
        )}

        {children && (
          <div id={descId} className={s["dialog__body"]}>
            {children}
          </div>
        )}

        {actions && <div className={s["dialog__actions"]}>{actions}</div>}
      </div>
    </div>,
    document.body
  );
}
