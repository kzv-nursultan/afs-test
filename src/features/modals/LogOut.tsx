import type { SetStateType } from "../../types/shared";
import { Dialog } from "../../components/Dialog/Dialog";
import { Button } from "../../components/Button/Button";
import { AUTH_TOKEN } from "../../config";

interface Props {
  openModal: boolean;
  setOpenModal: SetStateType<boolean>;
}

export default function LogOut({ openModal, setOpenModal }: Props) {
  const toggleModal = () => setOpenModal((prev) => !prev);

  const confirmLogOut = async () => {
    localStorage.removeItem(AUTH_TOKEN);
    window.location.reload()
  };

  return (
    <Dialog
      open={openModal}
      onClose={toggleModal}
      title="Are sure you want to exit?"
      actions={
        <>
          <Button variant="outline" label="No" onClick={toggleModal} />
          <Button variant="filled" label="Yes" onClick={confirmLogOut} />
        </>
      }
    >
      Are you sure you want to exit?
    </Dialog>
  );
}
