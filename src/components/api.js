// src/api.js
import axios from "axios";

export const ROOT_URL =
  "https://skyiot.skylabsapp.com";

const api = axios.create({
  baseURL: `${ROOT_URL}/api`,
});

export default api;
// https://skyiot.skylabsapp.com
// "http://localhost:5000";