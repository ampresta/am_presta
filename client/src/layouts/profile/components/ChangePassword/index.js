import { useState } from "react";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import FormHelperText from "@mui/material/FormHelperText";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

function ChangePassword({ shadow }) {
  const [formErrors, setFormErrors] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [details, setDetails] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleSubmit = async (event) => {
    const { current_password, new_password, confirm_password } = details;
    event.preventDefault();
    setFormErrors(validate(details));

    console.log(details);
  };

  const handleChange = (event) => {
    setDetails((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.current_password) {
      errors.current_password = "Current Password is required !";
    }
    if (!values.new_password) {
      errors.new_password = "New Password is required !";
    }
    if (!values.confirm_password) {
      errors.confirm_password = "Confirm Password is required !";
    }
    if (values.confirm_password !== values.new_password) {
      errors.confirm_password = "Password don't match";
    }
    return errors;
  };

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox pt={2} px={2}>
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
          py={2}
        >
          change password
        </MDTypography>

        <MDBox
          component="form"
          role="form"
          onSubmit={(event) => handleSubmit(event)}
        >
          <MDBox mb={2}>
            <MDInput
              type="password"
              label="Current Password"
              name="current_password"
              onChange={(e) => handleChange(e)}
              fullWidth
              error={formErrors.current_password}
            ></MDInput>
            <FormHelperText error>{formErrors.current_password}</FormHelperText>
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="password"
              label="New Password"
              name="new_password"
              onChange={(e) => handleChange(e)}
              fullWidth
              error={formErrors.new_password}
            ></MDInput>
            <FormHelperText error>{formErrors.new_password}</FormHelperText>
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="password"
              label="Confirm Password"
              name="confirm_password"
              onChange={(e) => handleChange(e)}
              fullWidth
              error={formErrors.confirm_password}
            ></MDInput>
            <FormHelperText error>{formErrors.confirm_password}</FormHelperText>
          </MDBox>
          <MDButton
            type="submit"
            variant="outlined"
            color="info"
            sx={{ width: "25%", mt: 1 }}
          >
            Save
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ChangePassword.propTypes = {
  shadow: PropTypes.bool,
};

export default ChangePassword;
