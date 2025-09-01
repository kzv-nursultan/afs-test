import axios, { AxiosError, type AxiosInstance } from "axios";
import { API_URL, API_TIMEOUT, IS_DEV } from "../config";

const auth = {
  getToken: () => localStorage.getItem("token") || "", // replace with real source
  onUnauthorized: () => {
    // e.g., clear store and redirect to /login
    localStorage.removeItem("token");
  },
};

export const http: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // withCredentials: true, // enable if your API uses cookies
});

// --- Request interceptor: attach Authorization, dev logging
http.interceptors.request.use((config) => {
  const token = auth.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (IS_DEV) {
    console.debug(
      "[HTTP] →",
      config.method?.toUpperCase(),
      config.url,
      config.params || config.data
    );
  }
  return config;
});

http.interceptors.response.use(
  (res) => {
    if (IS_DEV) {
      console.debug("[HTTP] ←", res.status, res.config.url, res.data);
    }
    return res;
  },
  (err: AxiosError) => {
    const status = err.response?.status;
    if (status === 401) {
      auth.onUnauthorized();
    }
    return Promise.reject(err);
  }
);
