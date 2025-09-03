import { observer } from "mobx-react-lite";
import { useOrganizationStore } from "../../stores/useStores";
import { Card } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";
import AddPhoto from "../../icons/AddPhoto";
import { PhotoGrid } from "../../components/PhotoGrid/PhotoGrid";
import RemoveImage from "../modals/RemoveImage";
import { useState } from "react";
import UploadImage from "../modals/UploadImage";

function Photos() {
  const org = useOrganizationStore();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [imageName, setImageName] = useState("");
  const [openUploadPhoto, setOpenUploadPhoto] = useState(false);

  const showConfirmModal = (name: string) => {
    setImageName(name);
    setOpenConfirmDelete(true);
  };

  const showUploadImageModal = () => setOpenUploadPhoto(true);
  console.log(org?.organization?.photos);
  return (
    <>
      <Card
        title="Photos"
        actions={
          <Button
            variant="ghost"
            label="Add"
            icon={<AddPhoto />}
            onClick={showUploadImageModal}
          />
        }
      >
        {org.organization && org.organization?.photos?.length ? (
          <PhotoGrid
            photos={org.organization.photos}
            onDelete={(name) => showConfirmModal(name)}
          />
        ) : (
          <h1> No photos</h1>
        )}
      </Card>
      <RemoveImage
        openDeleteModal={openConfirmDelete}
        setOpenDeleteModal={setOpenConfirmDelete}
        imageName={imageName}
        setImageName={setImageName}
      />
      <UploadImage
        openModal={openUploadPhoto}
        setOpenModal={setOpenUploadPhoto}
      />
    </>
  );
}

const CompanyPhotos = observer(Photos);
export default CompanyPhotos;
