import UserGiver from "utils/UserType";
import Courses_am from "./ampresta_courses";
import Courses_soc from "./societe_courses";

const Course = () => {
  const { userType } = UserGiver();
  console.log(userType);
  if (userType === "Societe") {
    return <Courses_soc />;
  }
  if (userType === "Superadmin") {
    return <Courses_am />;
  }
};

export default Course;
