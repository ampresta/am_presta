import { getType } from "utils/APIRoutes";
import axios from "services/authAxios";

import { useState, useEffect } from "react";

const UserGiver = async () => {
  let userType = "";
  const { data } = await axios.get(getType);
  if (data.status) {
    userType = data.type;
  }

  return { userType };
};

export default UserGiver;
