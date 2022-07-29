import axios from "axios"

import { topCoursesRoute } from "utils/APIRoutes";


const getAllCourses = async () => {
  const { data } = await axios.post(topCoursesRoute)
  return data.companies;
} 


const Conversation = [];
  // {
  //   image: huawei,
  //   name: "HCIA - 5G",
  //   description: "Huawei",
  // },
  // {
  //   image: oracle,
  //   name: "SQL",
  //   description: "Oracle",
  // },
  // {
  //   image: cisco,
  //   name: "Cloud Security",
  //   description: "Cisco",
  // },
  // {
  //   image: juniper,
  //   name: "Switching (ADCX)",
  //   description: "Juniper",
  // },
getAllCourses().then(
  data => data.map((course) => (
    Conversation.push(
      {
        image: "",
        name: course.name,
        description: course.name
        }
      )
    ))
)


export default Conversation;
