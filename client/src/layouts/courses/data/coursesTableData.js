// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import company1 from "assets/images/huawei-logo.png";

// React Hooks
import { useState, useEffect } from "react";

// Api Endpoint
import authService from "services/auth.service";
import axios from "axios";
import { allCoursesRoute } from "utils/APIRoutes";

// Axios

export default function Data() {
  const [allCourses, setAllPartners] = useState([]);

  useEffect(() => {
    const config = {
      method: "get",
      url: allCoursesRoute,
      // headers: {
      //   'Authorization': `Bearer ${authService.getCurrentUser()}`,
      // }
    };

    const getAllCourses = async () => {
      const { data } = await axios(config);
      setAllPartners(data);
    };
    getAllCourses();
  }, []);

  const Company = ({ image, name, company }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{company}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={1} width="7rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const handleProvider = (provider) => {
    if (provider === null) {
      return " ";
    } else {
      return provider.nom;
    }
  };

  let courses = {
    columns: [
      {
        Header: "Tiltle / Constructor",
        accessor: "author",
        width: "30%",
        align: "left",
      },
      {
        Header: "enrolled",
        accessor: "enrolled",
        align: "center",
        width: "15%",
      },
      {
        Header: "number of sessions",
        accessor: "number_of_sessions",
        align: "center",
        width: "15%",
      },
      {
        Header: "certified students",
        accessor: "certified_students",
        align: "center",
        width: "25%",
      },
      { Header: "edit", accessor: "edit", align: "center" },
      { Header: "delete", accessor: "delete", align: "center" },
    ],

    rows: [],
  };

  allCourses.map((course) =>
    courses.rows.push({
      author: (
        <Company
          image={company1}
          name={course.nom}
          company={handleProvider(course.Provider)}
        />
      ),
      enrolled: (
        <MDTypography
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {course.collabs}
        </MDTypography>
      ),
      number_of_sessions: (
        <MDTypography
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {course.sessions}
        </MDTypography>
      ),
      certified_students: (
        <Progress
          color="info"
          value={
            course.collabs == 0
              ? 0
              : Math.floor(100 * (course.collabs_fin / course.collabs))
          }
        />
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

  return courses;
}
