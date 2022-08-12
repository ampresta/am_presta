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

// @mui icons
import Icon from "@mui/material/Icon";

//Add companies component
import AddCompanies from "./add";

// Hook
import { useEffect, useState } from "react";

// Data
import coursesTableData from "layouts/courses/data/coursesTableData";
import authService from "services/auth.service";
import { useNavigate } from "react-router-dom";

//csv
import Papa from "papaparse";

function Courses() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!authService.getCurrentUser()) {
      navigate("/login");
    }
  }, []);
  const { columns, rows, confirmation, rawData } = coursesTableData();

  const [openAddModel, setOpenAddModel] = useState(false);

  const handleDownload = (title, type) => {
    let data = [];
    let columns = [];
    if (rawData.length > 0) {
      if (type === "export") {
        rawData.map((row) =>
          data.push({
            nom: row.nom,
            provider: row.Provider.nom,
            description: row.description,
            collabs: row.collabs,
            sessions: row.sessions,
            createdAt: row.createdAt,
          })
        );
        columns = [
          "nom",
          "provider",
          "description",
          "collabs",
          "sessions",
          "createdAt",
        ];
      }
    }
    if (type === "template") {
      columns = ["nom", "providerID", "description"];
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
                    Courses
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
                      <Icon fontSize="big">add</Icon>
                      add Course
                    </MDButton>
                  </MDBox>

                  <MDBox ml={3} py={1.9} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color={rawData.length === 0 ? "success" : "info"}
                      size="small"
                      onClick={() => handleDownload("allCourses", "export")}
                    >
                      Export
                    </MDButton>
                  </MDBox>

                  <MDBox ml={3} py={1.9} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={() =>
                        handleDownload("addCourseTemplate", "template")
                      }
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
                        localStorage.setItem("uploadType", "courses");
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
      {openAddModel && <AddCompanies closeAddModel={setOpenAddModel} />}

      {confirmation}
    </DashboardLayout>
  );
}

export default Courses;
