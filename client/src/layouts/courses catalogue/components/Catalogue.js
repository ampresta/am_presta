// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FilterAlt from "@mui/icons-material/FilterAlt";

// Material Kit 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Presentation page components
import ExampleCard from "examples/Cards/ExampleCard";

// Data
import data from "../data/CoursesCatalogueData";
import MDBadge from "components/MDBadge";

function Catalogue() {
  const providers = [
    { id: 0, name: "ALL" },
    { id: 1, name: "Huawei" },
    { id: 2, name: "Cisco" },
    { id: 3, name: "Juniper" },
    { id: 4, name: "Oracle" },
    { id: 5, name: "Fortinet" },
  ];

  const renderData = data.map(({ id, image, name, route, provider, pro }) => (
    <Grid item xs={12} md={3} sx={{ mb: { xs: 3, lg: 0 } }} key={id}>
      <Link to={route}>
        <ExampleCard
          image={image}
          name={name}
          provider={provider}
          display="grid"
          maxHeight={{ xs: "200px", md: "100px", sm: "180px", lg: "105px" }}
          pro={pro}
        />
      </Link>
    </Grid>
  ));

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
              sx={{ border: "1px solid #222", borderRadius: "10px" }}
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
                {providers.map((item) => (
                  <MDButton
                    key={item.id}
                    variant="standard"
                    color="dark"
                    size="small"
                    sx={{ mb: 0.5}}
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
              badgeContent={`${data.length} COURSES FOUND`}
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
