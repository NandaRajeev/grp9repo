import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

// Base axios instance — no static token since Clerk tokens are dynamic
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;

// Hook that returns an API instance pre-loaded with the current Clerk token.
// Use this inside React components instead of importing `api` directly.
export function useApi() {
  const { getToken } = useAuth();

  const authApi = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  authApi.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return authApi;
}
