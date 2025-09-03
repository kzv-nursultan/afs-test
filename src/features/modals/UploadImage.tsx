import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useOrganizationStore } from "../../stores/useStores";
import { Dialog } from "../../components/Dialog/Dialog";
import { Button } from "../../components/Button/Button";
import ImagePicker from "../../components/ImagePicker/ImagePicker";

interface Props {
  openModal: boolean;
  setOpenModal: (updater: (prev: boolean) => boolean) => void;
}

function UploadImageBase({ openModal, setOpenModal }: Props) {
  const org = useOrganizationStore();
  const [file, setFile] = useState<File | null>(null);

  const toggleModal = () => setOpenModal((p) => !p);

  const confirmUpload = async () => {
    if (!file || !org.organization) return;
    await org.addImage(file); // your MobX action that uploads
    setOpenModal((p) => !p);
    setFile(null);
  };

  return (
    <Dialog
      open={openModal}
      onClose={toggleModal}
      title="Select image for upload"
      actions={
        <>
          <Button variant="outline" label="Cancel" onClick={toggleModal} />
          <Button
            variant="filled"
            label={"Confirm"}
            onClick={confirmUpload}
            disabled={!file || !org.organization}
          />
        </>
      }
    >
      <ImagePicker onSelect={(f) => setFile(f)} />
    </Dialog>
  );
}

const UploadImage = observer(UploadImageBase);
export default UploadImage;
