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
import DropFileInput from "components/DropFileInput/DropFileInput";

//import UseState Hook
import { useState } from "react";

// import axiosAuth from "services/authAxios";
import axios from "services/authAxios";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater } from "context";

import { registerRoute, uploadRoute } from "utils/APIRoutes";

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
  });

  const [file, setFile] = useState(null);
  console.log(file);

  const [controller, dispatch] = useMaterialUIController();

  const { updater } = controller;

  const handleSubmit = async (event) => {
    const { username, f_name, l_name, email, company, password } = details;
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
      const ID = data.id;
      if (data.status) {
        const fd = new FormData();
        fd.append("image", file);
        fd.append("id", ID);
        fd.append("model", "societe");

        const config = {
          method: "post",
          url: uploadRoute,
          headers: {
            "content-Type": "multipart/form-data",
          },
          data: fd,
        };

        await axios(config);

        closeAddModel(false);
        setUpdater(dispatch, !updater);
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

          <Card>
            <MDBox>
              <DropFileInput
                title="Drag & Drop your company logo here"
                name="image"
                onFileChange={(files) => setFile(files[0])}
              />
            </MDBox>
          </Card>

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
