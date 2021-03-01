const axios = require("axios");
const { api } = require("../urlConfig");

console.log("axios helper");
const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("mern-ecom-token")}`,
  },
});

export default axiosInstance;
