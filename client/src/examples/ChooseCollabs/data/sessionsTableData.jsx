// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import Checkbox from "@mui/material/Checkbox";

// React Hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Api Endpoint
import axios from "services/authAxios";

// import APIRoutes
import { baseURL, browseCollabsRoute } from "utils/APIRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";
import { toggleArrayItem } from "utils/Helper";
import { addCollabsSessionRoute } from "utils/APIRoutes";
import { browseCollabsOutOfSessionRoute } from "utils/APIRoutes";

export default function Data(session) {
  console.log("session", session);

  let navigate = useNavigate();

  const [allCollabs, setAllCollabs] = useState([]);
  const [checked, setChecked] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const [controller] = useMaterialUIController();

  const { updater } = controller;

  useEffect(() => {
    const getAllCollabs = async () => {
      const { data } = await axios.get(browseCollabsOutOfSessionRoute);
      setAllCollabs((prev) => data);
    };
    getAllCollabs();
  }, [updater]);

  console.log(allCollabs);

  const Company = ({ name, image }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={`${baseURL}/${image}`} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  let collabs = {
    columns: [
      {
        Header: "",
        accessor: "check",
        width: "3%",
        align: "left",
      },
      {
        Header: "Profile",
        accessor: "author",
        width: "3%",
        align: "left",
      },
      {
        Header: "Full Name",
        accessor: "nom",
        width: "20%",
        align: "left",
      },
      {
        Header: "Number of Sessions",
        accessor: "session",
        align: "center",
        width: "15%",
      },
      {
        Header: "Number of Certifs",
        accessor: "certif",
        align: "center",
        width: "15%",
      },
      {
        Header: "Departmenet",
        accessor: "departmenet",
        align: "center",
        width: "30%",
      },
    ],

    rows: [],
  };

  collabs.SubmitButton = () => {
    checked.map(async (collab) => {
      const { data } = await axios.post(addCollabsSessionRoute, {
        session,
        collab,
      });
      console.log(data);

      // if (data.status) {
      //   navigate("/sessions");
      // } else {
      //   alert(data.msg);
      // }
    });
  };

  if (allCollabs.length === 0 || !Array.isArray(allCollabs)) {
    collabs.rows.push({ author: "No Collaborators Available" });
  }
  else {
    // collabs.columns[0].Header = (
    //   <Checkbox
    //     onChange={(e) => {
    //       allCollabs.map((collab) =>
    //         setChecked(toggleArrayItem(collab.id, checked))
    //       );
    //       checked.length === 0 ? setIsChecked(false) : setIsChecked(true);
    //     }}
    //   ></Checkbox>
    // );

    allCollabs.map((collab) =>
      collabs.rows.push({
        check: (
          <Checkbox
            onChange={(e) => {
              setChecked(toggleArrayItem(collab.id, checked));
              checked.length === 0 ? setIsChecked(false) : setIsChecked(true);
            }}
          ></Checkbox>
        ),
        author: <Company image={collab.image} />,
        nom: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {`${collab.nom} ${collab.prenom}`}
          </MDTypography>
        ),
        session: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {collab.session_count}
          </MDTypography>
        ),
        certif: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {collab.certifs_count}
          </MDTypography>
        ),
      })
    );
  }

  collabs.isChecked = isChecked;
  collabs.checked = checked;

  return collabs;
}
