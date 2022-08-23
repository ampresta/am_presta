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
import {
  useMaterialUIController,
  setUpdater,
  setOpenProofModel,
} from "context";

import { setProofRoute } from "utils/APIRoutes";

function AddProof({ sessionId }) {
  const [file, setFile] = useState(null);

  const [controller, dispatch] = useMaterialUIController();
  const { updater, openProofModel } = controller;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fd = new FormData();
    fd.append("proof", file);
    fd.append("sess", sessionId);
    fd.append("type", "fincourse");
    // console.log(fd.getAll("image"));
    const config = {
      method: "post",
      url: setProofRoute,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: fd,
    };

    await axios(config);

    setOpenProofModel(dispatch, !openProofModel);
    setUpdater(dispatch, !updater);
  };

  console.log("wa ba3da", sessionId);

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
          onClick={() => setOpenProofModel(dispatch, !openProofModel)}
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
              sx={{ width: "50%", mr: "5px" }}
            >
              Send Proof
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default AddProof;
