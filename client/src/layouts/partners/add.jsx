// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FormHelperText from "@mui/material/FormHelperText";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

//import UseState Hook
import { useState } from "react";

// Axios
import axios from "axios";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater } from "context";

import { addPartnersRoute, uploadRoute } from "utils/APIRoutes";

function AddPartner({ closeAddModel }) {
  const [formErrors, setFormErrors] = useState({
    nom: "",
  });

  const [partner, setPartner] = useState({
    nom: "",
  });

  const [file, setFile] = useState(null);

  const [controller, dispatch] = useMaterialUIController();

  const { updater } = controller;

  const handleSubmit = async (event) => {
    const { nom } = partner;
    event.preventDefault();
    setFormErrors(validate(partner));
    if (Object.keys(validate(partner)).length === 0) {
      const { data } = await axios.post(addPartnersRoute, {
        nom,
      });
      const ID = data.id;

      if (data.status) {
        const fd = new FormData();
        fd.append("image", file);
        fd.append("id", ID);
        fd.append("model", "provider");

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
    setPartner((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleFileupload = (event) => {
    setFile(event.target.files[0]);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.nom) {
      errors.coursename = "Partner Name is required !";
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
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Partner Name"
              variant="outlined"
              fullWidth
              name="nom"
              onChange={(e) => handleChange(e)}
              error={formErrors.coursename}
            />
            <FormHelperText error>{formErrors.coursename}</FormHelperText>
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

export default AddPartner;
