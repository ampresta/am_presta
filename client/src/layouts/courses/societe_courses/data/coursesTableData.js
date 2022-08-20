/* eslint-disable eqeqeq */
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// React Hooks
import { useState, useEffect } from "react";

// Api Endpoint
import { allCompanyCoursesRoute, baseURL } from "utils/APIRoutes";

// import axios from "services/authAxios";
import axiosAuth from "services/authAxios";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

export default function Data() {
  const [allCourses, setAllCourses] = useState([]);

  const [controller] = useMaterialUIController();

  const { updater } = controller;

  useEffect(() => {
    const getAllCourses = async () => {
      const { data } = await axiosAuth.get(allCompanyCoursesRoute);
      console.log(data);
      setAllCourses(data.cours);
    };
    getAllCourses();
  }, [updater]);

  const Company = ({ image, name, company }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={`${baseURL}/${image}`} name={name} size="sm" />
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
    ],

    rows: [],

    rawData: allCourses,
  };

  allCourses.map((course) =>
    courses.rows.push({
      author: (
        <Company
          image={course.image}
          name={course.nom}
          company={handleProvider(course.Provider)}
        />
      ),
      enrolled: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {course.collabs}
        </MDTypography>
      ),
      number_of_sessions: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
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
    })
  );

  return courses;
}
