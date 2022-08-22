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
import { useEffect, useState } from "react";

// @mui icons
import Icon from "@mui/material/Icon";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

// Data
import sessionsTableData from "./data/sessionsTableData";

//Add companies component
import AddProof from "./addProof";

function Sessions() {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const [sessionId, setSessionId] = useState(0);
  const { columns, rows, confirmation, ProvidersFilter } =
    sessionsTableData(setSessionId);

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
                    Sessions List
                  </MDTypography>
                </MDBox>

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

      <AddProof sessionId={sessionId} />
      {/* {openAddModel && <AddSession closeAddModel={setOpenAddModel} />} */}
      {confirmation}
    </DashboardLayout>
  );
}

export default Sessions;
