import { makeAutoObservable, runInAction } from "mobx";
import type { Organization } from "../types/company";
import {
  deleteOrganization,
  deletePhoto,
  editOrganization,
  getOrganization,
  uploadPhoto,
} from "../api";
import toast from "react-hot-toast";

export class OrganizationStore {
  organization: Organization | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get hasOrganization() {
    return !!this.organization;
  }

  setOrganization(org: Organization | null) {
    this.organization = org;
  }

  clear() {
    this.organization = null;
    this.error = null;
    this.loading = false;
  }

  async fetchOrganization(id: string) {
    this.loading = true;
    this.error = null;
    try {
      const data = await getOrganization(id);
      runInAction(() => {
        this.organization = data;
      });
    } catch {
      runInAction(() => {
        this.error = "Failed to load organization";
      });
      toast.error("Failed to fetch organization data, please try later");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async updateOrganization(patch: Partial<Organization>) {
    if (!this.organization) return;
    this.loading = true;
    this.error = null;
    try {
      const res = await editOrganization(patch, this.organization.id);
      runInAction(() => {
        this.organization = res;
      });
    } catch {
      runInAction(() => {
        this.error = "Failed to update organization";
      });
      toast.error(this.error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async deleteOrganization() {
    if (!this.organization) return;
    this.loading = true;
    this.error = null;

    try {
      await deleteOrganization(this.organization.id);
      runInAction(() => {
        this.organization = null;
      });
      toast.success("Organization deleted");
    } catch {
      runInAction(() => {
        this.error = "Failed to delete organization";
      });
      toast.error(this.error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async removePhoto(name: string) {
    const org = this.organization;
    if (!org) return;
    this.loading = true;
    this.error = null;

    try {
      await deletePhoto(org.id, name);
      runInAction(() => {
        org.photos = (org.photos ?? []).filter((p) => p.name !== name);
      });
    } catch {
      runInAction(() => {
        this.error = "Failed to delete image";
      });
      toast.error(this.error);
    } finally {
      this.loading = false;
    }
  }

  async addImage(file: File) {
    const org = this.organization;
    if (!org) return;
    this.loading = true;
    this.error = null;
    try {
      const photo = await uploadPhoto(file, org.id);
      runInAction(() => {
        (org.photos ??= []).push(photo);
      });
    } catch {
      runInAction(() => {
        this.error = "Failed to upload image";
      });
      toast.error(this.error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const organizationStore = new OrganizationStore();
export type OrganizationStoreType = OrganizationStore;
