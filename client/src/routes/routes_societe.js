import Dashboard from "layouts/dashboard/societe_dash";
import Requests from "layouts/requests";
import Departments from "layouts/departments";
import Sessions from "layouts/sessions";
import SessionsDetails from "layouts/sessionsDetails";
import SignIn from "layouts/authentication/sign-in";
import Logout from "layouts/authentication/logout";

// @mui icons
import Icon from "@mui/material/Icon";
import Collabs from "layouts/collabs";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Departments",
    key: "departments",
    icon: <Icon fontSize="small">apartment</Icon>,
    route: "/departments",
    component: <Departments />,
  },
  {
    type: "collapse",
    name: "Requests",
    key: "requests",
    icon: <Icon fontSize="small">help</Icon>,
    route: "/requests",
    component: <Requests />,
  },
  {
    type: "collapse",
    name: "Sessions",
    key: "sessions",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/sessions",
    component: <Sessions />,
  },
  {
    name: "details",
    key: "details",
    icon: <Icon fontSize="small">check</Icon>,
    route: "/sessions/details/:id",
    component: <SessionsDetails />,
  },
  {
    type: "collapse",
    name: "Collaborators",
    key: "collaborators",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/collaborators",
    component: <Collabs />,
  },
  {
    type: "collapse",
    name: "Login",
    key: "login",
    icon: <Icon fontSize="small">key</Icon>,
    route: "/login",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "Logout",
    icon: <Icon fontSize="small">lock</Icon>,
    route: "/logout",
    component: <Logout />,
  },
];

export default routes;
