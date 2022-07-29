// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// @mui icons
import Icon from "@mui/material/Icon";

// axios
import axios from "axios";

//Api Routes

// Images

function Data() {


  
  
   
  let table = {
    columns: [
      {
        Header: "Company Name",
        accessor: "author",
        width: "45%",
        align: "left",
      },
      { Header: "manager", accessor: "manager", align: "center" },
      { Header: "date", accessor: "date", align: "center" },
    ],

  }
  return table
}

export default Data;
