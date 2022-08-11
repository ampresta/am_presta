// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import PieChart from "examples/Charts/PieChart";
// import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";

// Data
import sessionsDetailsTableData from "layouts/sessionsDetails/data/sessionsDetailsTableData";

// static huawei image
import huawei from "assets/images/huawei-logo.png";

function Partners() {
  const { columns, rows } = sessionsDetailsTableData();

  const data = {
    labels: ["Success", "Failure", "Not completed"],
    datasets: {
      data: [70, 30, 20],
    },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {
        <MDBox pt={6} pb={1}>
          <Grid container spacing={2} rowSpacing={2}>
            <Grid item xs={12} md={7} lg={9}>
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
                  display="flex"
                  alignItems="center"
                >
                  <MDAvatar src={huawei} size="xl" />
                  <MDTypography variant="h6" color="white" ml={2}>
                    HCIA - Big Data
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
                    title="Session Results"
                    date="just updated"
                    chart={data}
                  />
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
