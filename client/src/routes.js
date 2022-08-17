import TypeGiver from "utils/UserType";
import SignIn from "layouts/authentication/sign-in";
import Logout from "layouts/authentication/logout";
import routes_societe from "routes/routes_societe";
import routes_ampresta from "routes/routes_presta";

// @mui icons
import Icon from "@mui/material/Icon";
function Route(type) {
  let normalroutes = [
    // {
    //   type: "collapse",
    //   name: "Dashboard",
    //   key: "dashboard",
    //   icon: <Icon fontSize="small">dashboard</Icon>,
    //   route: "/dashboard",
    //   component: <Dashboard />,
    // },
    // {
    //   type: "collapse",
    //   name: "Companies",
    //   key: "companies",
    //   icon: <Icon fontSize="small">business</Icon>,
    //   route: "/companies",
    //   component: <Companies />,
    // },
    // {
    //   type: "collapse",
    //   name: "Courses",
    //   key: "courses",
    //   icon: <Icon fontSize="small">school</Icon>,
    //   route: "/courses",
    //   component: <Courses />,
    // },
    // {
    //   type: "collapse",
    //   name: "Partners",
    //   key: "partners",
    //   icon: <Icon fontSize="small">handshake</Icon>,
    //   route: "/partners",
    //   component: <Partners />,
    // },
    // {
    //   type: "collapse",
    //   name: "Quota",
    //   key: "quota",
    //   icon: <Icon fontSize="small">table</Icon>,
    //   route: "/quota",
    //   component: <Quota />,
    // },
    // {
    //   type: "collapse",
    //   name: "Collaboraters",
    //   key: "collaboraters",
    //   icon: <Icon fontSize="small">groups</Icon>,
    //   route: "/collaboraters",
    //   component: <Collabs />,
    // },
    // {
    //   type: "collapse",
    //   name: "Sessions",
    //   key: "sessions",
    //   icon: <Icon fontSize="small">groups</Icon>,
    //   route: "/sessions",
    //   component: <Sessions />,
    // },
    // {
    //   name: "csv",
    //   key: "csv",
    //   icon: <Icon fontSize="small">apartment</Icon>,
    //   route: "/csv",
    //   component: <Csv />,
    // },

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
  let routes = normalroutes;
  if (type === "Societe") {
    routes = routes_societe;
  } else if (type === "Superadmin") {
    routes = routes_ampresta;
  }
  return routes;
}
export default Route;
