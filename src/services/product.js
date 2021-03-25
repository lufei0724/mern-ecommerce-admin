import axios from "../helper/axios";

const getAll = async () => {
  try {
    const res = await axios.get("/product/all");
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const addNew = async (data) => {
  try {
    const res = await axios.post("/product/add", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const productService = { getAll, addNew };

export default productService;
