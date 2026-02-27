import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/weatherapi", // ✅ Proxy path
  timeout: 10000,
});

export default axiosInstance;