import axios from "axios";

export const API_URL = "https://oswal-backend-q7dh.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
