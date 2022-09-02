// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FormHelperText from "@mui/material/FormHelperText";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//import UseState Hook
import { useState, useEffect } from "react";

// Axios
import axios from "services/authAxios";

import { allCompanyCoursesRoute, addSessionsRoute } from "utils/APIRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater, setToastInfos } from "context";
import { useParams } from "react-router-dom";
import { SessionCollabRoute } from "utils/APIRoutes";
import { sendEmailRoute } from "utils/APIRoutes";

export default function NotifyEmail({ closeAddModel, openSnackBar }) {
  const { id } = useParams();

  const [emails, setEmails] = useState([]);

  const [formErrors, setFormErrors] = useState({
    subject: "",
    message: "",
  });

  const [controller, dispatch] = useMaterialUIController();
  const { updater } = controller;

  const [form, setForm] = useState({
    subject: "",
    message: "",
  });

  useEffect(() => {
    const getCollab = async () => {
      const { data } = await axios.post(SessionCollabRoute, {
        sess: id,
      });
      const temp_emails = data.collab.map((collab) => collab.User.email);
      setEmails(temp_emails);
    };
    getCollab();
  }, []);

  const handleSubmit = async (event) => {
    const { subject, message } = form;
    event.preventDefault();
    setFormErrors(validate(form));
    if (Object.keys(validate(form)).length === 0) {
      await axios.post(sendEmailRoute, {
        email: emails,
        subject: subject,
        message: message,
      });
    }
  };

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setForm((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.subject) {
      errors.subject = "Subject is required";
    }
    if (!values.message) {
      errors.message = "Message is required !";
    }
    return errors;
  };

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
          Notify Collaborators
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
          onSubmit={(event) => handleSubmit(event)}
        >
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Subject"
              variant="outlined"
              name="subject"
              fullWidth
              onChange={(e) => handleChange(e)}
              error={formErrors.nom}
            />
            <FormHelperText error>{formErrors.nom}</FormHelperText>
          </MDBox>

          <MDInput
            type="text"
            label="Message"
            variant="outlined"
            name="message"
            multiline
            fullWidth
            onChange={(e) => handleChange(e)}
            error={formErrors.nom}
            rows={6}
          />
          <FormHelperText error>{formErrors.nom}</FormHelperText>

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
