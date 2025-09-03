import React from "react";
import { StoresContext, defaultStores, type Stores } from "./store-context";

export function StoresProvider({
  children,
  value = defaultStores,
}: React.PropsWithChildren<{ value?: Stores }>) {
  return (
    <StoresContext.Provider value={value}>{children}</StoresContext.Provider>
  );
}
