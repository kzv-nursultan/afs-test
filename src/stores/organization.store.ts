import { makeAutoObservable, runInAction } from "mobx";
import type { Organization } from "../types/company";
import { http } from "../api/client";
import { getOrganization } from "../api";
import toast from "react-hot-toast";

export class OrganizationStore {
  organization: Organization | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  // computed
  get hasOrganization() {
    return !!this.organization;
  }

  // actions
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

  // update and persist (PATCH), then update state
  async updateOrganization(patch: Partial<Organization>) {
    if (!this.organization) return;
    this.loading = true;
    this.error = null;
    try {
      const res = await http.patch<Organization>(
        `/organizations/${this.organization.id}`,
        patch
      );
      runInAction(() => {
        this.organization = res.data;
      });
    } catch {
      runInAction(() => {
        this.error = "Failed to update organization";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const organizationStore = new OrganizationStore();
export type OrganizationStoreType = OrganizationStore;
