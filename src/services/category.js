import axios from "../helper/axios";

const getAll = async () => {
  try {
    const res = await axios.get("/category/list");
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const getLeaves = async () => {
  try {
    const res = await axios.get("/category/leaves");
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const addNew = async (data) => {
  try {
    const res = await axios.post("/category/add", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const categoryService = { getAll, getLeaves, addNew };
export default categoryService;
