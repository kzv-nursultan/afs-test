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

  async updateOrganization(patch: Partial<Organization>) {
    if (!this.organization) return;
    this.loading = true;
    this.error = null;
    try {
      const res = await http.patch<Organization>(
        `/companies/${this.organization.id}`,
        patch
      );
      runInAction(() => {
        this.organization = res.data;
      });
      toast.success("Organization name successfully changed");
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
      await http.delete<Organization>(`/companies/${this.organization.id}`);
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
}

export const organizationStore = new OrganizationStore();
export type OrganizationStoreType = OrganizationStore;
