const axios = require("axios");
const { api } = require("../urlConfig");

const axiosInstance = axios.create({
  baseURL: api,
});

export default axiosInstance;
