// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

//component
import PopularCoursesList from "examples/Lists/PopularCoursesList";

import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

import { Link } from "react-router-dom";

// Data
import authorsTableData from "layouts/dashboard/data/companiesTableData";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import popularCoursesListData from "layouts/dashboard/data/popularCoursesListData";

// Hooks
import React, { useState, useEffect } from "react";

//Axios
import axios from "axios";

// Endpoints
import { amCardsRoute, companiesRoute} from "utils/APIRoutes";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const { columns } = authorsTableData();

  const [coursesCount, setCoursesCount] = useState(0);
  const [partnersCount, setPartnersCount] = useState(0);
  const [companiesCount, setCompaniesCount] = useState(0);
  const [companies, setComnpanies] = useState([])
  

  useEffect(() => {
    const fetchCards = async (model) => {
      const { data } = await axios.post(amCardsRoute, { model });
      switch (model) {
        case "cours":
          setCoursesCount(data.count);
          break;
<<<<<<< HEAD
        
        case "societe":
          setCompaniesCount(data.count)
          break;
        
        case "provider":
          setPartnersCount(data.count)
          break;
      
=======

        case "societe":
          setCompaniesCount(data.count);
          break;

        case "provider":
          setPartnersCount(data.count);
          break;

>>>>>>> 18a06707d1b98f24fee0062628547c959e1e53a5
        default:
          break;
      }
    };

    // const handleCompanies = (companies) => {

    //   // const Author = ({ image, name, company }) => (
    //   //   <MDBox display="flex" alignItems="center" lineHeight={1}>
    //   //     <MDAvatar src={image} name={name} size="sm" />
    //   //     <MDBox ml={2} lineHeight={1}>
    //   //       <MDTypography display="block" variant="button" fontWeight="medium">
    //   //         {name}
    //   //       </MDTypography>
    //   //       <MDTypography variant="caption">{company}</MDTypography>
    //   //     </MDBox>
    //   //   </MDBox>
    //   // );

    //   // let temp = []
    //   console.log(companies);
     
    // }


    // const getAllCompanies = async () => {
    //   const { data } = await axios.get(companiesRoute);
    //   handleCompanies(data.msg)
     
    // }
    
    // getAllCompanies()
    fetchCards("cours").catch(console.error);
    fetchCards("societe").catch(console.error);
    fetchCards("provider").catch(console.error);
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="class"
                title="Total Companies"
                count={companiesCount}
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
                title="Total Courses"
                count={coursesCount}
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
                color="success"
                icon="store"
                title="Total Partners"
                count={partnersCount}
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
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="primary"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
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
                >
                  <MDTypography variant="h6" color="white">
                    Companies
                  </MDTypography>
                </MDBox>
                <MDBox pt={2}>
                  <DataTable
                    table={{ columns, companies }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
              <Link to={"/companies"}>
                <MDTypography align={"center"} fontSize={14} mt={2}>
                  Show All
                </MDTypography>
              </Link>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PopularCoursesList
                title="popular courses"
                profiles={popularCoursesListData}
              />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
