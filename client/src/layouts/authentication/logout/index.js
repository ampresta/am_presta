// react-router-dom components
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import authService from "services/auth.service";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    authService.logout();
  }, []);

  navigate("/login");
  return null;
}

export default Logout;
