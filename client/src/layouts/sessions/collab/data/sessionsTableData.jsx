/* eslint-disable eqeqeq */
// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

// @mui icons
import Icon from "@mui/material/Icon";

// React Hooks
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "services/authAxios";
import axios from "services/authAxios";
import {
  baseURL,
  allPartnersRoute,
  DeleteInstances,
} from "utils/APIRoutes";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

import { dateFormat } from "utils/Helper";
import { AllSessionsCollabRoute } from "utils/APIRoutes";

export default function Data() {
  const [allSessions, setAllSessions] = useState([]);
  const [tempSessionId, setTempSessionId] = useState(0);
  const [confirmModel, setConfirmModel] = useState(false);
  const [providers, setProviders] = useState([
    {
      id: "",
      nom: "",
    },
  ]);

  const [controller] = useMaterialUIController();

  const { updater } = controller;

  useEffect(() => {
    const getAllSessions = async () => {
      const { data } = await axios.get(AllSessionsCollabRoute);
      setAllSessions(data);
    };
    getAllSessions();
  }, [updater]);

  useEffect(() => {
    const getAllPartners = async () => {
      const { data } = await axios.get(allPartnersRoute);
      let temp = [];
      data.map((provider) => temp.push({ id: provider.id, nom: provider.nom }));
      setProviders(temp);
    };
    getAllPartners();
  }, []);

  const handleDelete = async (id) => {
    const { data } = await axios.post(DeleteInstances, {
      model: "Session",
      id: id,
    });
    if (data.status) {
      setAllSessions(allSessions.filter((session) => session.id !== id));
      setConfirmModel(!confirmModel);
    } else {
      alert(data.msg);
    }
  };

  const Company = ({ id, image, name, company }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={`${baseURL}/${image}`} name={name} size="sm" />
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
      return (
        <MDButton
          size="small"
          variant="text"
          // onClick={(e) => handleProof(e)}
          typex="certifs"
          index={index}
        >
          <MDBadge badgeContent="Check Proof" color="success" size="md" />
        </MDButton>
      );
    } else if (
      collab.Session_Collabs[0].fincourse &&
      collab.Session_Collabs[0].fincourse.status
    ) {
      return <MDBadge badgeContent="Finished" color="dark" size="md" />;
    } else if (collab.Session_Collabs[0].fincourse) {
      return (
        <MDButton
          size="small"
          variant="text"
          // onClick={(e) => handleProof(e)}
          typex="fincourse"
          index={index}
        >
          <MDBadge
            type="fincourse"
            badgeContent="Check Proof"
            color="success"
            size="md"
            index={index}
          />
        </MDButton>
      );
    } else {
      return <MDBadge badgeContent="Studying" color="note" size="md" />;
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
        width: "15%",
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
        width: "15%",
      },
      {
        Header: "Period",
        accessor: "period",
        align: "center",
        width: "15%",
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
      { Header: "edit", accessor: "edit", align: "center", width: "2%" },
      { Header: "delete", accessor: "delete", align: "center", width: "2%" },
    ],

    rows: [],

    confirmation: confirmModel && (
      <ConfirmPopup
        title={"Are you sure you want to delete this session ?"}
        open={confirmModel}
        onConfirmPopup={() => setConfirmModel(!confirmModel)}
        handleDetele={handleDelete}
        Id_Item={tempSessionId}
      />
    ),

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
    allSessions.map((session) =>
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
        status: (
          <MDBadge badgeContent="Check Proof" color="success" size="md" />
        ),
        proof: (
          <MDBox display="flex">
            <MDBox>
              <MDButton
                variant="gradient"
                color="success"
                size="small"
                // onClick={() => asignVoucher(collab.Session_Collabs[0].id)}
              >
                &nbsp;Proof
              </MDButton>
            </MDBox>
          </MDBox>
        ),
        period: <Period debut={session.datedebut} fin={session.datefin} />,
        edit: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <Icon fontSize="small">edit</Icon>
          </MDTypography>
        ),
        delete: (
          <MDButton
            variant="text"
            onClick={() => {
              setConfirmModel(!confirmModel);
              setTempSessionId(session.id);
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
  }

  return sessions;
}
