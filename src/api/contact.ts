import type { Contact } from "../types/contact";
import { http } from "./client";

export async function getContact(id: string, signal?: AbortSignal) {
  const { data } = await http.get<Contact>(`/contacts/${id}/`, { signal });
  return data;
}

export async function editContact(patch: Partial<Contact>, id: string) {
  const { data } = await http.patch<Contact>(`/contacts/${id}`, patch);
  return data;
}
