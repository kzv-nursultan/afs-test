import { Card } from "../../../components/Card/Card";
import { Button } from "../../../components/Button/Button";
import Check from "../../../icons/Check";
import X from "../../../icons/X";
import { observer } from "mobx-react-lite";
import { useContactStore } from "../../../stores/store-context";
import { DataList } from "../../../components/DataList/DataList";
import { TextField } from "../../../components/TextField/TextField";
import { formatUSPhoneIntl } from "../../utils/phone-format";
import { useEffect, useState } from "react";
import type { InputChangeEvent } from "../../../types/shared";

const FORM_ID = "contact-form";

interface Patch {
  fullname: string;
  phone: string;
  email: string;
}

function ContactsBase() {
  const cont = useContactStore();
  const [patch, setPatch] = useState<Patch>({
    fullname: "",
    phone: "",
    email: "",
  });
  const contact = cont.contact;

  useEffect(() => {
    if (contact)
      setPatch({
        fullname: `${contact?.firstname} ${contact?.lastname}`,
        phone: contact?.phone,
        email: contact?.email,
      });
  }, [contact]);

  const onChangeHandler = ({ target }: InputChangeEvent) => {
    const { name, value } = target;
    setPatch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card
      title="Contacts"
      actions={
        <>
          <Button
            variant="ghost"
            label="Save changes"
            icon={<Check />}
            type="submit"
            // form={FORM_ID}
            // disabled={org.loading}
          />
          <Button
            variant="ghost"
            label="Cancel"
            icon={<X />}
            type="reset"
            // form={FORM_ID}
          />
        </>
      }
    >
      <form id={FORM_ID}>
        <DataList
          items={[
            {
              label: "Responsible Person:",
              value: (
                <TextField
                  value={patch.fullname}
                  name="fullname"
                  onChange={onChangeHandler}
                />
              ),
            },
            {
              label: "Phone number:",
              value: (
                <TextField
                  value={formatUSPhoneIntl(patch?.phone || "")}
                  name="phone"
                  onChange={onChangeHandler}
                />
              ),
            },
            {
              label: "Email:",
              value: (
                <TextField
                  value={patch?.email}
                  name="email"
                  onChange={onChangeHandler}
                />
              ),
            },
          ]}
        />
      </form>
    </Card>
  );
}

const EditContacts = observer(ContactsBase);
export default EditContacts;
