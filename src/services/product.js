import axios from "../helper/axios";

const getAll = async () => {
  try {
    const res = await axios.get("/product/all");
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const productService = { getAll };

export default productService;
