import { observer } from "mobx-react-lite";
import { Card } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";
import { DataList } from "../../components/DataList/DataList";
import { InlineDivider } from "../../components/InlineDivider/InlineDivider";
import { formatIsoToDMY } from "../utils/isoDateFormatter";
import { CompanyTypeMap } from "../utils/companyTypeMapper";
import Edit from "../../icons/Edit";
import type { ToggleEditProps } from "../../types/shared";
import { useOrganizationStore } from "../../stores/useStores";

function CompanyBase({ toggleEdit }: ToggleEditProps) {
  const org = useOrganizationStore();
  const organization = org.organization;

  return (
    <Card
      title="Company Details"
      actions={
        <Button
          variant="ghost"
          label="Edit"
          icon={<Edit />}
          onClick={toggleEdit}
        />
      }
    >
      {organization ? (
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
      ) : (
        <h1>Organization not found</h1>
      )}
    </Card>
  );
}

const CompanyInfo = observer(CompanyBase);
export default CompanyInfo;
