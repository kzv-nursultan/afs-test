import { Button } from "../components/Button/Button";
import { Card } from "../components/Card/Card";
import { Page } from "../components/Page/Page";
import AddPhoto from "../icons/AddPhoto";
import Edit from "../icons/Edit";
import Trash from "../icons/Trash";

export default function OrganizationDetailsPage() {
  return (
    <Page
      title="Eternal Rest Funeral Home"
      actions={
        <>
          <Button variant="icon" ariaLabel="Edit" icon={<Edit />} />
          <Button
            variant="icon"
            ariaLabel="Delete"
            icon={<Trash stroke="#D72323" />}
          />
        </>
      }
    >
      <Card
        title="Company Details"
        actions={<Button variant="ghost" label="Edit" icon={<Edit />} />}
      >
        <></>
      </Card>

      <Card
        title="Contacts"
        actions={<Button variant="ghost" label="Edit" icon={<Edit />} />}
      >
        <></>
      </Card>

      <Card
        title="Photos"
        actions={<Button variant="ghost" label="Add" icon={<AddPhoto />} />}
      >
        <></>
      </Card>
    </Page>
  );
}
