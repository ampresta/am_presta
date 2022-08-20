// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Ratings from "components/Ratings";

import BigDataImage from "assets/images/HCIA-BigData.jpg";
import Huawei from "assets/images/huawei-logo.png";

function Partners() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={1}>
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
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <MDTypography variant="h6" color="white">
              HCIA - Big Data
            </MDTypography>
          </MDBox>
          <Grid container rowSpacing={1}>
            <Grid item xs={12} lg={8}>
              <MDBox p={2} pt={3}>
                <img
                  src={BigDataImage}
                  alt=""
                  width="100%"
                  height="auto"
                  style={{
                    borderRadius: "12px",
                    border: "3px solid #39393f",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} lg={4}>
              <MDBox py={3}>
                <MDTypography
                  component="h4"
                  variant="h4"
                  color="dark"
                  sx={{
                    pt: 3,
                    pl: 2,
                    lineHeight: 1.2,
                    textAlign: "justify",
                  }}
                >
                  HCIA - Big Data
                </MDTypography>
                <MDTypography
                  component="p"
                  variant="caption"
                  color="dark"
                  sx={{
                    p: 2,
                    pr: 3,
                    pb: 1,
                    lineHeight: 1.6,
                    fontSize: "13px",
                    textAlign: "justify",
                  }}
                >
                  Launch your career as a back-end developer. Développez des
                  compétences professionnelles pour une carrière recherchée et
                  obtenez un diplôme délivré par Meta. Aucun diplôme ou
                  expérience préalable n'est requis pour commencer.
                </MDTypography>
                <MDBox px={1}>
                  <Ratings
                    rating={Math.floor(Math.random() * 2) + 4}
                    fontSize="medium"
                    color="warning"
                  />
                </MDBox>
                <MDBox p={2} display="flex" alignItems="center">
                  <MDButton variant="gradient" color="info">
                    Enroll Now
                  </MDButton>
                  <MDTypography
                    variant="caption"
                    color="dark"
                    sx={{ fontSize: "14px" }}
                    ml={3}
                  >
                    Enrolled By{" "}
                    <span style={{ fontWeight: "bold" }}>14 300</span>
                  </MDTypography>
                </MDBox>
                <MDBox
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  pt={3}
                >
                  <MDTypography variant="h6" color="dark" mr={2}>
                    Offered By
                  </MDTypography>
                  <img
                    src={Huawei}
                    alt=""
                    width="25%"
                    height="auto"
                    style={{
                      borderRadius: "16px",
                    }}
                  />
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>

          <MDBox></MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default Partners;
