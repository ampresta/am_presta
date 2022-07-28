// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// @mui icons
import Icon from "@mui/material/Icon";

// Data
import authorsTableData from "layouts/companies/data/authorsTableData";
import MDButton from "components/MDButton";

function Companies() {
  const { columns, rows } = authorsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
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
                  Companies
                </MDTypography>
              </MDBox>

              <Grid container spacing={2}>
                <Grid xs={10} md={10}>
                  <MDBox ml={6} mt={4} py={2} px={2}>
                    <MDInput
                      variant="outlined"
                      label="Search here..."
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid xs={2} md={1}>
                  <MDBox mt={4} py={2}>
                    <MDButton variant="gradient" color="info">
                      <Icon fontSize="big">refresh</Icon>
                    </MDButton>
                  </MDBox>
                </Grid>
                </Grid>

              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Companies;
