// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "./DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import PieChart from "examples/Charts/PieChart";

// Data
import sessionsDetailsTableData from "layouts/sessionsDetails/data/sessionsDetailsTableData";
//  React
import { useState, useEffect } from "react";
import { useMaterialUIController } from "context";

import MDBadge from "components/MDBadge";
// axios
import axios from "services/authAxios";
import { SessionGraph } from "utils/APIRoutes";
import { useParams } from "react-router-dom";
import { baseURL } from "utils/APIRoutes";

function Partners() {
  const { columns, rows } = sessionsDetailsTableData();

  const [graph, setGraph] = useState([]);

  const [loading, setLoading] = useState(false);
  const [controller] = useMaterialUIController();
  const { updater } = controller;

  let { id } = useParams();
  useEffect(() => {
    const getGraph = async () => {
      const { data } = await axios.post(SessionGraph, { sess: id });
      setGraph(data);
      setLoading(true);
      console.log(data);
    };
    getGraph();
  }, [updater]);

  const data = {
    labels: ["Cerified", "Finished Course", "Not completed"],
    datasets: {
      data: [
        loading ? graph.session.certifs_count : 0,
        loading ? graph.session.fincourse_count : 0,

        loading
          ? graph.session.collab_count -
            graph.session.fincourse_count -
            graph.session.certifs_count
          : 0,
      ],
    },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar title={loading && graph.session.nom} />
      {
        <MDBox pt={6} pb={1}>
          <Grid container spacing={2} rowSpacing={2}>
            <Grid item xs={12} md={7} lg={9}>
              <Card>
                <MDAvatar
                  src={loading && `${baseURL}/${graph.session.Cour.image}`}
                  size="xl"
                  sx={{
                    border: "3.5px solid #227be9",
                    ml: 4,
                    mt: 1,
                  }}
                />
                <MDBox
                  mx={2}
                  mt={-6}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white" ml={11}>
                    {loading && graph.session.nom}
                  </MDTypography>
                </MDBox>

                <MDBox>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    canSearch
                  />
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={5} lg={3}>
              <MDBox>
                <Card>
                  <PieChart
                    icon={{ color: "info", component: "pie_chart" }}
                    title="Session Stats"
                    date="just updated"
                    chart={data}
                  />
                  <MDBox
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <MDBox>
                      <MDBadge color="success" />
                      &nbsp;
                      <MDTypography variant="caption">Success</MDTypography>
                    </MDBox>
                    <MDBox>
                      <MDBadge color="primary" />
                      &nbsp;
                      <MDTypography variant="caption">Failure</MDTypography>
                    </MDBox>
                    <MDBox>
                      <MDBadge color="dark" />
                      &nbsp;
                      <MDTypography variant="caption">
                        Not completed
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      }
    </DashboardLayout>
  );
}

export default Partners;

// const data = {
//   labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//   datasets: {
//     backgroundColor: "transparent",
//     borderColor: "",
//     color: "success",
//     data: [30, 90, 40, 0, 290, 290, 340, 230, 400],
//     fill: true,
//     label: "Referral",
//     maxBarThickness: 6,
//     pointBackgroundColor: "#344767",
//     pointRadius: 3,
//   },
// };
