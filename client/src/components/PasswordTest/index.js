// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";

// PasswordTester Package import
import zxcvbn from "zxcvbn";

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

export default PasswordTest;
