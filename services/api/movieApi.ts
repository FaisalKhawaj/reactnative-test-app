import axios from "axios";

const TMDB_TIMEOUT = 10000;

export const movieApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: TMDB_TIMEOUT,
  headers: {
    accept: "application/json",
  },
});

// Attach MOVIES Bearer token got from API Docs
movieApi.interceptors.request.use((config) => {
  const token = process.env.EXPO_PUBLIC_ACCESS_TOKEN;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
