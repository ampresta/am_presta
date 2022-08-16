/* eslint-disable react-hooks/exhaustive-deps */
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

// Hook
import { useEffect, useState } from "react";

// Data
import coursesTableData from "./data/coursesTableData";
import authService from "services/auth.service";
import { useNavigate } from "react-router-dom";

//csv
import Papa from "papaparse";
import CsvUploader from "examples/CsvUploader";
import { getAccessToken } from "utils/accessToken";

function Courses_am() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getAccessToken()) {
      navigate("/login");
    }
  }, []);

  const { columns, rows, rawData } = coursesTableData();

  const [openCsvUploader, setOpenCsvUploader] = useState(false);

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

  // console.log("societe");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!openCsvUploader && (
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

                <Grid
                  container
                  spacing={2}
                  display="flex"
                  justifyContent="space-between"
                >
                  <MDBox ml={3} pt={2} px={2} mt={3}></MDBox>

                  <MDBox pt={2} pr={4} mt={3} display="flex">
                    <MDBox mr={2}>
                      <MDButton
                        variant="gradient"
                        color="success"
                        size="small"
                        onClick={() => handleDownload("allCourses", "export")}
                        disabled={rawData.length === 0}
                      >
                        <Icon fontSize="big" color="light">
                          download
                        </Icon>
                        &nbsp; Export
                      </MDButton>
                    </MDBox>
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
      {openCsvUploader && (
        <CsvUploader
          closeUploadModel={setOpenCsvUploader}
          DownloadTemplate={handleDownload}
          type={"addCourseTemplate"}
        />
      )}
    </DashboardLayout>
  );
}

export default Courses_am;
