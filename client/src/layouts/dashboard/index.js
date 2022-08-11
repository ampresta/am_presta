import SocDash from "./soc_dash";
import AmDash from "./ampresta_dash";
import axios from "services/authAxios";
import React, { useState, useEffect } from "react";
import { getType } from "utils/APIRoutes";
import authService from "services/auth.service";

function Dashboard() {
  const [amdash, setAmdash] = useState(false);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const gettype = async () => {
      const { data } = await axios.get(getType, {
        // headers: {
        //   Authorization: `Bearer ${authService.getCurrentUser()}`,
        // },
      });
      if (data.status) {
        if (data.type === "Superadmin") {
          setAmdash(true);
        }
      }
      setloading(true);
      console.log(data);
    };

    gettype();
  }, []);
  return <>{loading && (amdash ? <AmDash /> : <SocDash />)}</>;
}
export default Dashboard;
