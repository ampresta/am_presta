// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";

// @mui icons
import Icon from "@mui/material/Icon";

// React Hooks
import { useState, useEffect } from "react";

import axios from "axios";
import {
  allSessionsRoute,
  baseURL,
  allPartnersRoute,
  DeleteInstances,
} from "utils/APIRoutes";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

import { dateFormat } from "utils/Helper";

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
    const config = {
      method: "get",
      url: allSessionsRoute,
      // headers: {
      //   'Authorization': `Bearer ${authService.getCurrentUser()}`,
      // }
    };

    const getAllSessions = async () => {
      const { data } = await axios(config);
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

  const Period = ({ debut, fin }) => (
    <MDBox style={{ display: "flex" }}>
      <MDBox style={{ marginRight: "0.5rem", textAlign: "right  " }}>
        <span
          style={{ fontSize: "0.75rem", display: "block", fontWeight: "Bold" }}
        >
          From:{" "}
        </span>
        <span style={{ fontSize: "0.75rem", fontWeight: "Bold" }}>To: </span>
      </MDBox>
      <MDBox color="info" variant="gradient" sx={{ backgroundColor: "none" }}>
        <span
          style={{ fontSize: "0.75rem", display: "block", fontWeight: "Bold" }}
        >
          {dateFormat(debut)}
        </span>
        <span style={{ fontSize: "0.75rem", fontWeight: "Bold" }}>
          {dateFormat(fin)}
        </span>
      </MDBox>
    </MDBox>
  );

  let sessions = {
    columns: [
      {
        Header: "Session Name",
        accessor: "author",
        width: "30%",
        align: "left",
      },
      {
        Header: "Cours",
        accessor: "cours",
        width: "15%",
        align: "left",
      },
      {
        Header: "Provider",
        accessor: "provider",
        width: "15%",
        align: "left",
      },
      {
        Header: "enrolled",
        accessor: "enrolled",
        align: "center",
        width: "15%",
      },
      {
        Header: "certified students",
        accessor: "certified_students",
        align: "center",
        width: "25%",
      },
      {
        Header: "Period",
        accessor: "period",
        align: "center",
        width: "15%",
      },
      { Header: "edit", accessor: "edit", align: "center" },
      { Header: "delete", accessor: "delete", align: "center" },
    ],

    rows: [],

    confirmation: confirmModel && (
      <ConfirmPopup
        title={"Are you sure you want to delete this session ?"}
        onConfirmPopup={() => setConfirmModel(!confirmModel)}
        handleDetele={handleDelete}
        Id_Item={tempSessionId}
      />
    ),

    ProvidersFilter: (
      <Grid container mt={1} rowSpacing={1}>
        {providers.map((provider) => (
          <Grid item xs={1.5} ml={3} key={provider.id}>
            <MDButton
              variant="outlined"
              size="small"
              color="success"
              sx={{ width: "100%" }}
              href={`https://www.google.com/search?q=${provider.nom}`}
              target="_blank"
            >
              {provider.nom}
            </MDButton>
          </Grid>
        ))}
      </Grid>
    ),
  };

  allSessions.map((session) =>
    sessions.rows.push({
      author: <Company image={session.Cour.image} name={session.nom} />,
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
      certified_students: (
        <Progress
          color="info"
          value={
            session.collabs == 0
              ? 0
              : Math.floor(100 * (session.collabs_fin / session.collabs))
          }
        />
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

  return sessions;
}
