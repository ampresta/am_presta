// react-router-dom components
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

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

//react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "utils/APIRoutes";
import { useEffect } from "react";
import { allPartnersRoute } from "utils/APIRoutes";
import { addCourssRoute } from "utils/APIRoutes";

function AddCourses({ closeAddModel }) {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "dark",
  };

  const [course, setCourse] = useState({
    nom: "",
    provider: {
      id: "",
      name: "",
    },
    description: "",
  });

  const [selectedProvider, setSelectedProvider] = useState({
    nom: "",
    id: "",
  });

  const [providers, setProviders] = useState([
    {
      id: "",
      nom: "",
    },
  ]);

  useEffect(() => {
    const getAllPartners = async () => {
      const { data } = await axios.get(allPartnersRoute);
      let temp = [];
      data.map((provider) => temp.push({ id: provider.id, nom: provider.nom }));
      setProviders(temp);
    };
    getAllPartners();
  }, []);

  const handleSubmit = async (event) => {
    const { nom, provider, description } = course;
    event.preventDefault();
    if (validateData()) {
      const { data } = await axios.post(addCourssRoute, {
        nom,
        provider: provider.id,
        description,
      });
      if (data.status) {
        navigate("/dashboard");
      } else {
        toast.error(data.msg, toastOptions);
      }
    }
  };

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setCourse((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleSelectedProvider = (event) => {
    const provider = event.target.value;
    setCourse((prev) => ({ ...prev, provider }));
    setSelectedProvider(provider);
  };

  const validateData = () => {
    const { nom, provider } = course;

    if (nom.length === 0) {
      toast.error("Course name is required", toastOptions);
      return false;
    }

    if (provider.nom.length === 0) {
      toast.error("Provider is required", toastOptions);
      return false;
    }

    return true;
  };

  const names = ["Huawei", "Cisco", "Rachid", "Morad"];

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
          Add Course
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
            <MDBox mb={2} mr={2} s sx={{ width: "50%" }}>
              <MDInput
                type="text"
                label="Course Name"
                variant="outlined"
                fullWidth
                name="nom"
                onChange={(e) => handleChange(e)}
              />
            </MDBox>

            <MDBox mb={2} ml={2} sx={{ width: "50%" }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Provider</InputLabel>
                <Select
                  name="provider"
                  sx={{ height: 45 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedProvider.name}
                  label="Age"
                  onChange={(e) => handleSelectedProvider(e)}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Provider" />
                  }
                >
                  {providers.map((provider) => (
                    <MenuItem key={provider.id} value={provider}>
                      {provider.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MDBox>
          </MDBox>

          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Description"
              variant="outlined"
              name="description"
              fullWidth
              onChange={(e) => handleChange(e)}
            />
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
      <ToastContainer />
    </Card>
  );
}

export default AddCourses;
