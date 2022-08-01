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

//react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addPartnersRoute } from "utils/APIRoutes";

function AddPartner({ closeAddModel }) {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "dark",
  };

  const [partner, setPartner] = useState({
    nom: "",
  });

  const handleSubmit = async (event) => {
    const { nom } = partner;
    event.preventDefault();
    if (validateData()) {
      const { data } = await axios.post(addPartnersRoute, {
        nom,
      });
      if (data.status) {
        navigate("/dashboard");
      } else {
        toast.error(data.msg, toastOptions);
      }
    }
  };

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setPartner((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const validateData = () => {
    const { nom } = partner;

    if (nom.length === 0) {
      toast.error("Partner name is required", toastOptions);
      return false;
    }

    return true;
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
          Add Partner
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
          <MDBox mb={2} mr={2}>
            <MDInput
              type="text"
              label="Partner Name"
              variant="outlined"
              fullWidth
              name="nom"
              onChange={(e) => handleChange(e)}
            />
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
      <ToastContainer />
    </Card>
  );
}

export default AddPartner;
