// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// React Hooks
import { useState, useEffect } from "react";

// Api Endpoint
import axios from "axios";
import { baseURL } from "utils/APIRoutes";

export default function Data() {
  // temp data for static display
  const allRequests = [
    {
      id: 51,
      image: null,
      nom: "HCIA-Big Data",
      dateRequest: "2022 / 08 / 26",
      Provider: { nom: "Huawei" },
      numberRequest: 2,
    },
    {
      id: 28,
      image: null,
      nom: "HCIA-5G",
      dateRequest: "2022 / 07 / 27",
      Provider: { nom: "Huawei" },
      numberRequest: 1,
    },
  ];

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

  let sessions = {
    columns: [
      {
        Header: "Course Name",
        accessor: "author",
        width: "30%",
        align: "left",
      },
      {
        Header: "Number of Requests",
        accessor: "enrolled",
        align: "center",
        width: "30%",
      },
      {
        Header: "Request Date",
        accessor: "date",
        align: "center",
        width: "30%",
      },
    ],

    rows: [],
  };

  allRequests.map((request) =>
    sessions.rows.push({
      author: (
        <Company
          image={request.image}
          name={request.nom}
          company={request.Provider.nom}
        />
      ),
      enrolled: (
        <MDTypography
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {request.numberRequest}
        </MDTypography>
      ),
      date: (
        <MDTypography
          component="a"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {request.dateRequest}
        </MDTypography>
      ),
    })
  );

  return sessions;
}
