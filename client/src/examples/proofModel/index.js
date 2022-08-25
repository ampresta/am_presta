// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// @mui icons
import Icon from "@mui/material/Icon";

const ProofModel = ({ file }) => {
  return (
    <Modal open={true} disableAutoFocus={true}>
      <MDBox
        borderRadius="xl"
        bgColor="white"
        shadow="xl"
        ml={{ xs: 0, md: 5, lg: 15, sm: 2.5 }}
        sx={{ position: "absolute", top: "45%", right: "50%" }}
      >
        <Card>
          <MDBox p={2} display="flex" justifyContent="flex-end">
            <MDButton
              variant="gradient"
              color="dark"
              size="small"
              iconOnly
              // onClick={() => onConfirmPopup(false)}
            >
              <Icon fontSize="small">close</Icon>
            </MDButton>
          </MDBox>
          <MDBox px={4} pb={2}>
            <img src={file} alt="show my proof" width="200px" height="auto" />
          </MDBox>
        </Card>
      </MDBox>
    </Modal>
  );
};
export default ProofModel;
