import axios from "axios";
import { create } from "zustand";

export const axiosInstance = axios.create ({
  baseURL: import.meta.env.MODE=== "development" ?"http://localhost:5001/api": "/api",
  withCredentials: true,
})