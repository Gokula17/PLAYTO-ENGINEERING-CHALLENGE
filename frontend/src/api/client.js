import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/", // ← TRAILING SLASH IS REQUIRED
});

export default api;
