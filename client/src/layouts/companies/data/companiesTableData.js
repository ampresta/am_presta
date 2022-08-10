// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Endpoint
import { allCompaniesRoute, baseURL, DeleteInstances } from "utils/APIRoutes";

//React Hook
import { useState, useEffect } from "react";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

// Axios
import axios from "services/authAxios";
// @mui icons
import Icon from "@mui/material/Icon";
import { dateFormat } from "utils/Helper";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";
import MDButton from "components/MDButton";

export default function Data() {
  const [allCompanies, setAllCompanies] = useState([]);
  const [confirmModel, setConfirmModel] = useState(false);
  const [tempCompanyId, setTempCompanyId] = useState(0);

  const [controller] = useMaterialUIController();

  const { updater } = controller;

  useEffect(() => {
    const getAllCompanies = async () => {
      const { data } = await axios.get(allCompaniesRoute);
      setAllCompanies((prev) => data.msg);
    };
    getAllCompanies();
  }, [updater]);

  const handleDelete = async (id) => {
    const { data } = await axios.post(DeleteInstances, {
      model: "societe",
      id: id,
    });
    if (data.status) {
      setAllCompanies(allCompanies.filter((company) => company.id !== id));
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

  let companies = {
    columns: [
      {
        Header: "Company Name",
        accessor: "author",
        width: "40%",
        align: "left",
      },
      { Header: "manager", accessor: "manager", align: "center" },
      { Header: "date", accessor: "date", align: "center", width: "25%" },
      { Header: "edit", accessor: "edit", align: "center", width: "3%" },
      { Header: "delete", accessor: "delete", align: "center", width: "3%" },
    ],

    rows: [],

    confirmation: confirmModel && (
      <ConfirmPopup
        title={"Are you sure you want to delete this company ?"}
        onConfirmPopup={() => setConfirmModel(!confirmModel)}
        handleDetele={handleDelete}
        Id_Item={tempCompanyId}
      />
    ),
  };

  allCompanies.map((company) =>
    companies.rows.push({
      author: <Company image={company.image} name={company.name} />,
      manager: (
        <MDTypography
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {company.Collaborateurs[0].nom} {company.Collaborateurs[0].prenom}
        </MDTypography>
      ),
      date: (
        <MDTypography
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {dateFormat(company.createdAt)}
        </MDTypography>
      ),
      edit: (
        <MDTypography
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          <Icon fontSize="small">edit</Icon>
        </MDTypography>
      ),
      delete: (
        <MDButton
          variant="outlined"
          onClick={() => {
            setConfirmModel(!confirmModel);
            setTempCompanyId(company.id);
          }}
        >
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            <Icon fontSize="small" color="primary">
              delete
            </Icon>
          </MDTypography>
        </MDButton>
      ),
    })
  );

  return companies;
}
