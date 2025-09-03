import type { Organization, OrganizationPhoto } from "../types/company";
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

export async function deletePhoto(id: string, image_name: string) {
  await http.delete(`/companies/${id}/image/${image_name}`);
}

export async function uploadPhoto(
  file: File,
  id: string
): Promise<OrganizationPhoto> {
  const fd = new FormData();
  fd.append("file", file, file.name);
  const res = await http.post<OrganizationPhoto>(`/companies/${id}/image`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}
