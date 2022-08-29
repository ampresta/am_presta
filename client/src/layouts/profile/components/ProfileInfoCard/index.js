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
import { baseURL } from "utils/APIRoutes";

function ProfileInfoCard({
  shadow,
  labels,
  values,
  userAvatar,
  userSociete,
  userNom,
  userPrenom,
  handleChange,
  updateProfile,
  handleChangeNom,
  handleChangePrenom,
}) {
  const [edit, SetEdit] = useState(false);

  const refactorName = (label) => {
    return label.split(/(?=[A-Z])/).join(" ");
  };

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
          <MDAvatar
            src={`${baseURL}/${userAvatar}`}
            alt="profile-image"
            size="xl"
            shadow="xl"
          />
        </Grid>
        <Grid item>
          <MDBox height="100%" mt={0.5} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              {`${userNom} ${userPrenom}`}
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="regular">
              {userSociete}
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
              onSubmit={(event) => updateProfile(event)}
            >
              <MDBox
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
                  Nom&nbsp; :
                </MDTypography>

                <MDInput
                  type="text"
                  label="nom"
                  name="nom"
                  defaultValue={userNom}
                  sx={{ width: "60%" }}
                  multiline
                  onChange={(e) => handleChangeNom(e.target.value)}
                ></MDInput>
              </MDBox>

              <MDBox
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
                  Prenom&nbsp; :
                </MDTypography>

                <MDInput
                  type="text"
                  label="Prenom"
                  name="Prenom"
                  defaultValue={userPrenom}
                  sx={{ width: "60%" }}
                  multiline
                  onChange={(e) => handleChangePrenom(e.target.value)}
                ></MDInput>
              </MDBox>

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
                    sx={{ width: "60%" }}
                    multiline
                    onChange={(e) => handleChange(e)}
                  ></MDInput>
                </MDBox>
              ))}

              <MDBox mt={4} mb={2} display="flex" justifyContent="center">
                <MDButton
                  type="submit"
                  variant="gradient"
                  color="info"
                  sx={{ width: "25%", mr: "5px" }}
                  onClick={(e) => {
                    updateProfile(e);
                    SetEdit(!edit);
                  }}
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
