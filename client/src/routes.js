import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Companies from "layouts/companies";
import AddCompanies from "layouts/companies/add";
import Basic from "layouts/authentication/sign-in/index";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Register",
    key: "register",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/register",
    component: <Basic />,
  },
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
    icon: <Icon fontSize="small">work</Icon>,
    route: "/companies",
    component: <Companies />,
  },
  {
    type: "collapse",
    name: "Add Companies",
    key: "companies",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/companies/add",
    component: <AddCompanies />,
  },
  {
    type: "collapse",
    name: "Courses",
    key: "courses",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/courses",
    component: <Tables />,
  },
];

export default routes;
