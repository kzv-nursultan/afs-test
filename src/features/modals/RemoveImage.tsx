import type { SetStateType } from "../../types/shared";
import { Dialog } from "../../components/Dialog/Dialog";
import { Button } from "../../components/Button/Button";
import { observer } from "mobx-react-lite";
import { useOrganizationStore } from "../../stores/useStores";
import toast from "react-hot-toast";

interface Props {
  openDeleteModal: boolean;
  setOpenDeleteModal: SetStateType<boolean>;
  imageName: string;
  setImageName: SetStateType<string>;
}

function RemoveImageBase({
  openDeleteModal,
  setOpenDeleteModal,
  imageName,
  setImageName,
}: Props) {
  const org = useOrganizationStore();
  const toggleDeleteModal = () => setOpenDeleteModal((prev) => !prev);

  const confirmDeleteImage = async () => {
    await org.removePhoto(imageName);
    setImageName("");
    toggleDeleteModal();
    toast.success("Image successfully deleted");
  };

  return (
    <Dialog
      open={openDeleteModal}
      onClose={toggleDeleteModal}
      title="Remove the image?"
      actions={
        <>
          <Button variant="outline" label="No" onClick={toggleDeleteModal} />
          <Button
            variant="filled"
            label="Yes, remove"
            onClick={confirmDeleteImage}
          />
        </>
      }
    >
      {`Are you sure you want to remove ${imageName}?`}
    </Dialog>
  );
}

const RemoveImage = observer(RemoveImageBase);
export default RemoveImage;
