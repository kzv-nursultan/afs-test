import React, { useEffect, useRef, useState } from "react";
import s from "./ImagePicker.module.scss";
import { Button } from "../Button/Button";

type Props = {
  onSelect?: (file: File) => void | Promise<void>;
  accept?: string;
  maxSizeMB?: number;
  buttonLabel?: string;
  disabled?: boolean;
  className?: string;
};

export function ImagePicker({
  onSelect,
  accept = "image/*",
  maxSizeMB = 5,
  buttonLabel = "Choose image…",
  disabled,
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  const onFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.currentTarget.files?.[0] ?? null;
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file");
      e.currentTarget.value = "";
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Max size is ${maxSizeMB}MB`);
      e.currentTarget.value = "";
      return;
    }

    setError(null);

    // preview
    const url = URL.createObjectURL(file);
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return url;
    });

    try {
      await onSelect?.(file);
    } finally {
      e.currentTarget.value = "";
    }
  };

  // cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className={[s["image-picker"], className].filter(Boolean).join(" ")}>
      <input
        ref={inputRef}
        className={s["image-picker__input"]}
        type="file"
        accept={accept}
        onChange={onFile}
        hidden
        disabled={disabled}
      />

      <Button
        variant="outline"
        label={buttonLabel}
        onClick={openPicker}
        disabled={disabled}
      />

      {preview && (
        <img
          src={preview}
          alt="Selected preview"
          className={s["image-picker__preview"]}
        />
      )}

      {error && <div className={s["image-picker__error"]}>{error}</div>}
    </div>
  );
}

export default ImagePicker;
