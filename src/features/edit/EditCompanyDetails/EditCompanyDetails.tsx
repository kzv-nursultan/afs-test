import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import type {
  BusinessEntity,
  Organization,
  OrganizationTypes,
} from "../../../types/company";
import { CompanyTypeMap } from "../../utils/companyTypeMapper";
import { useOrganizationStore } from "../../../stores/store-context";
import { Card } from "../../../components/Card/Card";
import { Button } from "../../../components/Button/Button";
import { DataList } from "../../../components/DataList/DataList";
import { TextField } from "../../../components/TextField/TextField";
import { Select } from "../../../components/Select/Select";
import { MultiSelect } from "../../../components/MultiSelect/MultiSelect";
import Check from "../../../icons/Check";
import X from "../../../icons/X";
import { FormInline } from "../../../components/FormInline/FormInline";
import DateField from "../../../components/DateField/DatePickerTextField";
import { ymdToISO } from "../../utils/isoDateFormatter";
import type { InputChangeEvent, ToggleEditProps } from "../../../types/shared";
import toast from "react-hot-toast";

type EntityItem = { value: BusinessEntity; label: BusinessEntity };
type OrganizationPatch = Partial<Omit<Organization, "contract">> & {
  contract?: Partial<Organization["contract"]>;
};

const FORM_ID = "company-details-form";

const businessEntityOptions: EntityItem[] = [
  { label: "Partnership", value: "Partnership" },
  { label: "Limited Liability Company", value: "Limited Liability Company" },
  { label: "Sole Proprietorship", value: "Sole Proprietorship" },
];

const companyTypeOptions = (
  Object.keys(CompanyTypeMap) as OrganizationTypes[]
).map((key) => ({
  label: CompanyTypeMap[key],
  value: key,
}));

const initialPatchData: OrganizationPatch = {
  contract: { no: "", issue_date: "" },
  businessEntity: "Partnership",
  type: [],
};

function CompanyDetailsBase({ toggleEdit }: ToggleEditProps) {
  const org = useOrganizationStore();
  const [patch, setPatch] = useState<OrganizationPatch>(initialPatchData);

  useEffect(() => {
    if (org.organization) {
      const o = org.organization;
      setPatch({
        contract: { ...o.contract },
        businessEntity: o.businessEntity,
        type: o.type,
      });
    }
  }, [org.organization]);

  const setField = <K extends keyof Organization>(
    key: K,
    val: Organization[K]
  ) => setPatch((prev) => ({ ...prev, [key]: val }));

  const patchContractSetter = (e: InputChangeEvent, isDate?: boolean) => {
    const { name, value } = e.target;
    setPatch((prev) => ({
      ...prev,
      contract: {
        ...(prev.contract ?? {}),
        [name]: isDate ? ymdToISO(value) : value,
      },
    }));
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const updatedData = {
      contract: {
        no: patch.contract?.no ?? "",
        issue_date: patch.contract?.issue_date ?? "",
      },
      businessEntity: patch.businessEntity!,
      type: patch.type ?? [],
    };
    await org.updateOrganization(updatedData).then(() => {
      toast.success("Company details updated successfully ");
      toggleEdit();
    });
  };

  return (
    <Card
      title="Company details"
      actions={
        <>
          <Button
            variant="ghost"
            label="Save changes"
            icon={<Check />}
            type="submit"
            form={FORM_ID}
            disabled={org.loading}
          />
          <Button
            variant="ghost"
            label="Cancel"
            icon={<X />}
            type="button"
            onClick={toggleEdit}
            disabled={org.loading}
          />
        </>
      }
    >
      <form id={FORM_ID} onSubmit={onSubmit} noValidate>
        <DataList
          items={[
            {
              label: "Agreement number:",
              value: (
                <FormInline
                  left={
                    <TextField
                      name="no"
                      value={patch.contract?.no ?? ""}
                      onChange={patchContractSetter}
                    />
                  }
                  rightLabel="Date:"
                  right={
                    <DateField
                      value={patch.contract?.issue_date}
                      name="issue_date"
                      onChange={(e) => patchContractSetter(e, true)}
                    />
                  }
                />
              ),
            },
            {
              label: "Business entity:",
              value: (
                <Select
                  value={patch.businessEntity}
                  options={businessEntityOptions}
                  onChange={(ent) =>
                    setField("businessEntity", ent as BusinessEntity)
                  }
                />
              ),
            },
            {
              label: "Company type",
              value: (
                <MultiSelect
                  value={patch.type ?? []}
                  options={companyTypeOptions}
                  onChange={(next) =>
                    setField("type", next as OrganizationTypes[])
                  }
                />
              ),
            },
          ]}
        />
      </form>
    </Card>
  );
}

const CompanyDetailsEdit = observer(CompanyDetailsBase);
export default CompanyDetailsEdit;
