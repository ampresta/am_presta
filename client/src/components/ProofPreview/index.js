import "./style/ProofPreview.css";
import { ImageConfig } from "./config/ImageConfig";

// @mui material components
import Card from "@mui/material/Card";

// Icons
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const ProofPreview = ({ closeProofModel, collab, file, downloadfile }) => {
  return (
    <Card>
      <MDBox
        mx={2}
        mt={2}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        display="flex"
        justifyContent="space-between"
      >
        <MDTypography variant="h6" color="white" ml={1}>
          Proof Preview of {collab}
        </MDTypography>
        <MDButton
          variant="gradient"
          color="dark"
          size="small"
          iconOnly
          onClick={() => closeProofModel(false)}
        >
          <Icon fontSize="small">close</Icon>
        </MDButton>
      </MDBox>

      <MDBox p={2}>
        <MDBox className="proof_preview_item">
          <img
            src={ImageConfig[file.type.split("/")[1]] || ImageConfig["default"]}
            alt=""
          />
          <MDBox className="proof_preview_item_info">
            <p>{file.name}</p>
            <p>{file.size}B</p>
          </MDBox>
          <span
            className="proof_preview_item_download"
            onClick={() => downloadfile}
          >
            <Icon>download</Icon>
            &nbsp; download
          </span>
        </MDBox>
        <MDBox mt={4} display="flex" justifyContent="center">
          <MDButton
            variant="gradient"
            color="success"
            sx={{ width: "30%", mr: "5px" }}
          >
            Accept
          </MDButton>

          <MDButton
            variant="gradient"
            color="primary"
            sx={{ width: "30%", ml: "5px" }}
          >
            Decline
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
};

export default ProofPreview;
