// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FormHelperText from "@mui/material/FormHelperText";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import PasswordTest from "components/PasswordTest";

//import UseState Hook
import { useState } from "react";

// Axios
import axios from "axios";

import { registerRoute } from "utils/APIRoutes";
import { companyIdBynameRoute } from "utils/APIRoutes";

function AddCompanies({ closeAddModel }) {
  const [formErrors, setFormErrors] = useState({
    username: "",
    f_name: "",
    l_name: "",
    company: "",
    email: "",
    password: "",
    c_password: "",
  });

  const [details, setDetails] = useState({
    username: "",
    f_name: "",
    l_name: "",
    company: "",
    email: "",
    password: "",
    c_password: "",
    image: "",
    id: "",
  });

  const getCompanyID = async (name) => {
    const { data } = await axios.post(companyIdBynameRoute, { name });
    setDetails((prev) => ({ ...prev, id: data.id }));
  };

  const handleSubmit = async (event) => {
    const { username, f_name, l_name, email, company, password, image, id } =
      details;
    event.preventDefault();
    setFormErrors(validate(details));
    if (Object.keys(validate(details)).length === 0) {
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
        nom: f_name,
        prenom: l_name,
        societe: company,
      });
      if (data.status) {
        closeAddModel(false);
        window.location.reload();
      } else {
        alert(data.msg);
      }
    }
  };

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setDetails((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleFileupload = (event) => {
    console.log(event.target.files[0]);
    setDetails((prev) => ({ ...prev, image: event.target.files[0].name }));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required !";
    }
    if (!values.f_name) {
      errors.f_name = "FirstName is required !";
    }
    if (!values.l_name) {
      errors.l_name = "LastName is required !";
    }
    if (!values.company) {
      errors.company = "Company Name is required !";
    }
    if (!values.email) {
      errors.email = "Email is required !";
    }
    if (!values.password) {
      errors.password = "Password is required !";
    }
    if (!values.c_password) {
      errors.c_password = "Password Confirmation is required !";
    } else if (values.password !== values.c_password) {
      errors.c_password = "Passwords don't match !";
    }
    return errors;
  };

  return (
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
      >
        <MDTypography variant="h6" color="white">
          Company Register
        </MDTypography>

        <MDButton
          variant="gradient"
          color="dark"
          size="small"
          iconOnly
          onClick={() => closeAddModel(false)}
        >
          <Icon fontSize="small">close</Icon>
        </MDButton>
      </MDBox>

      <MDBox pt={4} pb={3} px={10}>
        <MDBox
          component="form"
          role="form"
          onSubmit={(event) => handleSubmit(event)}
        >
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Username"
              variant="outlined"
              fullWidth
              name="username"
              onChange={(e) => handleChange(e)}
              error={formErrors.username}
            />
            <FormHelperText error>{formErrors.username}</FormHelperText>
          </MDBox>

          <MDBox display="flex">
            <MDBox mb={2} mr={2} sx={{ width: "50%" }}>
              <MDInput
                type="text"
                label="First Name"
                variant="outlined"
                name="f_name"
                onChange={(e) => handleChange(e)}
                fullWidth
                error={formErrors.f_name}
              />
              <FormHelperText error>{formErrors.f_name}</FormHelperText>
            </MDBox>
            <MDBox mb={2} ml={2} sx={{ width: "50%" }}>
              <MDInput
                type="text"
                label="Last Name"
                name="l_name"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                fullWidth
                error={formErrors.l_name}
              />
              <FormHelperText error>{formErrors.l_name}</FormHelperText>
            </MDBox>
          </MDBox>

          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Company Name"
              name="company"
              variant="outlined"
              fullWidth
              onChange={(e) => handleChange(e)}
              error={formErrors.company}
            />
            <FormHelperText error>{formErrors.company}</FormHelperText>
          </MDBox>

          <MDBox mb={2}>
            <MDInput
              type="email"
              label="Email"
              variant="outlined"
              name="email"
              fullWidth
              onChange={(e) => handleChange(e)}
              error={formErrors.email}
            />
            <FormHelperText error>{formErrors.email}</FormHelperText>
          </MDBox>

          <MDBox display="flex">
            <MDBox mb={2} mr={2} sx={{ width: "50%" }}>
              <MDInput
                type="password"
                label="Password"
                variant="outlined"
                name="password"
                onChange={(e) => handleChange(e)}
                fullWidth
                error={formErrors.password}
              />
              <PasswordTest password={details.password} />
              <FormHelperText error>{formErrors.password}</FormHelperText>
            </MDBox>
            <MDBox mb={2} ml={2} sx={{ width: "50%" }}>
              <MDInput
                type="password"
                label="Confirm Password"
                variant="outlined"
                name="c_password"
                onChange={(e) => handleChange(e)}
                fullWidth
                error={formErrors.c_password}
              />
              <FormHelperText error>{formErrors.c_password}</FormHelperText>
            </MDBox>
          </MDBox>

          <MDInput
            type="file"
            variant="outlined"
            name="image"
            onChange={(e) => handleFileupload(e)}
            fullWidth
          />

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
  );
}

export default AddCompanies;
