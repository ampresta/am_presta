// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import company1 from "assets/images/huawei-logo.png";

//React hooks
import { useState, useEffect } from "react";

// Axios
import axios from "axios";

// Api Endpoint
import { allPartnersRoute } from "utils/APIRoutes";

export default function Data() {
  const [allPartners, setAllPartners] = useState([]);

  useEffect(() => {
    const getAllPartners = async () => {
      const { data } = await axios.get(allPartnersRoute);
      setAllPartners((prev) => data);
    };
    getAllPartners();
  }, []);

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

  let partners = {
    columns: [
      {
        Header: "Partner Name",
        accessor: "author",
        width: "45%",
        align: "left",
      },
      {
        Header: "Number of added courses",
        accessor: "Number_of_added_courses",
        align: "center",
        width: "30%",
      },
      { Header: "edit", accessor: "edit", align: "center" },
      { Header: "delete", accessor: "delete", align: "center" },
    ],

    rows: [],
  };

  allPartners.map((partner) =>
    partners.rows.push({
      author: <Company image={partner.image} name={partner.nom} />,
      Number_of_added_courses: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {partner.course_num}
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
    })
  );

  return partners;
}
