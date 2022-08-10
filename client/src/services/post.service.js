import axios from "axios";
import { jwtTestRoute } from "utils/APIRoutes";
import authHeader from "./auth-header";

const getAllPrivatePosts = () => {
  return axios.get(jwtTestRoute, { headers: authHeader() });
};

const postService = {
  getAllPrivatePosts,
};

export default postService;
