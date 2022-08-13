import { getType } from "utils/APIRoutes";
import axios from "services/authAxios";

import { useState, useEffect } from "react";

const UserGiver = () => {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const gettype = async () => {
      const { data } = await axios.get(getType);
      if (data.status) {
        setUserType(data.type);
      }
    };

    gettype();
  }, []);

  return { userType };
};

export default UserGiver;
