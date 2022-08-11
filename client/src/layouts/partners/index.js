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
import AddPartner from "./add";

// Data
import partnersTableData from "layouts/partners/data/partnersTableData";
import MDButton from "components/MDButton";

import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

function Partners() {
  const navigate = useNavigate();
  const { columns, rows, confirmation, rawData } = partnersTableData();
  const [openAddModel, setOpenAddModel] = useState(false);

  console.log(rawData);

  const handleDownload = (title, type) => {
    if (rawData.length > 0) {
      let data = [];
      let columns = [];
      if (type === "export") {
        rawData.map((row) =>
          data.push({
            id: row.id,
            nom: row.nom,
            course_num: row.course_num,
            createdAt: row.createdAt,
          })
        );
        columns = ["id", "nom", "course_num", "createdAt"];
      }
      if (type === "template") {
        columns = ["nom"];
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
    }
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
                    Partners
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
                      add partner
                    </MDButton>
                  </MDBox>
                  <MDBox ml={3} py={1.9} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={() => {
                        console.log("export");
                        handleDownload("allProviders", "export");
                      }}
                    >
                      Export
                    </MDButton>
                  </MDBox>

                  <MDBox ml={3} py={1.9} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={() => {
                        console.log("template");
                        handleDownload("addProviderTemplate", "template");
                      }}
                    >
                      Download Template
                    </MDButton>
                  </MDBox>

                  <MDBox ml={3} py={1.9} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={() => {
                        localStorage.setItem("uploadType", "providers");
                        navigate("/csv");
                      }}
                    >
                      upload csv
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
      {openAddModel && <AddPartner closeAddModel={setOpenAddModel} />}
      {confirmation}
    </DashboardLayout>
  );
}

export default Partners;
