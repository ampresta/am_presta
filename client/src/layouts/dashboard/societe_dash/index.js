// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

//component
import PopularCoursesList from "examples/Lists/PopularCoursesList";

// Data
import authorsTableData from "./data/companiesTableData";
import popularCoursesListData from "./data/popularCoursesListData";
import DataTable from "examples/Tables/DataTable";

// Hooks
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Axios
import axios from "services/authAxios";

// Endpoints
import { SocCardsRoute } from "utils/APIRoutes";
import PolarChart from "examples/Charts/PolarChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";

function Dashboard() {
  const { columns, rows } = authorsTableData();

  const [sessionsCount, setSessionsCount] = useState(0);
  const [collaboratorsCount, setCollabsCount] = useState(0);

  useEffect(() => {
    console.log("3la slamto");

    const fetchCards = async (model) => {
      const { data } = await axios.post(SocCardsRoute, { model });
      switch (model) {
        case "session":
          setSessionsCount(data.count);
          break;

        case "collab":
          setCollabsCount(data.count);
          break;

        default:
          break;
      }
    };

    fetchCards("session").catch(console.error);
    fetchCards("challenge").catch(console.error);
    fetchCards("collab").catch(console.error);
  }, []);

  const data = {
    labels: ["Huawei", "Juniper", "Oracle", "Cisco"],
    datasets: {
      color: "success",
      data: [30, 90, 40, 10],
      fill: true,
      label: "Referral",
      maxBarThickness: 6,
      pointBackgroundColor: "#344767",
      pointRadius: 3,
    },
  };

  const values = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Courses",
        color: "success",
        data: [50, 40, 300, 220, 500, 250, 400, 230, 400],
        tension: 0,
        pointRadius: 3,
        borderWidth: 4,
        backgroundColor: "transparent",
        fill: true,
        pointBackgroundColor: "#1A73E8",
        borderColor: "#1A73E8",
        maxBarThickness: 6,
      },
      {
        label: "Total Sessions",
        color: "info",
        data: [30, 90, 40, 140, 290, 290, 340, 230, 200],
        tension: 0,
        pointRadius: 3,
        borderWidth: 4,
        backgroundColor: "transparent",
        fill: true,
        pointBackgroundColor: "#344767",
        borderColor: "#344767",
        maxBarThickness: 6,
      },
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3}>
        <Grid container spacing={2} rowSpacing={3}>
          <Grid item xs={12} md={12} lg={4}>
            <PolarChart
              icon={{ color: "success", component: "pie_chart" }}
              title="My Quota"
              chart={data}
            />
          </Grid>
          <Grid container item columnSpacing={2} rowSpacing={1} xs={12} lg={8}>
            <Grid item xs={12} md={12} lg={6}>
              <MDBox mb={1}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="business"
                  title="Total Sessions"
                  count={sessionsCount}
                  percentage={{
                    color: "success",
                    amount: "+55%",
                    label: "than lask month",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <MDBox mb={1}>
                <ComplexStatisticsCard
                  icon="groups"
                  title="Total Collaborators"
                  color="info"
                  count={collaboratorsCount}
                  percentage={{
                    color: "success",
                    amount: "+12%",
                    label: "than last month",
                  }}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={12} lg={8}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-1}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="primary"
                  borderRadius="lg"
                  coloredShadow="primary"
                  display="flex"
                  justifyContent="space-between"
                >
                  <MDTypography variant="h6" color="white">
                    Best Collaborators
                  </MDTypography>
                  <Link to={"/collaborators"}>
                    <MDTypography
                      sx={{ textDecoration: "underline" }}
                      fontSize={14}
                      fontWeight={"bold"}
                      color="light"
                    >
                      Show All
                    </MDTypography>
                  </Link>
                </MDBox>
                <MDBox pt={2}>
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

            <Grid item xs={12} md={12} lg={4}>
              <PopularCoursesList
                title="Recent courses"
                profiles={popularCoursesListData()}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <DefaultLineChart chart={values}></DefaultLineChart>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
