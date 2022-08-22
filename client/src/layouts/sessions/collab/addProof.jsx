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
import axiosAuth from "services/authAxios";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater } from "context";

import { addCollabsRoute, uploadRoute } from "utils/APIRoutes";

function AddProof({ closeAddModel }) {
  const [file, setFile] = useState(null);

  const [controller, dispatch] = useMaterialUIController();

  const { updater } = controller;

  console.log(file);

  // const handleSubmit = async (event) => {
  //   const { nom } = collaborator;
  //   event.preventDefault();

  //   if (data.status) {

  //     await axiosAuth(config);

  //       closeAddModel(false);
  //       setUpdater(dispatch, !updater);
  //     } else {
  //       alert(data.msg);
  //     }
  //   }
  // };

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
          // onSubmit={(event) => handleSubmit(event)}
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
