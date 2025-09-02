import { makeAutoObservable, runInAction } from "mobx";
import type { Contact } from "../types/contact";
import { getContact } from "../api/contact";
import toast from "react-hot-toast";

export class ContactStore {
  contact: Contact | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get hasContact() {
    return !!this.contact;
  }

  setContact(contact: Contact) {
    this.contact = contact;
  }

  clear() {
    this.contact = null;
    this.error = null;
    this.loading = false;
  }

  async fetchContact(id: string) {
    this.loading = true;
    this.error = null;
    try {
      const data = await getContact(id);
      runInAction(() => {
        this.contact = data;
      });
    } catch {
      runInAction(() => {
        this.error = "Failed to load contact";
      });
      toast.error("Failed to fetch contact data, please try later");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const contactStore = new ContactStore();
export type ContactStoreType = ContactStore;
