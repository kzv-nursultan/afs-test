import type { ISODateTimeString } from "./shared";

type BusinessEntity =
  | "Partnership"
  | "Sole Proprietorship"
  | "Limited Liability Company";
  
type Status = "active" | "disabled" | string;

export type OrganizationTypes =
  | "funeral_home"
  | "logistics_services"
  | "burial_care_contractor";

export interface OrganizationPhoto {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: ISODateTimeString;
}

export interface Organization {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: BusinessEntity;
  contract: {
    no: string;
    issue_date: ISODateTimeString;
  };
  type: OrganizationTypes[];
  status: Status;
  photos: OrganizationPhoto[];
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}
