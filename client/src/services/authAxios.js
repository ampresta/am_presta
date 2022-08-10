import axios from "axios";
import { refreshRoute } from "utils/APIRoutes";
import authService from "./auth.service";

export const axiosAuth = axios.create();

axiosAuth.interceptors.request.use(
  async function (config) {
    config.headers.authorization = `Bearer ${authService.getCurrentUser()}`;
    config.withCredentials = true;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAuth.interceptors.response.use(
  async function (response) {
    const { data } = response;
    if (!data.status && data.err.name === "TokenExpiredError") {
      const data = await axiosAuth.get(refreshRoute);
      console.log("eee");
      console.log(data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosAuth;
