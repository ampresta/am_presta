// react-router-dom components
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

//import UseState Hook
import { useState } from "react";

// Axios
import axios from "axios";

function AddCompanies({ closeAddModel }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    console.log(name);
    event.preventDefault();
    const { data } = await axios.post("", { name: name });
    if (data.status) {
      navigate("/companies");
    }
  };

  const handleChange = (event) => {
    setName(event.target.value);
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
              onChange={(e) => handleChange(e)}
            />
          </MDBox>

          <MDBox display="flex">
            <MDBox mb={2} mr={2} sx={{ width: "50%" }}>
              <MDInput
                type="text"
                label="First Name"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2} ml={2} sx={{ width: "50%" }}>
              <MDInput
                type="text"
                label="Last Name"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                fullWidth
              />
            </MDBox>
          </MDBox>

          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Company Name"
              variant="outlined"
              fullWidth
              onChange={(e) => handleChange(e)}
            />
          </MDBox>

          <MDBox mb={2}>
            <MDInput
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => handleChange(e)}
            />
          </MDBox>

          <MDBox display="flex">
            <MDBox mb={2} mr={2} sx={{ width: "50%" }}>
              <MDInput
                type="password"
                label="Password"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2} ml={2} sx={{ width: "50%" }}>
              <MDInput
                type="password"
                label="Confirm Password"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                fullWidth
              />
            </MDBox>
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
  );
}

export default AddCompanies;
