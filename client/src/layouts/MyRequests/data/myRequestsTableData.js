// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

// @mui icons
import Icon from "@mui/material/Icon";

// Api Endpoint
import { baseURL } from "utils/APIRoutes";

export default function Data() {
  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={`${baseURL}/${image}`} name={name} size="sm" />
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
        Header: "Course Name",
        accessor: "author",
        width: "25%",
        align: "left",
      },
      {
        Header: "Provider",
        accessor: "provider",
        align: "center",
        width: "25%",
      },
      {
        Header: "Response",
        accessor: "response",
        align: "center",
        width: "25%",
      },
    ],

    rows: [],
  };

  // try {
  //   allPartners.map((partner) =>
  //     partners.rows.push({
  //       author: <Company image={partner.image} name={partner.nom} />,
  //       Number_of_added_courses: (
  //         <MDTypography variant="caption" color="text" fontWeight="medium">
  //           {partner.course_num}
  //         </MDTypography>
  //       ),
  //     })
  //   );
  // } catch (error) {}

  return partners;
}
