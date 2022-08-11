// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

//React hooks
import { useState, useEffect } from "react";

// Axios
import axiosAuth from "services/authAxios";

// Api Endpoint
import { baseURL, allSessionsRoute } from "utils/APIRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

export default function Data() {
  const [allSessions, setAllSessions] = useState([]);

  const [controller] = useMaterialUIController();
  const { updater } = controller;

  useEffect(() => {
    const getAllSessions = async () => {
      const { data } = await axiosAuth.get(allSessionsRoute);
      setAllSessions((prev) => data);
    };
    getAllSessions();
  }, [updater]);

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

  let sessionsDetails = {
    columns: [
      {
        Header: "Collborators",
        accessor: "author",
        width: "45%",
        align: "left",
      },
    ],

    rows: [],
  };

  allSessions.map((session) =>
    sessionsDetails.rows.push({
      author: <Company image={session.Cour.image} name={session.nom} />,
    })
  );

  return sessionsDetails;
}
