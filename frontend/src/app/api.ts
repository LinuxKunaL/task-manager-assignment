import axios from "axios";

const URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.error) {
      alert(error.response.data.error);
      window.location.href = "/login";
      localStorage.removeItem("token");
      return;
    }
    return error.response;
  }
);

export default api;
