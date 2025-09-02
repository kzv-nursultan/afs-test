import type { Organization } from "../types/company";
import { http } from "./client";

export async function listOrganizations(signal?: AbortSignal) {
  const { data } = await http.get<Organization[]>("/organizations", { signal });
  return data;
}

export async function getOrganization(id: string, signal?: AbortSignal) {
  const { data } = await http.get<Organization>(`/companies/${id}/`, {
    signal,
  });
  return data;
}

export async function createOrganization(payload: Partial<Organization>) {
  const { data } = await http.post<Organization>("/organizations", payload);
  return data;
}
