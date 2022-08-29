import axios from "services/authAxios";
import { useEffect, useState } from "react";
import { graphsSocRoute } from "utils/APIRoutes";

const CompaniesGraph = () => {
  const [allCompaniesData, setAllCompaniesData] = useState([]);

  useEffect(() => {
    const getCompaniesData = async () => {
      const { data } = await axios.post(graphsSocRoute);
      if (data.status) {
        setAllCompaniesData(data);
        console.log("heet", data);
      }
    };
    getCompaniesData();
  }, []);

  console.log("heet", allCompaniesData);
  const values = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Courses",
        color: "success",
        data: [50, 40, 300, 220, 500, 250, 400, 230, 400],
        tension: 0,
        pointRadius: 3,
        borderWidth: 4,
        backgroundColor: "transparent",
        fill: true,
        pointBackgroundColor: "#1A73E8",
        borderColor: "#1A73E8",
        maxBarThickness: 6,
      },
      {
        label: "Total Sessions",
        color: "info",
        data: [30, 90, 40, 140, 290, 290, 340, 230, 200],
        tension: 0,
        pointRadius: 3,
        borderWidth: 4,
        backgroundColor: "transparent",
        fill: true,
        pointBackgroundColor: "#344767",
        borderColor: "#344767",
        maxBarThickness: 6,
      },
    ],
  };

  return values;
};

export default CompaniesGraph;
