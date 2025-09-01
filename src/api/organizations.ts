import { http } from "./client";


export type Organization = {
  id: number;
  name: string;
  // ...add fields from your API
};

export async function listOrganizations(signal?: AbortSignal) {
  const { data } = await http.get<Organization[]>("/organizations", { signal });
  return data;
}

export async function getOrganization(id: number, signal?: AbortSignal) {
  const { data } = await http.get<Organization>(`/organizations/${id}`, {
    signal,
  });
  return data;
}

export async function createOrganization(payload: Partial<Organization>) {
  const { data } = await http.post<Organization>("/organizations", payload);
  return data;
}
