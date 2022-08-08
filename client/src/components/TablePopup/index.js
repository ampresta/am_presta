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
import DataTable from "examples/Tables/DataTable";

//import UseState
import { useState } from "react";

// @mui icons
import Icon from "@mui/material/Icon";

// Data
import sessionsTableData from "components/TablePopup/data/sessionsTableData";

//Add companies component
import AddSession from "./add";

function Sessions(props) {
  const { cours, collab } = props;
  const { ProvidersFilter, columns, rows, SubmitButton } = sessionsTableData(
    cours,
    collab
  );
  const [openAddModel, setOpenAddModel] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  // authService.login("abdoessordo", "123456789")
  console.log(SubmitButton);
  return (
    <DashboardLayout>
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
                    Choose a Session
                  </MDTypography>
                </MDBox>

                <Grid container spacing={2} display="flex" alignItems="center">
                  <MDBox ml={3} pt={2} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={setOpenAddModel}
                    >
                      <Icon fontSize="big">add</Icon>
                      add Session
                    </MDButton>
                  </MDBox>

                  <MDBox ml={3} pt={2} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="success"
                      size="small"
                      onClick={SubmitButton}
                    >
                      Submit
                    </MDButton>
                  </MDBox>
                  <MDBox pt={2} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={() => setOpenFilter(!openFilter)}
                      iconOnly
                    >
                      <Icon>search</Icon>
                    </MDButton>
                  </MDBox>
                </Grid>

                {openFilter && ProvidersFilter}

                <MDBox>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    canSearch
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      )}
      {openAddModel && <AddSession closeAddModel={setOpenAddModel} />}
    </DashboardLayout>
  );
}

export default Sessions;
