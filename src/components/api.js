// src/api.js
import axios from "axios";

export const ROOT_URL =
  "http://localhost:5000";

const api = axios.create({
  baseURL: `${ROOT_URL}/api`,
});

export default api;