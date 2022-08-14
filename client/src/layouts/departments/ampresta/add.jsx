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
import { useState,useEffect } from "react";

// Axios
import axios from "services/authAxios";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater } from "context";

import { addDepartementRoute,allCompaniesRoute } from "utils/APIRoutes";

function AddDepartement({ closeAddModel }) {
  const [formErrors, setFormErrors] = useState({
    nom: "",
  });

  const [departement, setDepartement] = useState({
    nom: "",
  });

  const [controller, dispatch] = useMaterialUIController();

  const { updater } = controller;

  const [societe, setSociete] = useState("");
  useEffect(() => {
    const getAllData = async () => {
      const { data } = await axios.get(allCompaniesRoute);
	    console.log(data);
      setSociete(data.msg);
    };
    getAllData();
  }, []);

  const handleSubmit = async (event) => {
    const { nom } = departement;
    event.preventDefault();
    setFormErrors(validate(departement));
    if (Object.keys(validate(departement)).length === 0) {
      const { data } = await axios.post(addDepartementRoute, {
        nom,
	societe
      });
      if (data.status) {
        closeAddModel(false);
        setUpdater(dispatch, !updater);
      } else {
        alert(data.msg);
      }
    }
  };

  const handleSelectedSociete = (event) => {
    const soc = event.target.value;
    setDepartement((prev) => ({ ...prev, soc }));
    setSociete(soc);
  };
  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setDepartement((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.nom) {
      errors.coursename = "Department Name is required !";
    }
    return errors;
  };

  const societes_ToBe_Selected =
    societe.length !== 0 ? (
      societe.map((soc) => (
        <MenuItem key={soc.id} value={soc}>
          {soc.name}
        </MenuItem>
      ))
    ) : (
      <MDTypography variant="text" sx={{ color: "#2b85eb" }}>
        No Courses !
      </MDTypography>
    );
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
          Add Department
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
              label="Department Name"
              variant="outlined"
              fullWidth
              name="nom"
              onChange={(e) => handleChange(e)}
              error={formErrors.course}
            />
            <FormHelperText error>{formErrors.course}</FormHelperText>
          </MDBox>

            <MDBox mb={2} ml={2} sx={{ width: "50%" }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">
                  Course Name
                </InputLabel>
                <Select
                  name="societe"
                  sx={{ height: 45 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={societe}
                  label="Age"
                  onChange={(e) => handleSelectedSociete(e)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 150,
                      },
                    },
                  }}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Societe Name"
                      error={formErrors.course}
                    />
                  }
                >
                  {societes_ToBe_Selected}
                </Select>
                <FormHelperText error>{formErrors.course}</FormHelperText>
              </FormControl>
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

export default AddDepartement;
