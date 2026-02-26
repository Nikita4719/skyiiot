// src/api.js
import axios from "axios";

export const ROOT_URL =
  "https://nodes-priority-payday-sql.trycloudflare.com";

const api = axios.create({
  baseURL: `${ROOT_URL}/api`,
});

export default api;