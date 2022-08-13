// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

//import Hook
import { useState } from "react";

// @mui icons
import Icon from "@mui/material/Icon";

//import Add component
import AddCollab from "./add";

// Data
import collabsTableData from "layouts/collabs/data/collabsTableData";
import MDButton from "components/MDButton";

import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

function Collabs() {
  const navigate = useNavigate();
  const { columns, rows, confirmation, rawData } = collabsTableData();
  const [openAddModel, setOpenAddModel] = useState(false);

  console.log(rawData);

  const handleDownload = (title, type) => {
    let data = [];
    let columns = [];
    if (rawData.length > 0) {
      if (type === "export") {
        rawData.map((row) =>
          data.push({
            id: row.id,
            nom: row.nom,
            prenom: row.prenom,
            email: row.email,
            departement: row.departement,
            createdAt: row.createdAt,
          })
        );
        columns = ["id", "nom", "prenom", "email", "departement", "createdAt"];
      }
    }
    if (type === "template") {
      columns = ["nom", "prenom", "username", "email", "password"];
      let blank = {};
      columns.map((header) => (blank.header = ""));
      data.push(blank);
    }

    const csv = Papa.unparse(data, {
      header: true,
      delimiter: ", ",
      columns: columns,
    });
    const blob = new Blob([csv]);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob, { type: "text/plain" });
    a.download = `${title}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
                    Collaborateurs
                  </MDTypography>
                </MDBox>

                <Grid container spacing={2}>
                  <MDBox ml={3} py={1.9} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={setOpenAddModel}
                    >
                      <Icon fontSize="big" color="light">
                        add
                      </Icon>
                      &nbsp; add collaborator
                    </MDButton>
                  </MDBox>
                  <MDBox ml={3} py={1.9} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color={rawData.length === 0 ? "success" : "info"}
                      size="small"
                      onClick={() => {
                        handleDownload("allCollabs", "export");
                      }}
                    >
                      <Icon fontSize="big" color="light">
                        download
                      </Icon>
                      &nbsp; Export
                    </MDButton>
                  </MDBox>

                  <MDBox ml={3} py={1.9} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={() => {
                        handleDownload("addCollabsTemplate", "template");
                      }}
                    >
                      <Icon fontSize="big" color="light">
                        download
                      </Icon>
                      &nbsp; Download Template
                    </MDButton>
                  </MDBox>

                  <MDBox ml={3} py={1.9} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={() => {
                        localStorage.setItem("uploadType", "collabs");
                        navigate("/csv");
                      }}
                    >
                      <Icon fontSize="big" color="light">
                        upload
                      </Icon>
                      &nbsp; upload csv
                    </MDButton>
                  </MDBox>
                </Grid>

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
      {openAddModel && <AddCollab closeAddModel={setOpenAddModel} />}
      {confirmation}
    </DashboardLayout>
  );
}

export default Collabs;
