import axios from "services/authAxios";
import { useEffect, useState } from "react";
import { graphsRoute } from "utils/APIRoutes";

const CompaniesGraph = () => {
  const [allCompaniesData, setAllCompaniesData] = useState([]);

  useEffect(() => {
    const getCompaniesData = async (type, length) => {
      const { data } = await axios.post(graphsRoute, {
        model: type,
        length: length,
      });
      setAllCompaniesData(data.results);
    };
    getCompaniesData("societe", 7).then((data) => (graph.datasets.data = data));
  }, []);

  let graph = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: {
      label: "Companies",
      data: allCompaniesData,
    },
  };

  return graph;
};

export default CompaniesGraph;
