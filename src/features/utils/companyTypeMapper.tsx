import type { OrganizationTypes } from "../../types/company";

export const CompanyTypeMap = {
  funeral_home: "Funeral home",
  logistics_services: "Logistics services",
  burial_care_contractor: "Burial care contractor",
} as const satisfies Record<OrganizationTypes, string>;
