// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

//React hooks
import { useState, useEffect } from "react";

// Axios
import axios from "services/authAxios";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";

// Api Endpoint
import { baseURL, SessionGraph, SessionCollabRoute, DeleteInstances } from "utils/APIRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";
import { dateFormat } from "utils/Helper";
import MDButton from "components/MDButton";

import { useParams } from "react-router-dom";


export default function Data() {
  const [allCollabs, setAllCollabs] = useState([]);
  const [confirmModel, setConfirmModel] = useState(false);
  const [controller] = useMaterialUIController();
  const [tempCourseId, setTempCourseId] = useState(0);

  const { updater } = controller;
  
  const { id } = useParams();
  
  useEffect(() => {
    const getCollab = async () => {
      const { data } = await axios.post(SessionCollabRoute, {
        sess: id,
      });
      // console.log("data");
      console.log(data);
      setAllCollabs(data.collab);
    };
    getCollab();
  }, [updater]);

  const handleDelete = async (id) => {
    const { data } = await axios.post(DeleteInstances, {
      model: "cours",
      id: id,
    });
    if (data.status) {
      setAllCollabs(allCollabs.filter((course) => course.id !== id));
      setConfirmModel(!confirmModel);
    } else {
      alert(data.msg);
    }
  };

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
        Header: "Date Debut",
        accessor: "fin_cours",
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

    rawData: allCollabs,

    confirmation: confirmModel && (
      <ConfirmPopup
        title={"Are you sure you want to delete this course ?"}
        onConfirmPopup={() => setConfirmModel(!confirmModel)}
        handleDetele={handleDelete}
        Id_Item={tempCourseId}
      />
    ),
  };

  allCollabs.map((collab) =>
    sessionsDetails.rows.push({
      author: (
        <Company
          image={allCollabs.length > 0 && collab.image}
          name={allCollabs.length > 0 && ` ${collab.nom} ${collab.prenom}`}
        />
      ),
      fin_cours: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {dateFormat(collab.Session_Collabs[0].createdAt)}
        </MDTypography>
      ),
      status: (
        <>
          {collab.Session_Collabs[0].certifs ? (
            <MDBadge
              badgeContent="Certified"
              color="success"
              size="lg"
              gradiant
            />
          ) : collab.Session_Collabs[0].fincourse ? (
            <MDBadge badgeContent="Finished" color="dark" size="lg" />
          ) : (
            <MDBadge badgeContent="Ongoing" color="info" size="lg" gradiant />
          )}{" "}
        </>
      ),
      proof: <MDButton color="info">proof</MDButton>,
    })
  );

  return sessionsDetails;
}
