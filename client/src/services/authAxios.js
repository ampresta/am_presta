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
    try {
      if (!data.status && data.err !== null) {
        if (data.err.name === "TokenExpiredError") {
          console.log("I'am here");
          const data = await axiosAuth.get(refreshRoute);
          console.log(data.data);
          if (data.data.accesstoken) {
            localStorage.setItem("user", JSON.stringify(data.data));
          }
        }
      }
    } catch (err) {
      console.log(err);
      return response;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosAuth;
