import { useState } from "react";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";

// Images
import burceMars from "assets/images/bruce-mars.jpg";

function ProfileInfoCard({ shadow }) {
  const labels = [];
  const values = [];
  const [edit, SetEdit] = useState(false);

  const [infosProfile, setInfosProfile] = useState({
    Bio: "Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term.",
    fullName: "Rachid Jehouh",
    emailPerso: "rachid.jehouh@gmail.com",
    emailInstitu: "rachid.jehouh@institute-eca.ma",
  });

  console.log(infosProfile);

  const handleChange = (event) => {
    setInfosProfile((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(infosProfile).forEach((el) => {
    labels.push(el);
  });

  const refactorName = (label) => {
    return label.split(/(?=[A-Z])/).join(" ");
  };

  // Push the object values into the values array
  Object.values(infosProfile).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" lineHeight={1} py={1} pr={2}>
      <MDBox>
        <MDTypography
          variant="button"
          fontWeight="bold"
          textTransform="capitalize"
          textAlign="justify"
        >
          {refactorName(label)}&nbsp;:
        </MDTypography>
      </MDBox>
      <MDBox pl={{ lg: 2, xs: 0 }}>
        <MDTypography variant="button" fontWeight="regular" color="text">
          &nbsp;{values[key]}
        </MDTypography>
      </MDBox>
    </MDBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <MDAvatar src={burceMars} alt="profile-image" size="xl" shadow="xl" />
        </Grid>
        <Grid item>
          <MDBox height="100%" mt={0.5} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Rachid Jehouh
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="regular">
              ENSAM Student
            </MDTypography>
          </MDBox>
        </Grid>
      </Grid>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        px={2}
      >
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
        >
          profile information
        </MDTypography>
        {!edit && (
          <MDButton
            onClick={() => {
              SetEdit(!edit);
            }}
            variant="text"
            size="large"
            iconOnly
          >
            <Tooltip title={"Edit Profile"} placement="right">
              <Icon fontSize="large" color="primary">
                edit
              </Icon>
            </Tooltip>
          </MDButton>
        )}
      </MDBox>
      <MDBox px={2}>
        <MDBox>{!edit && renderItems}</MDBox>
        <MDBox>
          {edit && (
            <MDBox
              component="form"
              role="form"
              // onSubmit={(event) => handleSubmit(event)}
            >
              {labels.map((label, key) => (
                <MDBox
                  key={label}
                  display="flex"
                  justifyContent="space-around"
                  alignItems="center"
                  py={1}
                >
                  <MDTypography
                    variant="button"
                    fontWeight="bold"
                    textTransform="capitalize"
                  >
                    {refactorName(label)}&nbsp; :
                  </MDTypography>
                  <MDInput
                    disabled={label === "emailInstitu"}
                    type="text"
                    label={refactorName(label)}
                    name={label}
                    defaultValue={values[key]}
                    onChange={(e) => handleChange(e)}
                    sx={{ width: "60%" }}
                    multiline
                  ></MDInput>
                </MDBox>
              ))}

              <MDBox mt={4} mb={2} display="flex" justifyContent="center">
                <MDButton
                  type="submit"
                  variant="gradient"
                  color="info"
                  sx={{ width: "25%", mr: "5px" }}
                >
                  Submit
                </MDButton>

                <MDButton
                  type="reset"
                  variant="gradient"
                  color="dark"
                  sx={{ width: "25%", ml: "5px" }}
                  onClick={() => SetEdit(!edit)}
                >
                  Annuler
                </MDButton>
              </MDBox>
            </MDBox>
          )}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
