// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";

// PasswordTester Package import
import zxcvbn from "zxcvbn";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

const PasswordTest = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;
  let caption = "";
  let barColor = "";

  if (num === 50) {
    caption = "Good";
    barColor = "info";
  } else if (num > 70) {
    caption = "Strong";
    barColor = "success";
  } else {
    caption = "Weak";
    barColor = "primary";
  }

  return (
    <MDBox display="flex" alignItems="center" mt={0.2}>
      <MDTypography variant="caption" color="text">
        {caption}
      </MDTypography>
      <MDBox ml={1} width="100%">
        <MDProgress variant="gradient" color={barColor} value={num} />
      </MDBox>
    </MDBox>
  );
};

// Setting default props for the ProfilesList
PasswordTest.defaultProps = {
  password: "",
};

// Typechecking props for the ProfilesList
PasswordTest.propTypes = {
  password: PropTypes.string,
};

export default PasswordTest;
