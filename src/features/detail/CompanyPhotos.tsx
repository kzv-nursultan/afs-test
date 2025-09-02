import { observer } from "mobx-react-lite";
import { useOrganizationStore } from "../../stores/store-context";
import { Card } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";
import AddPhoto from "../../icons/AddPhoto";
import { PhotoGrid } from "../../components/PhotoGrid/PhotoGrid";

function Photos() {
  const org = useOrganizationStore();
  return (
    <Card
      title="Photos"
      actions={<Button variant="ghost" label="Add" icon={<AddPhoto />} />}
    >
      {org.organization && org.organization?.photos?.length ? (
        <PhotoGrid
          photos={org.organization.photos}
          onDelete={(id) => console.log("delete", id)}
        />
      ) : (
        <h1> No photos found</h1>
      )}
    </Card>
  );
}

const CompanyPhotos = observer(Photos);
export default CompanyPhotos;
