// react-router-dom components
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import {
  CoursesCatalogue,
  // allCoursesRoute,
  allPartnersRoute,
} from "utils/APIRoutes";
import axiosAuth from "services/authAxios";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FilterAlt from "@mui/icons-material/FilterAlt";

// Material Kit 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

// Presentation page components
import ExampleCard from "examples/Cards/ExampleCard";

// Data
import CoursesCatalogueData from "../data/CoursesCatalogueData";

import { baseURL } from "utils/APIRoutes";

function Catalogue() {
  const [allCourses, setAllCourses] = useState([]);
  const [allPartners, setAllPartners] = useState([]);

  useEffect(() => {
    const getAllCourses = async () => {
      const { data } = await axiosAuth.get(CoursesCatalogue);
      console.log(data);
      setAllCourses(data.cours);
    };
    getAllCourses();
  }, []);

  useEffect(() => {
    const getAllPartners = async () => {
      const { data } = await axiosAuth.get(allPartnersRoute);
      setAllPartners((prev) => data);
    };
    getAllPartners();
  }, []);

  const coursesData = [];

  allCourses.map((course) =>
    coursesData.push({
      id: course.id,
      image: course.image,
      provider: course.Provider.nom,
      name: course.nom,
      route: `/catalogue/details/${course.id}`,
      pro: course.Provider.Quota.length > 0 ? false : true,
    })
  );

  const partnersData = [];

  allPartners.map((partner) =>
    partnersData.push({
      id: partner.id,
      name: partner.nom,
    })
  );

  console.log(partnersData);

  // const { coursesData, partnersData } = CoursesCatalogueData();

  partnersData.unshift({ id: -1, name: "ALL" });

  const renderData = coursesData.map(
    ({ id, image, name, route, provider, pro }) => (
      <Grid item xs={12} md={3} sx={{ mb: { xs: 3, lg: 0 } }} key={id}>
        <Link to={route}>
          <ExampleCard
            image={`${baseURL}/${image}`}
            name={name}
            provider={provider}
            display="grid"
            height={{ xs: "200px", md: "80px", sm: "210px", lg: "110px" }}
            pro={pro}
          />
        </Link>
      </Grid>
    )
  );
  let choosenPartners = [];
  const handleProvider = (e) => {
    choosenPartners.push(e.currentTarget.id);
    const getAllCourses = async () => {
      const { data } = await axiosAuth.post(CoursesCatalogue, {
        providers: choosenPartners,
      });
      console.log(data);
      setAllCourses(data.cours);
    };
    getAllCourses();
  };
  return (
    <MDBox pb={3}>
      <Container sx={{ mt: { xs: 2, lg: 3 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={2}>
            <MDBox
              position="sticky"
              top="200px"
              pb={{ xs: 2, lg: 2 }}
              px={2}
              py={1}
              sx={{
                border: "1px solid #222",
                borderRadius: "10px",
              }}
            >
              <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                pb={2}
              >
                <FilterAlt fontSize="medium" color="dark" variant="gradient" />
                <MDTypography variant="text" fontWeight="bold" color="dark">
                  Filter By
                </MDTypography>
              </MDBox>

              <MDBox display="grid" placeitems="center">
                <MDTypography
                  variant="body2"
                  fontWeight="light"
                  color="dark"
                  textAlign="center"
                  pb={1}
                >
                  PROVIDERS
                </MDTypography>
                {partnersData.map((item) => (
                  <MDButton
                    key={item.id}
                    onClick={(e) => handleProvider(e)}
                    variant="text"
                    color="dark"
                    size="small"
                    sx={{ mb: 0.5 }}
                    // onClick={() => console.log(item.id)}
                  >
                    {item.name}
                  </MDButton>
                ))}
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={10} sx={{ px: { xs: 0, lg: 4 } }}>
            <MDBadge
              variant="contained"
              color="info"
              badgeContent={`${coursesData.length} COURSES FOUND`}
              container
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              {renderData}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MDBox>
  );
}

export default Catalogue;
