import axios from "axios"
import { graphsRoute } from "utils/APIRoutes";


const getData = async (type, length) => {
  const {data} = await axios.post(graphsRoute, {
    model: type,
    "length": length
  })
  return data.results;
}

let graphs = {
  sales: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: {
      label: "Courses",
      data: getData("cours", 9).then(data => graphs.sales.datasets.data = data)
    },
  },
  tasks: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: {
      label: "Desktop apps",
      data: getData("cours", 9).then(data => graphs.tasks.datasets.data = data)
    },
  },
};

export default graphs
