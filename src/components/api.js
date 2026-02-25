// src/api.js
import axios from "axios";

export const ROOT_URL =
  "https://enables-constitutional-incident-shark.trycloudflare.com";

const api = axios.create({
  baseURL: `${ROOT_URL}/api`,
});

export default api;