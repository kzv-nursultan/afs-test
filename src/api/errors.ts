/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

export class ApiError extends Error {
  status?: number;
  code?: string;
  data?: unknown;

  constructor(message: string, status?: number, code?: string, data?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

export function toApiError(err: any): ApiError {
  if (axios.isAxiosError(err)) {
    const ae = err as AxiosError<any>;
    const status = ae.response?.status;
    const code = ae.code;
    const data = ae.response?.data;
    const msg =
      (typeof data === "object" && data && (data.message || data.error)) ||
      ae.message ||
      "Request failed";
    return new ApiError(msg, status, code, data);
  }
  return new ApiError(err?.message ?? "Unknown error");
}
