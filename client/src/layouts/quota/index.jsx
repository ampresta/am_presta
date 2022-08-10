// @mui material components
import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AddQuota from "./edit";

// import CardComponent
import DefaultProjectCard from "./components/DefaultProjectCard";

// Hook
import { useEffect, useState } from "react";

// Images
// import Oracle from "assets/images/oracle-logo.jpg";
import axios from "services/authAxios";
import { AllQuotaSocRoute } from "utils/APIRoutes";

function Overview() {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [allCompanies, setAllCompanies] = useState([]);

  useEffect(() => {
    const getAllCompanies = async () => {
      const { data } = await axios.get(AllQuotaSocRoute);
	    console.log(data);
      setAllCompanies((prev) => data.msg);
      return;
    };

    getAllCompanies();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {!openAddModel && (
        <MDBox pt={6} pb={1}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Campanies' Quota
                  </MDTypography>
                </MDBox>

                <MDBox p={3}>
                  <Grid container spacing={2}>
                    {allCompanies.map((company) => (
                      <Grid item xs={12} md={6} xl={3} key={company.id}>
                        <DefaultProjectCard
                          companyID={company.id}
                          image={company.image}
                          title={company.name}
                          openAddModel={setOpenAddModel}
                          quota={company.Quota}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      )}
      {openAddModel && <AddQuota openAddModel={setOpenAddModel} />}
    </DashboardLayout>
  );
}

export default Overview;
