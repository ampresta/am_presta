// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Endpoint
import { allCompaniesRoute } from "utils/APIRoutes";

//React Hook
import { useState, useEffect } from "react"

// Axios
import axios from "axios"

// @mui icons
import Icon from "@mui/material/Icon";

export default function Data() {

  const [allCompanies, setAllCompanies] = useState([])

  useEffect(() => {
    const getAllCompanies = async () => {
      const { data } = await axios.get(allCompaniesRoute)
      console.log(data.msg);
      setAllCompanies((prev) => data.msg)
  }
    getAllCompanies() 
  }, [])

  const dateFormat = (timestamp) => {
    return timestamp.split("T")[0].split("-").reverse().join(" / ")
  }


  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />  
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  let companies = {
    columns: [
      {
        Header: "Company Name",
        accessor: "author",
        width: "45%",
        align: "left",
      },
      { Header: "manager", accessor: "manager", align: "center" },
      { Header: "date", accessor: "date", align: "center" },
      { Header: "edit", accessor: "edit", align: "center" },
      { Header: "delete", accessor: "delete", align: "center" },
    ],

    rows: [],
  };

  allCompanies.map(company => (
    companies.rows.push(
  {
      author: <Company image="" name={company.name} />,
      manager: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {company.Collaborateurs[0].nom} {company.Collaborateurs[0].prenom}
        </MDTypography>
      ),
      date: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {dateFormat(company.createdAt)}
        </MDTypography>
      ),
      edit: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          <Icon fontSize="small">edit</Icon>
        </MDTypography>
      ),
      delete: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          <Icon fontSize="small" color="primary">
            delete
          </Icon>
        </MDTypography>
      ),
    },
    )
  ))

 
  return companies;
}
