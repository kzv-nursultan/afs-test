import { useContext } from "react";
import { StoresContext } from "./store-context";

export function useStores() {
  const ctx = useContext(StoresContext);
  if (!ctx) throw new Error("useStores must be used within <StoresProvider>");
  return ctx;
}

export const useOrganizationStore = () => useStores().organization;
export const useContactStore = () => useStores().contact;
