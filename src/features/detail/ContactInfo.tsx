import { observer } from "mobx-react-lite";
import { useContactStore } from "../../stores/useStores";
import { Card } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";
import Edit from "../../icons/Edit";
import { DataList } from "../../components/DataList/DataList";
import { formatUSPhoneIntl } from "../utils/phone-format";
import type { ToggleEditProps } from "../../types/shared";

function Contact({ toggleEdit }: ToggleEditProps) {
  const contact = useContactStore();
  return (
    <Card
      title="Contacts"
      actions={<Button variant="ghost" label="Edit" icon={<Edit />} onClick={ toggleEdit} />}
    >
      {contact ? (
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
      ) : (
        <h1>No contact info</h1>
      )}
    </Card>
  );
}

const ContactInfo = observer(Contact);
export default ContactInfo;
