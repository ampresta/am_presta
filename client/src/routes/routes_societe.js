import Dashboard from "layouts/dashboard/societe_dash";
import Requests from "layouts/requests";
import Departments from "layouts/departments/societe";
import Sessions from "layouts/sessions/societe";
import SessionsDetails from "layouts/sessionsDetails";
import SignIn from "layouts/authentication/sign-in";
import Logout from "layouts/authentication/logout";
import Courses from "layouts/courses/societe_courses";
import Collabs from "layouts/collabs/societe";
import Vouchers from "layouts/vouchers/societe";
import Error404 from "layouts/error404";

// @mui icons
import Icon from "@mui/material/Icon";
import Loading from "examples/Loading";

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
    icon: <Icon fontSize="small">school</Icon>,
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
    name: "Vouchers",
    key: "vouchers",
    icon: <Icon fontSize="small">local_activity</Icon>,
    route: "/vouchers",
    component: <Vouchers />,
  },
  {
    name: "Login",
    key: "login",
    route: "/login",
    component: <SignIn />,
  },
  {
    type: "divider",
  },
  {
    type: "collapse",
    name: "Logout",
    key: "Logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
    component: <Logout />,
  },
  {
    type: "divider",
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
