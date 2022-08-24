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
import axiosAuth from "services/authAxios";
import { allRequestsRoute, baseURL } from "utils/APIRoutes";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setOpenRequestModel } from "context";

// ChooseSession
import ChooseSession from "../ChooseSession";
import { RefuseRequestRoute } from "utils/APIRoutes";

export default function Data() {
  // temp data for static display

  const [allRequests, setAllRequests] = useState([]);
  const [confirmModel, setConfirmModel] = useState(false);
  const [tempCourseId, setTempCourseId] = useState(0);

  const [confirmCourseId, setconfirmCourseId] = useState(0);
  const [collabId, setcollabId] = useState(0);

  const [controller, dispatch] = useMaterialUIController();

  const { openRequestModel } = controller;

  useEffect(() => {
    const getAllRequests = async () => {
      const { data } = await axiosAuth.get(allRequestsRoute);
      setAllRequests(data);
    };
    getAllRequests();
  }, []);

  const handleDelete = async (id) => {
    const { data } = await axiosAuth.post(RefuseRequestRoute, {
      id: id,
    });
    if (data.status) {
      setAllRequests(allRequests.filter((course) => course.id !== id));
      setConfirmModel(!confirmModel);
    } else {
      alert(data.msg);
    }
  };

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={`${baseURL}/${image}`} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="caption" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Collaborator = ({ collab_name }) => (
    <MDBox>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {collab_name}
      </MDTypography>
    </MDBox>
  );

  let sessions = {
    columns: [
      {
        Header: "Collaborator Profile",
        accessor: "author",
        width: "25%",
        align: "left",
      },
      {
        Header: "Course Request",
        accessor: "collaborator",
        width: "25%",
        align: "center",
      },
      {
        Header: "Request Date",
        accessor: "enrolled",
        align: "center",
        width: "25%",
      },
      {
        Header: "Actions",
        accessor: "actions",
        align: "center",
        width: "25%",
      },
    ],

    rows: [],
    confirmation: confirmModel && (
      <ConfirmPopup
        title={"Are you sure you want to decline this request ?"}
        open={confirmModel}
        onConfirmPopup={() => setConfirmModel(!confirmModel)}
        handleDetele={handleDelete}
        Id_Item={tempCourseId}
      />
    ),
    sessions: openRequestModel && (
      <ChooseSession
        cours={confirmCourseId}
        collab={collabId}
        Id_Item={tempCourseId}
      />
    ),
  };

  console.log(allRequests);

  allRequests.map((request) =>
    sessions.rows.push({
      author: (
        <Company
          image={request.Collaborateur.image}
          name={`${request.Collaborateur.nom} ${request.Collaborateur.prenom}`}
        />
      ),
      collaborator: <Collaborator collab_name={request.Cour.nom} />,
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
      actions: (
        <>
          <MDButton
            variant="text"
            onClick={() => {
              setcollabId(request.CollaborateurId);
              setconfirmCourseId(request.CourId);
              setOpenRequestModel(dispatch, !openRequestModel);
            }}
          >
            <Icon fontSize="small" color="success">
              check
            </Icon>
          </MDButton>

          <MDButton
            variant="text"
            onClick={() => {
              setConfirmModel(!confirmModel);
              setTempCourseId(request.id);
            }}
          >
            <Icon fontSize="large" color="primary">
              close
            </Icon>
          </MDButton>
        </>
      ),
    })
  );

  return sessions;
}
