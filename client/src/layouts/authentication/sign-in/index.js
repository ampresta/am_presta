import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import authService from "services/auth.service";
import { getAccessToken } from "utils/accessToken";

import {
  useMaterialUIController,
  setAccountType,
  setChangedPassword,
} from "context";

function Basic(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [controller, dispatch] = useMaterialUIController();
  const { loadingType } = controller;

  useEffect(() => {
    if (getAccessToken() !== "") {
      console.log(state);
      if (
        state &&
        state.prevPath &&
        state.prevPath !== "/" &&
        state.prevPath !== "/login"
      ) {
        navigate(state.prevPath);
      } else navigate("/dashboard");
    }
  }, [loadingType]);

  const [rememberMe, setRememberMe] = useState(false);
  const [formDetails, setFromDetail] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    const { username, password } = formDetails;
    event.preventDefault();
    const data = await authService.login(username, password);
    if (data.status) {
      setAccountType(dispatch, data.type);
      setChangedPassword(dispatch, data.changedpass);
      navigate("/dashboard");
    }
  };

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setFromDetail((prev) => ({ ...prev, [key]: value }));
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          pb={4}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox
            component="form"
            role="form"
            onSubmit={(event) => handleSubmit(event)}
          >
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="username"
                fullWidth
                name="username"
                variant="standard"
                onChange={(event) => handleChange(event)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                name="password"
                variant="standard"
                onChange={(event) => handleChange(event)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don't have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Contact Ampresta
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
