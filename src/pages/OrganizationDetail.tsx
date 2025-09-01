import { useState } from "react";
import { Button } from "../components/Button/Button";
import { Card } from "../components/Card/Card";
import { DataList } from "../components/DataList/DataList";
import { InlineDivider } from "../components/InlineDivider/InlineDivider";
import { Page } from "../components/Page/Page";
import { PhotoGrid } from "../components/PhotoGrid/PhotoGrid";
import AddPhoto from "../icons/AddPhoto";
import Edit from "../icons/Edit";
import Trash from "../icons/Trash";
import { Dialog } from "../components/Dialog/Dialog";

export default function OrganizationDetailsPage() {
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen((prev) => !prev);

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
            onClick={toggleModal}
          />
        </>
      }
    >
      <Card
        title="Company Details"
        actions={<Button variant="ghost" label="Edit" icon={<Edit />} />}
      >
        <DataList
          items={[
            {
              label: "Agreement:",
              value: <InlineDivider parts={["1624/2-24", "03.12.2024"]} />,
            },
            {
              label: "Business entity:",
              value: "Partnership",
            },
            {
              label: "Company type:",
              value: "Funeral Home, Logistics services",
            },
          ]}
        />
      </Card>

      <Card
        title="Contacts"
        actions={<Button variant="ghost" label="Edit" icon={<Edit />} />}
      >
        <DataList
          items={[
            { label: "Responsible person:", value: "David Rosenberg" },
            { label: "Phone number:", value: "+1 702 555 2345" },
            { label: "E-mail:", value: "david_rosenberg88@gmail.com" },
          ]}
        />
      </Card>

      <Card
        title="Photos"
        actions={<Button variant="ghost" label="Add" icon={<AddPhoto />} />}
      >
        <PhotoGrid
          photos={[
            { id: 1, src: "/main-logo.png", alt: "Funeral home" },
            { id: 2, src: "/main-logo.png", alt: "Ceremony hall" },
            { id: 3, src: "/main-logo.png", alt: "Lobby" },
          ]}
          onDelete={(id) => console.log("delete", id)}
        />
      </Card>
      <Dialog
        open={open}
        onClose={toggleModal}
        title="Remove the Organization?"
        actions={
          <>
            <Button
              variant="outline"
              label="No"
              onClick={toggleModal}
            />
            <Button
              variant="filled"
              label="Yes, remove"
              onClick={() => {
                /* call delete */
              }}
            />
          </>
        }
      >
        Are you sure you want to remove this Organization?
      </Dialog>
    </Page>
  );
}
