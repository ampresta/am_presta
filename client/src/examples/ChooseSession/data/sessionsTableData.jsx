// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// React Hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Api Endpoint
import axios from "services/authAxios";
import { baseURL } from "utils/APIRoutes";
import { SessionsofSociete } from "utils/APIRoutes";
import { AcceptRequestRoute } from "utils/APIRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

export default function Data(cours, collab) {
  let navigate = useNavigate();

  const [allSessions, setAllSessions] = useState([]);
  const [checked, setChecked] = useState(0);

  const [controller] = useMaterialUIController();

  const { updater } = controller;

  useEffect(() => {
    const getAllSessions = async () => {
      const { data } = await axios.post(SessionsofSociete, {
        cours,
      });
      console.log(allSessions);
      setAllSessions(data);
    };
    getAllSessions();
  }, [updater]);

  console.log(allSessions);

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
  const InputCheckBox = ({ id }) => {
    const handleCheckboxChange = (e) => {
      if (e.target.checked) {
        setChecked(id);
      }
    };

    return <input type="checkbox" onClick={handleCheckboxChange} />;
  };
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

  sessions.SubmitButton = async () => {
    console.log(collab, checked);
    const { data } = await axios.post(AcceptRequestRoute, {
      session: checked,
      collab: collab,
      request: true,
    });
    console.log(data);
    if (data.status) {
      navigate("/sessions");
    } else {
      alert(data.msg);
    }
  };

  if (allSessions.length === 0) {
    sessions.rows.push({ author: "No Sessions Available" });
  } else {
    allSessions.map((session) =>
      sessions.rows.push({
        check: <InputCheckBox id={session.id}></InputCheckBox>,
        author: <Company image={session.Cour.image} name={session.nom} />,
      })
    );
  }

  return sessions;
}
