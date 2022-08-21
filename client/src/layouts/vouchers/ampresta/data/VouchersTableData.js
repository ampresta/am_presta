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
import { baseURL, DeleteInstances } from "utils/APIRoutes";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";
import { browseVouchersAdminRoute } from "utils/APIRoutes";

export default function Data() {
  const [allVouchers, setAllVouchers] = useState([]);
  const [confirmModel, setConfirmModel] = useState(false);
  const [tempPartnerId, setTempPartnerId] = useState(0);

  const [controller] = useMaterialUIController();

  const { updater } = controller;

  useEffect(() => {
    const getAllVouchers = async () => {
      const { data } = await axiosAuth.get(browseVouchersAdminRoute);
      setAllVouchers((prev) => data);
    };
    getAllVouchers();
  }, [updater]);

  const handleDelete = async (id) => {
    const { data } = await axiosAuth.post(DeleteInstances, {
      model: "Voucher",
      id: id,
    });
    if (data.status) {
      setAllVouchers(allVouchers.filter((voucher) => voucher.id !== id));
      setConfirmModel(!confirmModel);
    } else {
      alert(data.msg);
    }
  };

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

  let vouchers = {
    columns: [
      {
        Header: "Provider",
        accessor: "provider",
        width: "10%",
        align: "left",
      },
      {
        Header: "Societe",
        accessor: "societe",
        width: "10%",
        align: "center",
      },
      {
        Header: "Value",
        accessor: "value",
        width: "10%",
        align: "center",
      },
      { Header: "edit", accessor: "edit", align: "center", width: "3%" },
      { Header: "delete", accessor: "delete", align: "center", width: "3%" },
    ],

    rows: [],
    confirmation: confirmModel && (
      <ConfirmPopup
        title={"Are you sure you want to delete this provider ?"}
        open={confirmModel}
        onConfirmPopup={() => setConfirmModel(!confirmModel)}
        handleDetele={handleDelete}
        Id_Item={tempPartnerId}
      />
    ),

    rawData: allVouchers,
  };
  try {
    allVouchers.map((voucher) =>
      vouchers.rows.push({
        provider: (
          <Company name={voucher.Provider.nom} image={voucher.Provider.image} />
        ),

        societe: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {voucher.Societe.name}
          </MDTypography>
        ),
        value: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {voucher.code}
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
              setTempPartnerId(voucher.id);
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
  } catch (error) {}

  return vouchers;
}
