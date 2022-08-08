import Dashboard from "layouts/dashboard";
import Companies from "layouts/companies";
import Partners from "layouts/partners";
import Courses from "layouts/courses";
import Sessions from "layouts/sessions";
import Quota from "layouts/quota";
import Requests from "layouts/requests";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

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
    name: "Companies",
    key: "companies",
    icon: <Icon fontSize="small">business</Icon>,
    route: "/companies",
    component: <Companies />,
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
    name: "Partners",
    key: "partners",
    icon: <Icon fontSize="small">handshake</Icon>,
    route: "/partners",
    component: <Partners />,
  },
  {
    type: "collapse",
    name: "Quota",
    key: "quota",
    icon: <Icon fontSize="small">table</Icon>,
    route: "/quota",
    component: <Quota />,
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
    type: "collapse",
    name: "Requests",
    key: "requests",
    icon: <Icon fontSize="small">help</Icon>,
    route: "/requests",
    component: <Requests />,
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
    name: "Register",
    key: "register",
    icon: <Icon fontSize="small">lock</Icon>,
    route: "/register",
    component: <SignUp />,
  },
];

export default routes;
