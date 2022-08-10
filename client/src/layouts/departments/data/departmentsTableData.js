// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// @mui icons
import Icon from "@mui/material/Icon";

//React hooks
import { useState, useEffect } from "react";

// Axios
import axios from "services/authAxios";

// Api Endpoint
import { allDepartmentsRoute, DeleteInstances } from "utils/APIRoutes";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

export default function Data() {
  const [AllDepartements, setAllDepartements] = useState([]);
  const [confirmModel, setConfirmModel] = useState(false);
  const [tempDepartmentId, setTempDepartmentId] = useState(0);

  const [controller] = useMaterialUIController();

  const { updater } = controller;

  useEffect(() => {
    const getAllDepartements = async () => {
      const { data } = await axios.get(allDepartmentsRoute);
      console.log(data);
      setAllDepartements((prev) => data);
    };
    getAllDepartements();
  }, [updater]);

  const handleDelete = async (id) => {
    const { data } = await axios.post(DeleteInstances, {
      model: "Departement",
      id: id,
    });
    if (data.status) {
      setAllDepartements(
        AllDepartements.filter((departement) => departement.id !== id)
      );
      setConfirmModel(!confirmModel);
    } else {
      alert(data.msg);
    }
  };

  const Company = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  let departements = {
    columns: [
      {
        Header: "Department Name",
        accessor: "author",
        width: "25%",
        align: "center",
      },
      {
        Header: "Number of Students",
        accessor: "Number_of_students",
        align: "center",
        width: "30%",
      },
      {
        Header: "Number of challenges",
        accessor: "Number_of_challenges",
        align: "center",
        width: "20%",
      },
      { Header: "edit", accessor: "edit", align: "center", width: "3%" },
      { Header: "delete", accessor: "delete", align: "center", width: "3%" },
    ],

    rows: [],
    confirmation: confirmModel && (
      <ConfirmPopup
        title={"Are you sure you want to delete this department ?"}
        onConfirmPopup={() => setConfirmModel(!confirmModel)}
        handleDetele={handleDelete}
        Id_Item={tempDepartmentId}
      />
    ),
  };

  AllDepartements.map((department) =>
    departements.rows.push({
      author: <Company name={department.nom} />,
      Number_of_students: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {12}
        </MDTypography>
      ),
      Number_of_challenges: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {12}
        </MDTypography>
      ),
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
            setTempDepartmentId(department.id);
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

  return departements;
}
