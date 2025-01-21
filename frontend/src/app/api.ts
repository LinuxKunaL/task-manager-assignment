import axios from "axios";

const URL = "http://localhost:3000";

const api = axios.create({
  baseURL: URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
