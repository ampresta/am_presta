// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";

export default function Data() {
  const QuotaList = [
    { provider: "Huawei", quantite: "3" },
    { provider: "Cisco", quantite: "5" },
    { provider: "Oracle", quantite: "10" },
    { provider: "Cisco", quantite: "5" },
    { provider: "Oracle", quantite: "10" },
    
  ];

  let table = {
    columns: [
      {
        Header: "Provider",
        accessor: "provider",
        width: "50%",
        align: "center",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        width: "50%",
        align: "center",
      },
    ],
    rows: [],
  };

  QuotaList.map((quota) =>
    table.rows.push({
      provider: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {quota.provider}
        </MDTypography>
      ),
      quantity: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {quota.quantite}
        </MDTypography>
      ),
    })
  );

  return table;
}
