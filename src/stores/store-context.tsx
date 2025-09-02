/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";
import { OrganizationStore, organizationStore } from "./organization.store";
import { contactStore, type ContactStore } from "./contact.store";

type Stores = {
  organization: OrganizationStore;
  contact: ContactStore;
};

const defaultStores: Stores = {
  organization: organizationStore,
  contact: contactStore,
};

const StoresContext = createContext<Stores>(defaultStores);

export function StoresProvider({
  children,
  value = defaultStores,
}: React.PropsWithChildren<{ value?: Stores }>) {
  return (
    <StoresContext.Provider value={value}>{children}</StoresContext.Provider>
  );
}

export const useStores = () => useContext(StoresContext);
export const useOrganizationStore = () => useStores().organization;
export const useContactStore = () => useStores().contact;
