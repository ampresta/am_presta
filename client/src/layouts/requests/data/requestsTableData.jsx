// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

import Icon from "@mui/material/Icon";
// React Hooks
import { useState, useEffect } from "react";

//Date Formater
import { dateFormat } from "utils/Helper";

// Api Endpoint
import axios from "axios";
import {
  allRequestsRoute,
  AcceptRequestRoute,
  baseURL,
  DeleteInstances,
} from "utils/APIRoutes";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";

// Sessions
import Sessions from "components/TablePopup";

export default function Data() {
  // temp data for static display

  const [allRequests, setAllRequests] = useState([]);
  const [confirmModel, setConfirmModel] = useState(false);
  const [tempCourseId, setTempCourseId] = useState(0);
  const [SessionModel, setSessionModel] = useState(false);
  const [confirmCourseId, setconfirmCourseId] = useState(0);
  const [collabId, setcollabId] = useState(0);

  useEffect(() => {
    const getAllRequests = async () => {
      const { data } = await axios.get(allRequestsRoute);
      console.log(data);
      setAllRequests(data);
    };
    getAllRequests();
  }, []);
  const handleDelete = async (id) => {
    console.log(DeleteInstances);
    const { data } = await axios.post(DeleteInstances, {
      model: "Request",
      id: id,
    });
    if (data.status) {
      setAllRequests(allRequests.filter((course) => course.id !== id));
      setConfirmModel(!confirmModel);
    } else {
      alert(data.msg);
    }
  };

  const Company = ({ image, name, cours_name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={`${baseURL}/${image}`} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{cours_name}</MDTypography>
      </MDBox>
    </MDBox>
  );

  let sessions = {
    columns: [
      {
        Header: "Collaborator Name",
        accessor: "author",
        width: "30%",
        align: "left",
      },
      {
        Header: "Request Date",
        accessor: "enrolled",
        align: "center",
        width: "30%",
      },
      {
        Header: "Action",
        accessor: "date",
        align: "center",
        width: "30%",
      },
    ],

    rows: [],
    confirmation: confirmModel && (
      <ConfirmPopup
        title={"Are you sure you want to delete this Request ?"}
        onConfirmPopup={() => setConfirmModel(!confirmModel)}
        handleDetele={handleDelete}
        IdCourse={tempCourseId}
      />
    ),
    sessions: SessionModel && (
      <Sessions
        cours={confirmCourseId}
        collab={collabId}
        onConfirmPopup={() => setSessionModel(!SessionModel)}
        handleDetele={handleDelete}
        IdCourse={tempCourseId}
      />
    ),
  };

  allRequests.map((request) =>
    sessions.rows.push({
      author: (
        <Company
          image={request.Collaborateur.image}
          name={`${request.Collaborateur.nom} ${request.Collaborateur.prenom}`}
          cours_name={request.Cour.nom}
        />
      ),
      enrolled: (
        <MDTypography
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {dateFormat(request.createdAt)}
        </MDTypography>
      ),
      date: (
        <>
          <MDButton
            variant="text"
            onClick={() => {
              setcollabId(request.CollaborateurId);
              setconfirmCourseId(request.CourId);
              setSessionModel(!SessionModel);
            }}
          >
            <MDTypography variant="caption" color="text" fontWeight="medium">
              <Icon fontSize="small" color="success">
                done
              </Icon>
            </MDTypography>
          </MDButton>
          <MDButton
            variant="text"
            onClick={() => {
              setConfirmModel(!confirmModel);
            }}
          >
            <MDTypography variant="caption" color="text" fontWeight="medium">
              <Icon fontSize="small" color="primary">
                delete
              </Icon>
            </MDTypography>
          </MDButton>
        </>
      ),
    })
  );

  return sessions;
}
