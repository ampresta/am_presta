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

// Api Endpoint
import authService from "services/auth.service";
import axios from "axios";
import { allSessionsRoute, baseURL, allPartnersRoute } from "utils/APIRoutes";
import { dateFormat } from "utils/Helper";
import {SessionsofSociete} from "utils/APIRoutes";
import {AcceptRequestRoute} from "utils/APIRoutes";

export default function Data(cours,collab) {
  const [allSessions, setAllSessions] = useState([]);
  const [checked, setChecked] = useState(0);
  const [providers, setProviders] = useState([
    {
      id: "",
      nom: "",
    },
  ]);

  useEffect(() => {

    const getAllSessions = async () => {
      const { data } = await axios.post(SessionsofSociete,
	      {
		      cours
	      });
    console.log(allSessions);
      setAllSessions(data);
    };
    getAllSessions();
  },[]);

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
const InputCheckBox= ({id})=>{
	const handleCheckboxChange=(e)=> {
  if(e.target.checked){
	  setChecked(id);
  }
}

  return <input type="checkbox" onClick={handleCheckboxChange} />

}
  let sessions = {
    columns: [
      {
        Header: "",
        accessor: "check",
        width: "10%",
        align: "left",
      },
      {
        Header: "Session Name",
        accessor: "author",
        width: "90%",
        align: "left",
      },
    ],

    rows: [],

   };

sessions.SubmitButton  = async ()=>{
console.log(collab,checked);	
    const { data } = await axios.post(AcceptRequestRoute, {
	    session:checked,
     	 collab:collab,
	    request:true
    })
	console.log(data)
    if (data.status) {
	    console.log("done")
      // setAllRequests(allRequests.filter((course) => course.id !== id));
      // setConfirmModel(!confirmModel);
    } else {
      alert(data.msg);
    }
	}
 if (allSessions.length===0){
	 sessions.rows.push({author:"No records"})
 }
	else{
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
      check: (
     <InputCheckBox id={session.id}></InputCheckBox> 
      ),
    })
  );}

  return sessions;
}
