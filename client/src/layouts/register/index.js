// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import FormHelperText from "@mui/material/FormHelperText";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDInput from "components/MDInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

// @mui icons
import Icon from "@mui/material/Icon";

// Hook
import { useState, useEffect } from "react";

//Axios
import axios from "axios";

function Register() {
  const [formErrors, setFormErrors] = useState({
    coursename: "",
    provider: "",
    description: "",
  });

  const [course, setCourse] = useState({
    nom: "",
    provider: {
      id: "",
      name: "",
    },
    description: "",
  });

  const [selectedProvider, setSelectedProvider] = useState({
    nom: "",
    id: "",
  });

  const [providers, setProviders] = useState([
    {
      id: "",
      nom: "",
    },
  ]);

  useEffect(() => {
    const getAllPartners = async () => {
      const { data } = await axios.get("");
      let temp = [];
      data.map((provider) => temp.push({ id: provider.id, nom: provider.nom }));
      setProviders(temp);
    };
    getAllPartners();
  }, []);

  const handleSubmit = async (event) => {
    const { nom, provider, description } = course;
    event.preventDefault();
    setFormErrors(validate(course));

    if (Object.keys(validate(course)).length === 0) {
      const { data } = await axios.post("", {
        nom,
        provider: provider.id,
        description,
      });
      if (data.status) {
        window.location.reload();
      } else {
        alert(data.msg);
      }
    }
  };

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setCourse((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.nom) {
      errors.coursename = "Course Name is required !";
    }
    if (!values.provider.id) {
      errors.provider = "Provider is required !";
    }
    if (!values.description) {
      errors.description = "Description is required !";
    }
    return errors;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={1}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card sx={{ mt: "50px" }}>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                p={3}
                mx={2}
                mt={-3}
                mb={1}
              ></MDBox>

              <MDBox pt={4} pb={3} px={10}>
                <MDBox
                  component="form"
                  role="form"
                  onSubmit={(event) => handleSubmit(event)}
                >
                  <MDBox display="flex">
                    <MDBox mb={2} mr={2} s sx={{ width: "50%" }}>
                      <MDInput
                        type="text"
                        label="Course Name"
                        variant="outlined"
                        fullWidth
                        name="nom"
                        onChange={(e) => handleChange(e)}
                        error={formErrors.coursename}
                      />
                      <FormHelperText error sx={{ ml: 2 }}>
                        {formErrors.coursename}
                      </FormHelperText>
                    </MDBox>

                   
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Description"
                      variant="outlined"
                      name="description"
                      fullWidth
                      onChange={(e) => handleChange(e)}
                      error={formErrors.description}
                    />
                    <FormHelperText error>
                      {formErrors.description}
                    </FormHelperText>
                  </MDBox>
                  <MDBox mt={4} mb={2} display="flex" justifyContent="center">
                    <MDButton
                      type="submit"
                      variant="gradient"
                      color="info"
                      sx={{ width: "30%", mr: "5px" }}
                    >
                      Submit
                    </MDButton>

                    <MDButton
                      type="reset"
                      variant="gradient"
                      color="dark"
                      sx={{ width: "30%", ml: "5px" }}
                    >
                      clear
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Register;
