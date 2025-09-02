import type { Organization } from "../types/company";
import { http } from "./client";

export async function getOrganization(id: string, signal?: AbortSignal) {
  const { data } = await http.get<Organization>(`/companies/${id}/`, {
    signal,
  });
  return data;
}
