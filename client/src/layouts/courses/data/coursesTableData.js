// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import MDButton from "components/MDButton";

// @mui icons
import Icon from "@mui/material/Icon";

// React Hooks
import { useState, useEffect } from "react";

// Api Endpoint
// import axios from "services/authAxios";

import { allCoursesRoute, baseURL, DeleteInstances } from "utils/APIRoutes";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";
import axiosAuth from "services/authAxios";

export default function Data() {
  const [allCourses, setAllCourses] = useState([]);
  const [confirmModel, setConfirmModel] = useState(false);
  const [tempCourseId, setTempCourseId] = useState(0);

  const [controller] = useMaterialUIController();

  const { updater } = controller;

  useEffect(() => {
    const getAllCourses = async () => {
      const { data } = await axiosAuth.get(allCoursesRoute);
      setAllCourses(data);
    };
    getAllCourses();
  }, [updater]);

  const handleDelete = async (id) => {
    const { data } = await axiosAuth.post(DeleteInstances, {
      model: "cours",
      id: id,
    });
    if (data.status) {
      setAllCourses(allCourses.filter((course) => course.id !== id));
      setConfirmModel(!confirmModel);
    } else {
      alert(data.msg);
    }
  };

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
      { Header: "edit", accessor: "edit", align: "center", width: "3%" },
      { Header: "delete", accessor: "delete", align: "center", width: "3%" },
    ],

    rows: [],

    confirmation: confirmModel && (
      <ConfirmPopup
        title={"Are you sure you want to delete this course ?"}
        onConfirmPopup={() => setConfirmModel(!confirmModel)}
        handleDetele={handleDelete}
        Id_Item={tempCourseId}
      />
    ),

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
      edit: (
        <MDTypography
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          <Icon fontSize="small">edit</Icon>
        </MDTypography>
      ),
      delete: (
        <MDButton
          variant="text"
          onClick={() => {
            setConfirmModel(!confirmModel);
            setTempCourseId(course.id);
          }}
        >
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <Icon fontSize="small" color="primary">
              delete
            </Icon>
          </MDTypography>
        </MDButton>
      ),
    })
  );

  return courses;
}
