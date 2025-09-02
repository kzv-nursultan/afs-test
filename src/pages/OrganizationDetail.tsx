import { useEffect, useState } from "react";
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
import { TextField } from "../components/TextField/TextField";
import { Select } from "../components/Select/Select";
import { MultiSelect } from "../components/MultiSelect/MultiSelect";
import { useContactStore, useOrganizationStore } from "../stores/store-context";
import { observer } from "mobx-react-lite";
import { formatIsoToDMY } from "../features/utils/isoDateFormatter";
import { CompanyTypeMap } from "../features/utils/companyTypeMapper";
import { formatUSPhoneIntl } from "../features/utils/phone-format";

function OrganizationDetail() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [values, setValues] = useState<string[]>(["fh", "log"]);
  const id = "12";
  const org = useOrganizationStore();
  const contact = useContactStore();

  useEffect(() => {
    if (id) org.fetchOrganization(id);
  }, [id, org]);

  useEffect(() => {
    if (org.organization?.contactId)
      contact.fetchContact(org.organization.contactId);
  }, [org.organization?.contactId, contact]);

  const toggleModal = () => setOpen((prev) => !prev);

  const organization = org.organization;

  if (!organization) return null;

  return (
    <Page
      title={organization?.name}
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
              value: (
                <InlineDivider
                  parts={[
                    organization.contract.no,
                    formatIsoToDMY(organization.contract.issue_date),
                  ]}
                />
              ),
            },
            {
              label: "Business entity:",
              value: organization.businessEntity,
            },
            {
              label: "Company type:",
              value: organization.type.map((t) => CompanyTypeMap[t]).join(", "),
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
            {
              label: "Responsible person:",
              value: `${contact.contact?.firstname} ${contact.contact?.lastname}`,
            },
            {
              label: "Phone number:",
              value: formatUSPhoneIntl(contact.contact?.phone || ""),
            },
            {
              label: "Email:",
              value: contact.contact?.email,
            },
          ]}
        />
      </Card>

      <Card
        title="Photos"
        actions={<Button variant="ghost" label="Add" icon={<AddPhoto />} />}
      >
        <PhotoGrid
          photos={organization.photos}
          onDelete={(id) => console.log("delete", id)}
        />
      </Card>
      <Card>
        <MultiSelect
          options={[
            { value: "fh", label: "Funeral Home" },
            { value: "log", label: "Logistics services" },
            { value: "burial", label: "Burial care Contractor" },
          ]}
          value={values}
          onChange={setValues}
          placeholder="Select company types"
          id="company-types"
        />
        <TextField placeholder="Input text" />
        <Select
          options={[
            { value: "sp", label: "Sole Proprietorship" },
            { value: "pa", label: "Partnership" },
            { value: "llc", label: "Limited Liability Company" },
          ]}
          value={value}
          onChange={setValue}
          id="business-entity"
        />
      </Card>
      <Dialog
        open={open}
        onClose={toggleModal}
        title="Remove the Organization?"
        actions={
          <>
            <Button variant="outline" label="No" onClick={toggleModal} />
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

const OrganizationDetailsPage = observer(OrganizationDetail);
export default OrganizationDetailsPage;
