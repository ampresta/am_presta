import { getType } from "utils/APIRoutes";
import axios from "services/authAxios";

import { useState, useEffect } from "react";

const UserGiver = () => {
  const userType = JSON.parse(localStorage.getItem("user")).type;
  return { userType };
};

export default UserGiver;
