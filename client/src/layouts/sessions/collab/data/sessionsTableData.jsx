/* eslint-disable eqeqeq */
// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

// React Hooks
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import axios from "services/authAxios";
import axios from "services/authAxios";
import {
  baseURL,
  allPartnersRoute,
  AllSessionsCollabRoute,
} from "utils/APIRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setOpenProofModel } from "context";
import { dateFormat } from "utils/Helper";
import { Icon } from "@mui/material";

export default function Data(setSessionId) {
  const [allSessions, setAllSessions] = useState([]);
  const [providers, setProviders] = useState([
    {
      id: "",
      nom: "",
    },
  ]);

  const [controller, dispatch] = useMaterialUIController();

  const { updater, openProofModel } = controller;

  useEffect(() => {
    const getAllSessions = async () => {
      const { data } = await axios.get(AllSessionsCollabRoute);
      setAllSessions(data);
      console.log("hadi data aba", data);
    };
    getAllSessions();
  }, [updater]);

  useEffect(() => {
    const getAllPartners = async () => {
      const { data } = await axios.get(allPartnersRoute);
      let temp = [];
      data.map((provider) => temp.push({ id: provider.id, nom: provider.nom }));
      setProviders(temp);
      console.log(temp);
    };
    getAllPartners();
  }, []);

  const Company = ({ id, image, name, company }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <img
        src={`${baseURL}/${image}`}
        alt={name}
        width="70px"
        height="auto"
        style={{ border: "2px solid #2b85eb" }}
      />
      <MDBox ml={2} lineHeight={1}>
        <Link to={`/sessions/details/${id}`}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {name}
          </MDTypography>
        </Link>
        <MDTypography variant="caption">{company}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Period = ({ debut, fin }) => (
    <MDBox display="flex" alignItems="center">
      <MDBox lineHeight={1.5} textAlign="right">
        <MDTypography variant="caption" fontWeight="medium">
          From :{" "}
        </MDTypography>
        <MDTypography variant="caption" fontWeight="medium" color="info">
          {dateFormat(debut)}
        </MDTypography>
        <br />
        <MDTypography variant="caption" fontWeight="medium">
          To :{" "}
        </MDTypography>
        <MDTypography variant="caption" fontWeight="medium" color="info">
          {dateFormat(fin)}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const getStatus = (collab, index) => {
    if (
      collab.Session_Collabs[0].certifs &&
      collab.Session_Collabs[0].certifs.status
    ) {
      return <MDBadge badgeContent="Certified" color="success" size="md" />;
    } else if (collab.Session_Collabs[0].certifs) {
      return <MDBadge badgeContent="Pending" color="warning" size="md" />;
    } else if (
      collab.Session_Collabs[0].fincourse &&
      collab.Session_Collabs[0].fincourse.status
    ) {
      return <MDBadge badgeContent="Finished" color="dark" size="md" />;
    } else if (collab.Session_Collabs[0].fincourse) {
      return (
        <MDBadge
          type="fincourse"
          badgeContent=" Course Finished"
          color="success"
          size="md"
          index={index}
        />
      );
    } else {
      return <MDBadge badgeContent="Studying" color="secondary" size="md" />;
    }
  };

  let sessions = {
    columns: [
      {
        Header: "Session Name",
        accessor: "author",
        width: "15%",
        align: "left",
      },
      {
        Header: "Cours",
        accessor: "cours",
        width: "10%",
        align: "center",
      },
      {
        Header: "Provider",
        accessor: "provider",
        width: "15%",
        align: "center",
      },
      {
        Header: "enrolled",
        accessor: "enrolled",
        align: "center",
        width: "5%",
      },
      {
        Header: "Period",
        accessor: "period",
        align: "center",
        width: "20%",
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
        width: "15%",
        align: "center",
      },
      {
        Header: "show proof",
        accessor: "show_proof",
        width: "25%",
        align: "center",
      },
    ],

    rows: [],

    ProvidersFilter: (
      <Grid container mt={1} ml={1} rowSpacing={1}>
        {providers.map((provider) => (
          <Grid
            item
            xs={1}
            md={1.5}
            lg={1}
            ml={{ xs: 3, lg: 2 }}
            key={provider.id}
          >
            <MDButton
              variant="outlined"
              size="small"
              color="success"
              sx={{ width: "100%" }}
              href={`https://www.google.com/search?q=${provider.nom}`}
              target="_blank"
              onClick={() => console.log(provider.id)}
            >
              {provider.nom}
            </MDButton>
          </Grid>
        ))}
      </Grid>
    ),
  };
  if (allSessions.length === 0 || !Array.isArray(allSessions)) {
    sessions.rows.push({ author: "No Sessions Available" });
  } else {
    allSessions.map((session, index) =>
      sessions.rows.push({
        author: (
          <Company
            id={session.id}
            image={session.Cour.image}
            name={session.nom}
          />
        ),
        cours: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {session.Cour.nom}
          </MDTypography>
        ),
        provider: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {session.Cour.Provider.nom}
          </MDTypography>
        ),
        enrolled: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {session.collabs}
          </MDTypography>
        ),
        status: getStatus(session, index),
        proof: (
          <MDButton
            variant="gradient"
            color="info"
            size="small"
            onClick={() => {
              setSessionId(session.id);
              setOpenProofModel(dispatch, !openProofModel);
            }}
            // disabled={session.Session_Collabs[index].fincourse.size !== 0}
          >
            &nbsp;Add Proof
          </MDButton>
        ),
        period: <Period debut={session.datedebut} fin={session.datefin} />,
        show_proof: (
          <MDButton variant="text">
            <MDTypography variant="caption" color="text" fontWeight="medium">
              <Icon fontSize="small">visibility</Icon>
            </MDTypography>
          </MDButton>
        ),
      })
    );
  }

  return sessions;
}
