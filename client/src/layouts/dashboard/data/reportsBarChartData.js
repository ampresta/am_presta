import axios from "axios"
import { graphsRoute } from "utils/APIRoutes";



const getData = async (type, length) => {
  const { data } = await axios.post(graphsRoute, {
    model: type,
    "length": length
  })
  console.log(data);
  return data.results;
}

let graph = {
  labels: ["M", "T", "W", "T", "F", "S", "S"],
  datasets: {
    label: "Sales",
    data: getData("societe", 7).then(data => graph.datasets.data = data)
  },
};

export default graph




