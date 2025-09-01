import React from "react";
import s from "./TextField.module.scss";

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export function TextField({ className, invalid, ...props }: TextFieldProps) {
  const cls = [
    s["text-field"],
    invalid ? s["text-field--invalid"] : "",
    className || "",
  ].join(" ");

  return <input {...props} className={cls} />;
}
