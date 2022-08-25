// @mui material components
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// @mui icons
import Icon from "@mui/material/Icon";

const ProofModel = ({ file, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} disableAutoFocus={true}>
      <Slide direction="up" in={open} timeout={250}>
        <MDBox
          sx={{ position: "absolute", top: "30%", right: "35%" }}
          shadow="xl"
          // ml={{ xs: 0, md: 5, lg: 15, sm: 2.5 }}
        >
          <Card>
            <MDBox p={2} display="flex" justifyContent="flex-end">
              <MDButton
                variant="gradient"
                color="dark"
                size="small"
                iconOnly
                onClick={() => onClose(false)}
              >
                <Icon fontSize="small">close</Icon>
              </MDButton>
            </MDBox>
            <MDBox px={4} pb={4}>
              <img
                src={file}
                alt="show my proof"
                width="300px"
                height="auto"
                style={{ border: "4px solid #2b85eb" }}
              />
            </MDBox>
          </Card>
        </MDBox>
      </Slide>
    </Modal>
  );
};
export default ProofModel;
