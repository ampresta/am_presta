import axios from "services/authAxios";
import { useEffect, useState } from "react";
import { graphsRoute } from "utils/APIRoutes";

const PartnersGraph = () => {
  const [allPartnersData, setAllPartnersData] = useState([]);

  useEffect(() => {
    const getData = async (type, length) => {
      const { data } = await axios.post(graphsRoute, {
        model: type,
        length: length,
      });
      setAllPartnersData(data.results);
    };
    getData("provider", 9).then((data) => (graphs.datasets.data = data));
  }, []);

  let graphs = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: {
      label: "Partners",
      data: allPartnersData,
    },
  };

  return graphs;
};

export default PartnersGraph;
