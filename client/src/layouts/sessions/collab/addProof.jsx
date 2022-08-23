// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

//import UseState Hook
import { useState } from "react";

import DropFileInput from "components/DropFileInput/DropFileInput";

// Axios
import axios from "services/authAxios";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater } from "context";

import { setProofRoute, uploadRoute } from "utils/APIRoutes";

function AddProof({ closeAddModel, type, sessionId }) {
  const [file, setFile] = useState(null);

  const [controller, dispatch] = useMaterialUIController();

  const { updater } = controller;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fd = new FormData();
    fd.append("proof", file);
    fd.append("sess", sessionId);
    fd.append("type", "fincourse");
    console.log(fd.getAll("image"));
    const config = {
      method: "post",
      url: setProofRoute,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: fd,
    };

    await axios(config);

    // closeAddModel(false);
    setUpdater(dispatch, !updater);
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
          Upload Proof
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
          <Card>
            <MDBox>
              <DropFileInput
                title="Drag & Drop Proof here"
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

export default AddProof;
