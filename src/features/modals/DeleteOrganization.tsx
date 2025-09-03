import type { SetStateType } from "../../types/shared";
import { Dialog } from "../../components/Dialog/Dialog";
import { Button } from "../../components/Button/Button";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useOrganizationStore } from "../../stores/useStores";

interface Props {
  openDeleteModal: boolean;
  setOpenDeleteModal: SetStateType<boolean>;
}

function DeleteOrganizationBase({
  openDeleteModal,
  setOpenDeleteModal,
}: Props) {
  const org = useOrganizationStore();
  const navigate = useNavigate();
  const toggleDeleteModal = () => setOpenDeleteModal((prev) => !prev);

  const confirmDeleteOrganization = async () => {
    await org.deleteOrganization();
    navigate("/");
  };

  return (
    <Dialog
      open={openDeleteModal}
      onClose={toggleDeleteModal}
      title="Remove the Organization?"
      actions={
        <>
          <Button variant="outline" label="No" onClick={toggleDeleteModal} />
          <Button
            variant="filled"
            label="Yes, remove"
            onClick={confirmDeleteOrganization}
          />
        </>
      }
    >
      Are you sure you want to remove this Organization?
    </Dialog>
  );
}

const DeleteOrganization = observer(DeleteOrganizationBase);
export default DeleteOrganization;
