import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_TMDB_API_URL,
  timeout: 10000,
  params: {
    api_key: process.env.EXPO_PUBLIC_TMDB_API_KEY,
    language: "vi-VN",
  },
});
