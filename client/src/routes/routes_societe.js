import Dashboard from "layouts/dashboard/societe_dash";
import Requests from "layouts/requests";
import Departments from "layouts/departments/societe";
import Sessions from "layouts/sessions/societe";
import SessionsDetails from "layouts/sessionsDetails";
import SignIn from "layouts/authentication/sign-in";
import Logout from "layouts/authentication/logout";
import Courses from "layouts/courses/societe_courses";
import Collabs from "layouts/collabs/societe";
import Error404 from "layouts/error404";

// @mui icons
import Icon from "@mui/material/Icon";

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
    name: "Courses",
    key: "courses",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/courses",
    component: <Courses />,
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
    // type: "collapse",
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
  {
    name: "Error404",
    key: "Error404",
    icon: <Icon fontSize="small">error</Icon>,
    route: "/Error404",
    component: <Error404 />,
  },
];

export default routes;
