/* eslint-disable react-hooks/exhaustive-deps */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "./DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import PieChart from "examples/Charts/PieChart";

// Icons
import Icon from "@mui/material/Icon";

// Data
import sessionsDetailsTableData from "./data/sessionsDetailsTableData";

//  React
import { useState, useEffect } from "react";

// axios
import axios from "services/authAxios";
import { SessionGraph, baseURL } from "utils/APIRoutes";

import {
  useMaterialUIController,
  setOpenProofModel,
  setOpenSelectCollabs,
} from "context";

import ChooseCollabs from "./ChooseCollabs";
import ProofPreview from "components/ProofPreview";

import { useParams } from "react-router-dom";

function Partners() {
  const { columns, rows, rawData } = sessionsDetailsTableData();

  console.log(rawData);
  const [graph, setGraph] = useState([]);

  const [loading, setLoading] = useState(false);

  const [controller, dispatch] = useMaterialUIController();
  const {
    collabProofModel,
    fileProofModel,
    openProofModel,
    openSelectCollabs,
    updater,
  } = controller;

  let { id } = useParams();

  useEffect(() => {
    const getGraph = async () => {
      const { data } = await axios.post(SessionGraph, { sess: id });
      console.log("graph", data);
      setGraph(data);
      setLoading(true);
    };
    getGraph();
  }, [updater]);

  const data = {
    labels: ["Cerified", "Finished Course", "Not completed"],
    datasets: {
      data: [
        loading ? graph.session.certifs_count : 0,
        loading
          ? graph.session.fincourse_count - graph.session.certifs_count
          : 0,

        loading
          ? graph.session.collab_count - graph.session.fincourse_count
          : 0,
      ],
    },
  };

  return (
    <DashboardLayout>
      {loading && <DashboardNavbar titleio={graph.session.nom} />}
      <MDBox pt={6} pb={1}>
        <Grid container spacing={2} rowSpacing={2}>
          {!openSelectCollabs && !openProofModel && (
            <Grid item xs={12} md={7} lg={9}>
              <Card>
                {loading && (
                  <MDAvatar
                    src={
                      loading ? `${baseURL}/${graph.session.Cour.image}` : null
                    }
                    size="xl"
                    sx={{
                      border: "3.5px solid #227be9",
                      ml: 4,
                      mt: 1,
                    }}
                  />
                )}
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

                <Grid
                  container
                  spacing={2}
                  display="flex"
                  justifyContent="space-between"
                >
                  <MDBox ml={3} pt={2} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={() =>
                        setOpenSelectCollabs(dispatch, !openSelectCollabs)
                      }
                    >
                      <Icon fontSize="big">add</Icon>
                      &nbsp; add collab to session
                    </MDButton>
                  </MDBox>

                  <MDBox pt={2} pr={4} mt={3} display="flex">
                    <MDBox mr={2}>
                      <MDButton
                        variant="gradient"
                        color="success"
                        size="small"
                        // onClick={() => handleDownload("allCourses", "export")}
                        // disabled={rawData.length === 0}
                      >
                        <Icon fontSize="big" color="light">
                          done
                        </Icon>
                        &nbsp; Assign All
                      </MDButton>
                    </MDBox>

                    <MDBox mr={2}>
                      <MDButton
                        variant="gradient"
                        color="success"
                        size="small"
                        // onClick={() => handleDownload("allCourses", "export")}
                        // disabled={rawData.length === 0}
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
          )}

          {openSelectCollabs && (
            <Grid item xs={12} md={7} lg={9}>
              <ChooseCollabs session={id} />
            </Grid>
          )}
          {openProofModel && (
            <Grid item xs={12} md={7} lg={9}>
              <ProofPreview
                collab={openProofModel && collabProofModel}
                file={openProofModel && fileProofModel}
                closeProofModel={() =>
                  setOpenProofModel(dispatch, !openProofModel)
                }
              />
            </Grid>
          )}

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
                  <MDBox
                    color="white"
                    bgColor="success"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    p={1}
                    sx={{ height: 5, fontSize: 10, lineHeight: 0 }}
                  >
                    Success
                  </MDBox>
                  &nbsp;
                  <MDBox
                    color="white"
                    bgColor="primary"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    p={1}
                    sx={{ height: 5, fontSize: 10, lineHeight: 0 }}
                  >
                    Failure
                  </MDBox>
                  &nbsp;
                  <MDBox
                    color="white"
                    bgColor="dark"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    p={1}
                    sx={{ height: 5, fontSize: 10, lineHeight: 0 }}
                  >
                    Not completed
                  </MDBox>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
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
