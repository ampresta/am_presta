import axios from "axios"

import { topCoursesRoute } from "utils/APIRoutes";


const getAllCourses = async () => {
  const { data } = await axios.post(topCoursesRoute)
  return data.companies;
} 


const Conversation = [];

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
