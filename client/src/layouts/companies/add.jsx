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

//import UseState Hook
import { useState } from "react";

// Axios
import axios from "axios";

//react-toastify
import { ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "utils/APIRoutes";
import { uploadRoute } from "utils/APIRoutes";
import { companyIdBynameRoute } from "utils/APIRoutes";

function AddCompanies({ closeAddModel }) {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "dark",
  };

  const [details, setDetails] = useState({
    username: "",
    f_name: "",
    l_name: "",
    comapany: "",
    email: "",
    password: "",
    c_password: "",
    image: "",
    id: "",
  });

  const getCompanyID = async (name) => {
    const { data } = await axios.post(companyIdBynameRoute, {name})
    setDetails(prev => ({...prev, id: data.id}))
  }

  const handleSubmit = async (event) => {
    const {username, f_name, l_name, email, comapany, password, image, id } = details
    event.preventDefault();
    if (validateData()) {
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password, 
        nom: f_name,
        prenom: l_name,
        societe: comapany
      });
      if (data.status) {
        // getCompanyID(comapany).then(data => console.log(data))
        // const imageData = await axios.post(uploadRoute, {
        //   image,
        //   id,
        //   model: "societe"
        // });

        // console.log(imageData);
        
        navigate("/dashboard");
      } else {
        toast.error(data.msg, toastOptions)
      }
    }
   
  };

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setDetails((prev) => { 
      return {...prev, [key]: value}
    });
  };

  const handleFileupload = event => {
    console.log(event.target.files[0]);
    setDetails(prev => ({...prev, image: event.target.files[0].name}))
  }

  const validateData = () => {
    const {username, f_name, l_name, email, comapany, password, c_password } = details
    if (username.length < 3) {
      toast.error("Username should be of length greater then 3", toastOptions)
      return false
    }
    if (f_name.length < 3) {
      return false
    }
    if (l_name.length < 3) {
      return false
    }
    if (email.length === "") {
      return false
    }
    if (comapany.length === "") {
      return false
    }
    if (password.length < 8) {
      return false
    }
    if (password !== c_password) {
      toast.error("Password and Confirm password should be the same", toastOptions)
      return false
    }
    return true
  }

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
          Company Register
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
              label="Username"
              variant="outlined"
              fullWidth
              name="username"
              onChange={(e) => handleChange(e)}
            />
          </MDBox>

          <MDBox display="flex">
            <MDBox mb={2} mr={2} sx={{ width: "50%" }}>
              <MDInput
                type="text"
                label="First Name"
                variant="outlined"
                name="f_name"
                onChange={(e) => handleChange(e)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2} ml={2} sx={{ width: "50%" }}>
              <MDInput
                type="text"
                label="Last Name"
                name="l_name"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                fullWidth
              />
            </MDBox>
          </MDBox>

          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Company Name"
              name="comapany"
              variant="outlined"
              fullWidth
              onChange={(e) => handleChange(e)}
            />
          </MDBox>

          <MDBox mb={2}>
            <MDInput
              type="email"
              label="Email"
              variant="outlined"
              name="email"
              fullWidth
              onChange={(e) => handleChange(e)}
            />
          </MDBox>

          <MDBox display="flex">
            <MDBox mb={2} mr={2} sx={{ width: "50%" }}>
              <MDInput
                type="password"
                label="Password"
                variant="outlined"
                name="password"
                onChange={(e) => handleChange(e)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2} ml={2} sx={{ width: "50%" }}>
              <MDInput
                type="password"
                label="Confirm Password"
                variant="outlined"
                name="c_password"
                onChange={(e) => handleChange(e)}
                fullWidth
              />
            </MDBox>
          </MDBox>

          {/* <MDBox mb={2}>
            <MDInput
              type="file"
              label="Logo"
              variant="outlined"
              name="image"
              fullWidth
              onChange={(e) => handleChange(e)}
            />
          </MDBox> */}

          <input type="file" name="image" onChange={(e) => handleFileupload(e)}/>

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
      <ToastContainer/>
    </Card>
  );
}

export default AddCompanies;
