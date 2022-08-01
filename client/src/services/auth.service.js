import axios from "axios";
import { loginRoute } from "utils/APIRoutes";




const login = (username, password) => {
  return axios.post(loginRoute, {
      username,
      password,
    })
      .then((response) => {
      if (response.data.accesstoken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user")).accesstoken;
};

const authService = {
//   signup,
  login,
  logout,
  getCurrentUser,
};


export default authService;