import { useEffect, useRef, useState } from "react";

// react-router components
import { Link, useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setChangedNotif,
} from "context";

import { io } from "socket.io-client";
import axios from "services/authAxios";
import { addNotifRoute } from "utils/APIRoutes";
import { getNotifsRoute } from "utils/APIRoutes";

function DashboardNavbar({ absolute, light, isMini, collab }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, darkMode, changedNotif } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  const socket = useRef();
  const [notifs, setNotifs] = useState(0);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={() => setOpenMenu(false)}
      sx={{ mt: 2 }}
    >
      {collab && (
        <Link to="/profile">
          <NotificationItem icon={<Icon>person</Icon>} title="My profile" />
        </Link>
      )}
      <Link to="/logout">
        <NotificationItem icon={<Icon>logout</Icon>} title="logout" />
      </Link>
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  // Get initial Notifs no ws
  useEffect(() => {
    const getNotifs = async () => {
      const { data } = await axios.post(getNotifsRoute);
      setChangedNotif(dispatch, data.length);
    };
    getNotifs();
  }, []);

  // Update Notifs using ws
  useEffect(() => {
    socket.current = io("http://127.0.0.1:8000");
  }, [socket]);

  useEffect(() => {
    socket.current.on("notif", async () => {
      console.log("notifs emited");
      const { data } = await axios.post(getNotifsRoute);
      setChangedNotif(dispatch, data.length);
    });
  }, [socket]);

  return (
    <AppBar
      position={"sticky"}
      color="inherit"
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
    >
      <Toolbar>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }}>
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={light}
          />
        </MDBox>
        {isMini ? null : (
          <MDBox>
            <MDBox color={light ? "white" : "inherit"}>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={(event) => setOpenMenu(event.currentTarget)}
                style={{ position: "relative" }}
              >
                <Icon style={{ zIndex: 1 }} sx={iconsStyle}>
                  notifications
                </Icon>
                <span
                  style={{
                    position: "absolute",
                    top: "0",
                    rigth: "0",
                    width: "20px",
                    height: "20px",
                    zIndex: 100,
                    background: "red",
                    color: "wheat",
                    borderRadius: "50%",
                    transform: "translate(8px, -8px)",
                  }}
                >
                  {changedNotif}
                </span>
              </IconButton>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={(event) => setOpenMenu(event.currentTarget)}
              >
                <Icon sx={iconsStyle}>account_circle</Icon>
              </IconButton>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
  collab: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  collab: PropTypes.bool,
};

export default DashboardNavbar;
