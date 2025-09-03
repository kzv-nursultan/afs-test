import { createContext } from "react";
import { OrganizationStore, organizationStore } from "./organization.store";
import { ContactStore, contactStore } from "./contact.store";

export type Stores = {
  organization: OrganizationStore;
  contact: ContactStore;
};

export const defaultStores: Stores = {
  organization: organizationStore,
  contact: contactStore,
};

export const StoresContext = createContext<Stores | undefined>(undefined);
