import { userCompanyRoute } from "utils/APIRoutes";
import { loginRoute } from "utils/APIRoutes";
import axios from "./authAxios";
const login = (username, password) => {
  return axios
    .post(loginRoute, {
      username,
      password,
    })
    .then(async (response) => {
      if (response.data.accesstoken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        if (response.data.type === "Societe") {
          const { data } = await axios.post(userCompanyRoute, {
            UserId: response.data.userId,
          });
          localStorage.setItem("companyID", data.societe);
        }
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("companyID");
};

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")).accesstoken;
  } catch {
    return false;
  }
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
