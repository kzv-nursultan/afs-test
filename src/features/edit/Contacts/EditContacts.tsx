import { Card } from "../../../components/Card/Card";
import { Button } from "../../../components/Button/Button";
import Check from "../../../icons/Check";
import X from "../../../icons/X";
import { observer } from "mobx-react-lite";
import { useContactStore } from "../../../stores/useStores";
import { DataList } from "../../../components/DataList/DataList";
import { TextField } from "../../../components/TextField/TextField";
import { formatUSPhoneIntl, normalizeUSDigits } from "../../utils/phone-format";
import { useEffect, useState } from "react";
import type { InputChangeEvent, ToggleEditProps } from "../../../types/shared";
import toast from "react-hot-toast";

const FORM_ID = "contact-form";

interface Patch {
  fullname: string;
  phone: string;
  email: string;
}

function ContactsBase({ toggleEdit }: ToggleEditProps) {
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

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!contact) {
      toast.error("Contact is not found");
      return;
    }
    const [firstname, lastname, ...rest] = patch.fullname.split(" ");
    const updatedContact = {
      firstname,
      lastname: rest.length ? `${lastname} ${rest.join(" ")}` : lastname,
      phone: normalizeUSDigits(patch.phone),
      email: patch.email,
    };
    await cont.updateContact(updatedContact, contact.id).then(() => {
      toast.success("Contact updated successfully");
      toggleEdit();
    });
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
            form={FORM_ID}
            disabled={cont.loading}
          />
          <Button
            variant="ghost"
            label="Cancel"
            icon={<X />}
            type="button"
            onClick={toggleEdit}
            disabled={cont.loading}
          />
        </>
      }
    >
      <form id={FORM_ID} onSubmit={onSubmit} noValidate>
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
