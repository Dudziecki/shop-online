import axios from "axios"
import { BASE_URL } from "@/common/constants/constants.ts"

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    // Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    // "API-KEY": import.meta.env.VITE_API_KEY,
  },
})

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});