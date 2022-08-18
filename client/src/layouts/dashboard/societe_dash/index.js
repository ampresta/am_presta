// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

//component
import PopularCoursesList from "examples/Lists/PopularCoursesList";

// Data
import authorsTableData from "./data/companiesTableData";
import CompaniesGraph from "./data/reportsBarChartCompaniesData";
import CoursesGraph from "./data/reportsLineChartCoursesData";
import PartnersGraph from "./data/reportsLineChartPartnersData";
import popularCoursesListData from "./data/popularCoursesListData";
import DataTable from "examples/Tables/DataTable";

// Hooks
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//Axios
import axios from "services/authAxios";

// Endpoints
import { SocCardsRoute } from "utils/APIRoutes";
import authService from "services/auth.service";
import { getAccessToken } from "utils/accessToken";

function Dashboard() {
  const navigate = useNavigate();
  const { columns, rows } = authorsTableData();

  const [sessionsCount, setSessionsCount] = useState(0);
  const [challengesCount, setChallengesCount] = useState(0);
  const [collaboratorsCount, setCollabsCount] = useState(0);

  useEffect(() => {
    if (getAccessToken() === "") {
      // navigate("/login");
    }
    const fetchCards = async (model) => {
      const { data } = await axios.post(SocCardsRoute, { model });
      switch (model) {
        case "session":
          setSessionsCount(data.count);
          break;

        case "challenge":
          setChallengesCount(data.count);
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
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
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="school"
                title="Total Challenges"
                color="success"
                count={challengesCount}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="handshake"
                title="Total Collaborators"
                count={collaboratorsCount}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Total Sessions"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={CompaniesGraph()}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Total Challenges"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in this month.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={CoursesGraph()}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="primary"
                  title="Total Collaborators"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={PartnersGraph()}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-1}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
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
            <Grid item xs={12} md={6} lg={4}>
              <PopularCoursesList
                title="Recent courses"
                profiles={popularCoursesListData()}
              />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
