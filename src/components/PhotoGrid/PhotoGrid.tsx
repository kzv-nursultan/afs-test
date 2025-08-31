import Trash from "../../icons/Trash";
import { Button } from "../Button/Button";
import s from "./PhotoGrid.module.scss";

export type PhotoItem = {
  id: string | number;
  src: string;
  alt?: string;
};

type Props = {
  photos: PhotoItem[];
  onDelete?: (id: PhotoItem["id"]) => void;
  width?: number; // default 144
  height?: number; // default 108
  gap?: number; // default 12
  radius?: number; // default 10
};

export function PhotoGrid({
  photos,
  onDelete,
  width = 144,
  height = 108,
  gap = 12,
  radius = 10,
}: Props) {
  return (
    <div
      className={s["photo-grid"]}
      style={{
        gap,
        gridTemplateColumns: `repeat(auto-fill, ${width}px)`,
      }}
    >
      {photos.map((p) => (
        <figure
          key={p.id}
          className={s["photo-thumb"]}
          style={{ width, height, borderRadius: radius }}
        >
          <img
            className={s["photo-thumb__img"]}
            src={p.src}
            alt={p.alt || ""}
          />
          {onDelete && (
            <div className={s["photo-thumb__action"]}>
              <Button
                type="button"
                variant="filled-icon"
                onClick={() => onDelete(p.id)}
                icon={<Trash />}
              />
            </div>
          )}
        </figure>
      ))}
    </div>
  );
}
