import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Companies from "layouts/companies";
import AddCompanies from "layouts/companies/add";

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
    icon: <Icon fontSize="small">work</Icon>,
    route: "/companies",
    component: <Companies />,
  },
  {
    type: "collapse",
    name: "Courses",
    key: "courses",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/courses",
    component: <Tables />,
  },
  {
    name: "Add companies",
    key: "Add comapnies",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/companies/add",
    component: <AddCompanies />,
  },
];

export default routes;
