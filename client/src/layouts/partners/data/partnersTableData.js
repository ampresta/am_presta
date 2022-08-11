// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

// @mui icons
import Icon from "@mui/material/Icon";

//React hooks
import { useState, useEffect } from "react";

// Axios
import axiosAuth from "services/authAxios";

// Api Endpoint
import { baseURL, allPartnersRoute, DeleteInstances } from "utils/APIRoutes";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

export default function Data() {
  const [allPartners, setAllPartners] = useState([]);
  const [confirmModel, setConfirmModel] = useState(false);
  const [tempPartnerId, setTempPartnerId] = useState(0);

  const [controller] = useMaterialUIController();

  const { updater } = controller;

  useEffect(() => {
    const getAllPartners = async () => {
      const { data } = await axiosAuth.get(allPartnersRoute);
      setAllPartners((prev) => data);
    };
    getAllPartners();
  }, [updater]);

  const handleDelete = async (id) => {
    const { data } = await axiosAuth.post(DeleteInstances, {
      model: "provider",
      id: id,
    });
    if (data.status) {
      setAllPartners(allPartners.filter((course) => course.id !== id));
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

  let partners = {
    columns: [
      {
        Header: "Partner Name",
        accessor: "author",
        width: "45%",
        align: "left",
      },
      {
        Header: "Number of added courses",
        accessor: "Number_of_added_courses",
        align: "center",
        width: "30%",
      },
      { Header: "edit", accessor: "edit", align: "center", width: "3%" },
      { Header: "delete", accessor: "delete", align: "center", width: "3%" },
    ],

    rows: [],
    confirmation: confirmModel && (
      <ConfirmPopup
        title={"Are you sure you want to delete this provider ?"}
        onConfirmPopup={() => setConfirmModel(!confirmModel)}
        handleDetele={handleDelete}
        Id_Item={tempPartnerId}
      />
    ),
  };

  allPartners.map((partner) =>
    partners.rows.push({
      author: <Company image={partner.image} name={partner.nom} />,
      Number_of_added_courses: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {partner.course_num}
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
            setTempPartnerId(partner.id);
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

  return partners;
}
