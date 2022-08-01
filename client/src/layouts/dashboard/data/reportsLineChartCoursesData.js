import axios from "axios";
import { useEffect, useState } from "react";
import { graphsRoute } from "utils/APIRoutes";

const CoursesGraph = () => {
  const [allCoursesData, setAllCoursesData] = useState([]);

  useEffect(() => {
    const getData = async (type, length) => {
      const { data } = await axios.post(graphsRoute, {
        model: type,
        length: length,
      });
      setAllCoursesData(data.results);
    };
    getData("cours", 9).then((data) => (graphs.sales.datasets.data = data));
  }, []);

  let graphs = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: {
      label: "Courses",
      data: allCoursesData,
    },
  };

  return graphs;
};

export default CoursesGraph;
