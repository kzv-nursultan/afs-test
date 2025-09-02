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
import { useContactStore, useOrganizationStore } from "../stores/store-context";
import { observer } from "mobx-react-lite";
import { formatIsoToDMY } from "../features/utils/isoDateFormatter";
import { CompanyTypeMap } from "../features/utils/companyTypeMapper";
import { formatUSPhoneIntl } from "../features/utils/phone-format";
import EditOrganizationName from "../features/modals/EditOrganzationName";
import DeleteOrganization from "../features/modals/DeleteOrganization";
import { useParams } from "react-router-dom";
import CompanyDetails from "../features/edit/EditCompanyDetails/EditCompanyDetails";
import EditContacts from "../features/edit/Contacts/EditContacts";

function OrganizationDetail() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { id } = useParams();
  const org = useOrganizationStore();
  const contact = useContactStore();

  useEffect(() => {
    if (id) org.fetchOrganization(id);
  }, [id, org]);

  useEffect(() => {
    if (org.organization?.contactId)
      contact.fetchContact(org.organization.contactId);
  }, [org.organization?.contactId, contact]);

  const toggleDeleteModal = () => setOpenDeleteModal(true);
  const openEditName = () => setOpenEditModal(true);

  const organization = org.organization;

  if (!organization) return <h1>Organization not found</h1>;

  return (
    <Page
      title={organization?.name}
      actions={
        <>
          <Button
            variant="icon"
            ariaLabel="Edit"
            icon={<Edit />}
            onClick={openEditName}
          />
          <Button
            variant="icon"
            ariaLabel="Delete"
            icon={<Trash stroke="#D72323" />}
            onClick={toggleDeleteModal}
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
      <EditContacts />
      <CompanyDetails />
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
      <DeleteOrganization
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
      <EditOrganizationName
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />
    </Page>
  );
}

const OrganizationDetailsPage = observer(OrganizationDetail);
export default OrganizationDetailsPage;
