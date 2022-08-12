// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

//React hooks
import { useState, useEffect } from "react";

// Axios
import axios from "services/authAxios";

// Api Endpoint
import { baseURL, SessionGraph, SessionCollabRoute } from "utils/APIRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";
import { dateFormat } from "utils/Helper";
import MDButton from "components/MDButton";

export default function Data() {
  const [allCollabs, setAllCollabs] = useState([]);

  const [controller] = useMaterialUIController();
  const { updater } = controller;

  useEffect(() => {
    const getCollab = async () => {
      const { data } = await axios.post(SessionCollabRoute);
      setAllCollabs(data);
    };
    getCollab();
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
        width: "20%",
        align: "left",
      },
      {
        Header: "fin cours",
        accessor: "fin_cours",
        width: "20%",
        align: "center",
      },
      {
        Header: "fin session",
        accessor: "fin_session",
        width: "20%",
        align: "center",
      },
      {
        Header: "status",
        accessor: "status",
        width: "10%",
        align: "center",
      },
      {
        Header: "proof",
        accessor: "proof",
        width: "10%",
        align: "center",
      },
    ],

    rows: [],
  };

  allCollabs.map((session) =>
    sessionsDetails.rows.push({
      author: <Company image={session.Cour.image} name={"Smhamad rachid"} />,
      fin_cours: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {dateFormat("20-08-2022")}
        </MDTypography>
      ),
      fin_session: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {dateFormat("31-08-2022")}
        </MDTypography>
      ),
      status: (
        <MDBadge badgeContent="Actif" color="success" size="lg" gradiant />
      ),
      proof: <MDButton color="info">proof</MDButton>,
    })
  );

  return sessionsDetails;
}
