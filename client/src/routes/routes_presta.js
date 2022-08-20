import Dashboard from "layouts/dashboard/ampresta_dash";
import Companies from "layouts/companies";
import Partners from "layouts/partners";
import Courses from "layouts/courses/ampresta_courses";
import Collabs from "layouts/collabs/ampresta";
import Vouchers from "layouts/vouchers/ampresta";
import Quota from "layouts/quota";
import SignIn from "layouts/authentication/sign-in";
import Logout from "layouts/authentication/logout";
import Sessions from "layouts/sessions/ampresta";
import Departments from "layouts/departments/ampresta";
import Error404 from "layouts/error404";

import ResetPassword from "layouts/authentication/reset-password";

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
    name: "Departments",
    key: "departments",
    icon: <Icon fontSize="small">apartment</Icon>,
    route: "/departments",
    component: <Departments />,
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
    name: "Collaboraters",
    key: "collaboraters",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/collaboraters",
    component: <Collabs />,
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
    type: "collapse",
    name: "Vouchers",
    key: "vouchers",
    icon: <Icon fontSize="small">local_activity</Icon>,
    route: "/vouchers",
    component: <Vouchers />,
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
  {
    name: "Reset",
    key: "reset",
    route: "/reset",
    component: <ResetPassword />,
  },
  {
    name: "Error404",
    key: "Error404",
    route: "/Error404",
    component: <Error404 />,
  },
];

export default routes;
