const axios = require("axios");
const { api } = require("../urlConfig");

const axiosInstance = axios.create({
  baseURL: api,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("mern-ecom-token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
