// react-router-dom components
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";

// Axios
import axios from "axios";

function AddCompanies() {
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
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
          <MDBox
            component="form"
            role="form"
            onSubmit={(event) => handleSubmit(event)}
          >
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Company name ..."
                name="name"
                onChange={(e) => handleChange(e)}
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button type="submit" style={{ width: "50%", border: "none" }}>
                  <MDButton variant="gradient" color="info" fullWidth>
                    Add
                  </MDButton>
                </button>
              </div>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default AddCompanies;
