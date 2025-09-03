import { useEffect, useState } from "react";
import { Button } from "../components/Button/Button";
import { Page } from "../components/Page/Page";
import Edit from "../icons/Edit";
import Trash from "../icons/Trash";
import { useContactStore, useOrganizationStore } from "../stores/useStores";
import { observer } from "mobx-react-lite";
import EditOrganizationName from "../features/modals/EditOrganizationName/EditOrganzationName";
import DeleteOrganization from "../features/modals/DeleteOrganization";
import { useParams } from "react-router-dom";
import EditContacts from "../features/edit/Contacts/EditContacts";
import CompanyInfo from "../features/detail/CompanyInfo";
import ContactInfo from "../features/detail/ContactInfo";
import CompanyPhotos from "../features/detail/CompanyPhotos";
import CompanyDetailsEdit from "../features/edit/EditCompanyDetails/EditCompanyDetails";

function OrganizationDetail() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [showContacts, setShowContacts] = useState(true);
  const { id } = useParams();
  const org = useOrganizationStore();
  const contact = useContactStore();
  const organization = org.organization;

  useEffect(() => {
    if (id) org.fetchOrganization(id);
  }, [id, org]);

  useEffect(() => {
    if (organization?.contactId) contact.fetchContact(organization.contactId);
  }, [organization?.contactId, contact]);

  if (!organization) return <h1>Organization not found</h1>;

  const openDeleteDialog = () => setOpenDeleteModal(true);
  const openEditName = () => setOpenEditModal(true);

  const toggleCompanyDetailsEdit = () => setShowDetails((prev) => !prev);
  const toggleContactDetailsEdit = () => setShowContacts((prev) => !prev);

  return (
    <>
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
              onClick={openDeleteDialog}
            />
          </>
        }
      >
        {showDetails ? (
          <CompanyInfo toggleEdit={toggleCompanyDetailsEdit} />
        ) : (
          <CompanyDetailsEdit toggleEdit={toggleCompanyDetailsEdit} />
        )}
        {showContacts ? (
          <ContactInfo toggleEdit={toggleContactDetailsEdit} />
        ) : (
          <EditContacts toggleEdit={toggleContactDetailsEdit} />
        )}
        <CompanyPhotos />
      </Page>
      <DeleteOrganization
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
      <EditOrganizationName
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />
    </>
  );
}

const OrganizationDetailsPage = observer(OrganizationDetail);
export default OrganizationDetailsPage;
