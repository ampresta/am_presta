import Dashboard from "layouts/dashboard/collab_dash";
import Sessions from "layouts/sessions/collab";
import SessionsDetails from "layouts/sessionsDetails";
import SignIn from "layouts/authentication/sign-in";
import Logout from "layouts/authentication/logout";
import Vouchers from "layouts/vouchers/collab";
import Error404 from "layouts/error404";
import CatalogueCourses from "layouts/courses catalogue";
import CoursesDetails from "layouts/courses catalogue/chooseCourse";
import MyRequests from "layouts/MyRequests";
import Profile from "layouts/profile";

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
    name: "Catalogue",
    key: "catalogue",
    icon: <Icon fontSize="small">apps</Icon>,
    route: "/catalogue",
    component: <CatalogueCourses />,
  },
  {
    type: "collapse",
    name: "My Sessions",
    key: "mySessions",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/mySessions",
    component: <Sessions />,
  },
  {
    name: "details",
    key: "details",
    route: "/sessions/details/:id",
    component: <SessionsDetails />,
  },
  {
    type: "collapse",
    name: "My Vouchers",
    key: "myVouchers",
    icon: <Icon fontSize="small">local_activity</Icon>,
    route: "/myVouchers",
    component: <Vouchers />,
  },
  {
    type: "collapse",
    name: "My Requests",
    key: "myRequests",
    icon: <Icon fontSize="small">warning</Icon>,
    route: "/myRequests",
    component: <MyRequests />,
  },
  {
    type: "collapse",
    name: "profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
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
    name: "Login",
    key: "login",
    route: "/login",
    component: <SignIn />,
  },
  {
    name: "Error404",
    key: "Error404",
    route: "/Error404",
    component: <Error404 />,
  },
  {
    name: "details",
    key: "details",
    route: "/catalogue/details/:id",
    component: <CoursesDetails />,
  },
];

export default routes;
