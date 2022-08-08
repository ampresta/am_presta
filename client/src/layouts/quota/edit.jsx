// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FormHelperText from "@mui/material/FormHelperText";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

//import UseState Hook
import { useState } from "react";

// Axios
import axios from "axios";

import { useEffect } from "react";
import { allPartnersRoute } from "utils/APIRoutes";
import { AddQuotaRoute } from "utils/APIRoutes";

function AddQuota({ openAddModel }) {
  const [formErrors, setFormErrors] = useState({
    field: "",
  });

  const [providers, setProviders] = useState([
    {
      id: "",
      nom: "",
      quota: "",
    },
  ]);

  useEffect(() => {
    const getAllPartners = async () => {
      const { data } = await axios.get(allPartnersRoute);
      let temp = [];
      data.map((provider) =>
        temp.push({ id: provider.id, nom: provider.nom, quota: "" })
      );
      setProviders(temp);
    };
    getAllPartners();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setFormErrors(validate(course));

    // if (Object.keys(validate(course)).length === 0) {
    const quotas = [];
    providers.map((provider) =>
      quotas.push({
        provider: provider.id,
        societe: localStorage.getItem("companyID"),
        quota: provider.quota,
      })
    );
    const { data } = await axios.post(AddQuotaRoute, {
      quotas,
    });
    if (data.status) {
      openAddModel(false);
      window.location.reload();
    } else {
      alert(data.msg);
    }
  };

  const handleChange = (index, event) => {
    const quota = event.target.value;
    const values = [...providers];
    values[index].quota = quota;
    setProviders(values);
  };

  // const validate = (values) => {
  //   const errors = {};
  //   if (!values.field) {
  //     errors.field = "This field is required !";
  //   }

  //   return errors;
  // };

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
          Add Quota
        </MDTypography>

        <MDButton
          variant="gradient"
          color="dark"
          size="small"
          iconOnly
          onClick={() => openAddModel(false)}
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
          {providers.map((provider, index) => {
            return (
              <MDBox display="flex" key={provider.id}>
                <MDBox mb={2} mr={2} s sx={{ width: "50%" }}>
                  <MDInput
                    type="text"
                    value={provider.nom}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                    //   error={formErrors.coursename}
                  />
                  {/* <FormHelperText error sx={{ ml: 2 }}>
              {formErrors.coursename}
            </FormHelperText> */}
                </MDBox>

                <MDBox mb={2} ml={2} sx={{ width: "50%" }}>
                  <MDInput
                    type="number"
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    name="quota"
                    onChange={(event) => handleChange(index, event)}
                  />
                  {/* <FormHelperText error sx={{ ml: 2 }}>
              {formErrors.coursename}
            </FormHelperText> */}
                </MDBox>
              </MDBox>
            );
          })}

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

export default AddQuota;
