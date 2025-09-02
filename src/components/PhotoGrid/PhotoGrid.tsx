import Trash from "../../icons/Trash";
import type { OrganizationPhoto } from "../../types/company";
import { Button } from "../Button/Button";
import s from "./PhotoGrid.module.scss";

type Props = {
  photos: OrganizationPhoto[];
  onDelete?: (id: OrganizationPhoto["name"]) => void;
  width?: number;
  height?: number;
  gap?: number;
  radius?: number;
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
          key={p.name}
          className={s["photo-thumb"]}
          style={{ width, height, borderRadius: radius }}
        >
          <img
            className={s["photo-thumb__img"]}
            src={p.filepath}
            alt={p.name || ""}
          />
          {onDelete && (
            <div className={s["photo-thumb__action"]}>
              <Button
                type="button"
                variant="filled-icon"
                onClick={() => onDelete(p.name)}
                icon={<Trash />}
              />
            </div>
          )}
        </figure>
      ))}
    </div>
  );
}
