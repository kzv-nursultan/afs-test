import type { ISODateTimeString } from "./shared";

export interface Contact {
  id: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}
