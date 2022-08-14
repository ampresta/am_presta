import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";

import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Logo
import AmpLogo from "assets/images/amp-logo.png";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDarkMode } from "context";

// import UserGiver from "utils/UserType";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();

  const { layout, sidenavColor, darkMode } = controller;

  const { pathname } = useLocation();

  // Activate darkMode
  const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {}, [darkMode]);

  // const user = UserGiver();

  // let routes = [];

  // if (user.userType === "Societe") {
  //   routes = routes_societe;
  // } else if (user.userType === "Superadmin") {
  //   routes = routes_ampresta;
  // }

  // console.log(user);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  const darkModeToggle = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="6.8rem"
      width="1.8rem"
      bgColor={darkMode ? "white" : "info"}
      shadow="sm"
      borderRadius="15px"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={999}
      color={darkMode ? "dark" : "white"}
      sx={{ cursor: "pointer" }}
      lineHeight={1}
    >
      <Icon fontSize="small">light_mode</Icon>
      <Switch
        checked={darkMode}
        onChange={handleDarkMode}
        sx={{ transform: "rotate(90deg)", m: "8px" }}
      />
      <Icon fontSize="small">dark_mode</Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav color={sidenavColor} brand={AmpLogo} routes={routes} />
          {darkModeToggle}
        </>
      )}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
