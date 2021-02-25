import axios from "../helper/axios";

export const signIn = async (user) => {
  try {
    const res = await axios.post("/auth/signin", user);
    return res.data;
  } catch (error) {
    return error.response.data.error;
    //console.log(error.response.data);
    //throw new Error(error.response.data.error);
  }
};

const userService = { signIn };
export default userService;
