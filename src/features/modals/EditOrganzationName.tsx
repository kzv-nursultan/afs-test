import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import type { SetStateType } from "../../types/shared";
import { useOrganizationStore } from "../../stores/store-context";
import { Dialog } from "../../components/Dialog/Dialog";
import { Button } from "../../components/Button/Button";
import { TextField } from "../../components/TextField/TextField";

interface Props {
  openEditModal: boolean;
  setOpenEditModal: SetStateType<boolean>;
}


function EditOrganizationNameBase({ openEditModal, setOpenEditModal }: Props) {
  const org = useOrganizationStore();
  const currentName = org.organization?.name ?? "";
  const [name, setName] = useState(currentName);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (openEditModal) {
      setName(currentName);
      setLocalError(null);
    }
  }, [openEditModal, currentName]);

  const toggle = () => setOpenEditModal((p) => !p);

  const onSave = async () => {
    const next = name.trim();
    if (!next) {
      setLocalError("Name is required");
      return;
    }
    if (next === currentName) {
      toggle();
      return;
    }
    await org.updateOrganization({ name: next });
    toggle();
  };

  const disabled = org.loading || !name.trim() || name.trim() === currentName;

  return (
    <Dialog
      open={openEditModal}
      onClose={toggle}
      title="Specify the Organization's name"
      actions={
        <>
          <Button variant="outline" label="Cancel" onClick={toggle} />
          <Button
            variant="filled"
            label="Save changes"
            onClick={onSave}
            disabled={disabled}
          />
        </>
      }
    >
      <TextField
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Organization name"
        aria-invalid={!!localError}
      />
      {localError && (
        <div style={{ color: "#d92d20", marginTop: 6, fontSize: 12 }}>
          {localError}
        </div>
      )}
    </Dialog>
  );
}

const EditOrganizationName = observer(EditOrganizationNameBase);
export default EditOrganizationName;
