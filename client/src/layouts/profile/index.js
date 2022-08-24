import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Overview page components
import Header from "layouts/profile/components/Header";
import ProfileInfoCard from "./components/ProfileInfoCard";
import ChangePassword from "./components/ChangePassword";

function Overview() {
  const [tabValue, setTabValue] = useState("0");
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  console.log(tabValue);

  const paginate = [
    {
      label: "Profile",
      icon: (
        <Icon fontSize="small" sx={{ mt: -0.25 }}>
          person
        </Icon>
      ),
    },
    {
      label: "Password",
      icon: (
        <Icon fontSize="small" sx={{ mt: -0.25 }}>
          key
        </Icon>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar collab />
      <MDBox mb={3} />
      <Header>
        <TabContext value={tabValue}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              md={12}
              lg={3}
              sx={{ display: "flex", justifyContent: "center", mt: 5, mx: 1 }}
            >
              <AppBar position="static">
                <Tabs
                  orientation={"vertical"}
                  value={tabValue}
                  onChange={handleSetTabValue}
                >
                  {paginate.map((item, index) => (
                    <Tab
                      label={item.label}
                      icon={item.icon}
                      key={item.label}
                      value={index.toString()}
                    />
                  ))}
                </Tabs>
              </AppBar>
              <Divider orientation="vertical" sx={{ mx: 1, opacity: 0.8 }} />
            </Grid>

            <Grid item xs={12} md={12} lg={8} sx={{ display: "grid" }}>
              <TabPanel value="0">
                <ProfileInfoCard shadow={false} />
              </TabPanel>
              <TabPanel value="1">
                <ChangePassword shadow={false} />
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
