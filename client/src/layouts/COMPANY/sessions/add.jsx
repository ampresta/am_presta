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
import { useState } from "react";

// Axios
import axios from "axios";

import { useEffect } from "react";
import { allCompanyCoursesRoute, addSessionsRoute } from "utils/APIRoutes";

function AddSession({ closeAddModel }) {
  const [formErrors, setFormErrors] = useState({
    coursename: "",
    provider: "",
    description: "",
  });

  const [session, setSession] = useState({
    nom: "",
    course: {
      id: "",
      name: "",
    },
    company: {
      id: "",
      name: "",
    },
    dateDepart: "",
    dateFin: "",
  });

  const [selectedCourse, setSelectedCourse] = useState({
    nom: "",
    id: "",
  });


  const [courses, setCourses] = useState([
    {
      id: "",
      nom: "",
    },
  ]);



  useEffect(() => {
    const getAllData = async () => {
        const { data } = await axios.get(allCompanyCoursesRoute);
        let allCourses = [];
        data.map((res) => allCourses.push({ id: res.id, nom: res.nom }));
        setCourses(allCourses);
        return;
    };
    getAllData();
  }, []);

  const handleSubmit = async (event) => {
    const { course, company, nom, dateDepart, dateFin } = session;
    event.preventDefault();
    setFormErrors(validate(session));
    if (Object.keys(validate(session)).length === 0) {
      const { data } = await axios.post(addSessionsRoute, {
        nom,
        datedebut: dateDepart,
        datefin: dateFin,
        cours: course.id,
        societe: 1,
      });
      if (data.status) {
        closeAddModel(false);
        window.location.reload();
      } else {
        alert(data.msg);
      }
    }
  };

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setSession((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleSelectedCourse = (event) => {
    const course = event.target.value;
    setSession((prev) => ({ ...prev, course }));
    setSelectedCourse(course);
  };


  const validate = (values) => {
    const errors = {};
    // if (!values.nom) {
    //   errors.coursename = "Course Name is required !";
    // }
    // if (!values.provider.id) {
    //   errors.provider = "Provider is required !";
    // }
    // if (!values.description) {
    //   errors.description = "Description is required !";
    // }
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
          Add Session
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
          <MDBox display="flex">
            <MDBox mb={2} sx={{ width: "50%" }}>
              <MDInput
                type="text"
                label="Nom de la Session"
                variant="outlined"
                name="nom"
                fullWidth
                onChange={(e) => handleChange(e)}
                error={formErrors.description}
              />
              <FormHelperText error>{formErrors.description}</FormHelperText>
            </MDBox>

            <MDBox mb={2} ml={2} sx={{ width: "50%" }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Courses</InputLabel>
                <Select
                  error={formErrors.provider}
                  name="course"
                  sx={{ height: 45 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCourse.name}
                  label="Age"
                  onChange={(e) => handleSelectedCourse(e)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 150,
                      },
                    },
                  }}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Provider" />
                  }
                >
                  {courses.map((course) => (
                    <MenuItem key={course.id} value={course}>
                      {course.nom}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>{formErrors.provider}</FormHelperText>
              </FormControl>
            </MDBox>
          </MDBox>

          <MDBox display="flex">
            <MDBox mb={2} sx={{ width: "50%" }}>
              <MDInput
                type="date"
                label="Date Debut"
                variant="outlined"
                name="dateDepart"
                fullWidth
                onChange={(e) => handleChange(e)}
                error={formErrors.description}
              />
              <FormHelperText error>{formErrors.description}</FormHelperText>
            </MDBox>

            <MDBox mb={2} sx={{ width: "50%" }}>
              <MDInput
                type="date"
                label="Date Fin"
                variant="outlined"
                name="dateFin"
                fullWidth
                onChange={(e) => handleChange(e)}
                error={formErrors.description}
              />
              <FormHelperText error>{formErrors.description}</FormHelperText>
            </MDBox>
          
          </MDBox>

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

export default AddSession;
