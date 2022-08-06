// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// @mui icons
import Icon from "@mui/material/Icon";

const ConfirmPopup = ({ title, onConfirmPopup, handleDetele, IdCourse }) => {
  return (
    <MDBox
      sx={{
        boxShadow: 3,
        overflow: "hidden",
        mx: "25%",
        borderRadius: "12px",
        position: "fixed",
        top: "35%",
        backgroundColor: "rgb(0,0,0, 0.3)",
      }}
    >
      <Grid item xs={12}>
        <Card>
          <MDBox p={2} display="flex" justifyContent="flex-end">
            <MDButton
              variant="gradient"
              color="dark"
              size="small"
              iconOnly
              onClick={() => onConfirmPopup(false)}
            >
              <Icon fontSize="small">close</Icon>
            </MDButton>
          </MDBox>
          <MDBox px={4} pb={2}>
            <MDTypography
              textAlign="center"
              fontWeight="light"
              lineHeight="1.4"
              fontSize="18px"
            >
              {title}
            </MDTypography>
          </MDBox>
          <MDBox p={2} display="flex" justifyContent="center">
            <MDBox mr={1}>
              <MDButton
                variant="gradient"
                color="info"
                size="small"
                onClick={() => handleDetele(IdCourse)}
              >
                Confirm
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton
                variant="gradient"
                color="dark"
                size="small"
                onClick={() => onConfirmPopup(false)}
              >
                Cancel
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
    </MDBox>
  );
};

export default ConfirmPopup;
