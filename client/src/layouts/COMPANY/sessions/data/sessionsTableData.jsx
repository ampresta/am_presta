// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// @mui icons
import Icon from "@mui/material/Icon";

// React Hooks
import { useState, useEffect } from "react";

// Api Endpoint
import authService from "services/auth.service";
import axios from "axios";
import { allSessionsRoute, baseURL } from "utils/APIRoutes";
import { fontSize } from "@mui/system";
import { dateFormat } from "utils/Helper";

// Axios

export default function Data() {
  const [allSessions, setAllSessions] = useState([]);

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
    
  }, []);

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

  const Period = ({debut, fin}) => (
    <div style={{ display: "flex" }}>

      <div className="keys" style={{marginRight: "0.5rem", textAlign: "right  "}}>
        <span style={{fontSize: "0.75rem", display: "block", fontWeight: "Bold"}}>From: </span >
        <span style={{fontSize: "0.75rem", fontWeight: "Bold"}}>To: </span >
      </div>
      <div className="values" style={{color: "blue"}}>
        <span style={{fontSize: "0.75rem", display: "block", fontWeight: "Bold"}}>{dateFormat(debut)}</span >
        <span style={{fontSize: "0.75rem", fontWeight: "Bold"}}>{dateFormat(fin)}</span >
      </div>
    </div>
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
  };

  allSessions.map((session) =>
    sessions.rows.push({
      author: (
        <Company
          image={session.Cour.image}
          name={session.nom}
          // company={handleProvider(session.Provider)}
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
      certified_students: (
        <div>progress bar completed</div>
        // <Progress
        //   color="info"
        //   value={
        //     session.collabs === 0
        //       ? 0
        //       : Math.floor(100 * (session.collabs_fin / session.collabs))
        //   }
        // />
      ),
      period: (
        <Period
          debut={session.datedebut}
          fin={session.datefin} />
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

  return sessions;
}
