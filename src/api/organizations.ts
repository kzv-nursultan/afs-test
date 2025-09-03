import type { Organization } from "../types/company";
import { http } from "./client";

export async function getOrganization(id: string, signal?: AbortSignal) {
  const { data } = await http.get<Organization>(`/companies/${id}`, {
    signal,
  });
  return data;
}

export async function editOrganization(
  patch: Partial<Organization>,
  id: string
) {
  const { data } = await http.patch<Organization>(`/companies/${id}`, patch);
  return data;
}

export async function deleteOrganization(id: string) {
  await http.delete(`/companies/${id}`);
}
