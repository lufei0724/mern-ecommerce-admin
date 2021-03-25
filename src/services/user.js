import axios from "../helper/axios";

export const signIn = async (user) => {
  try {
    const res = await axios.post("/auth/signin", user);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const signUp = async (user) => {
  try {
    const res = await axios.post("/auth/admin/signup", user);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const userService = { signIn, signUp };
export default userService;
