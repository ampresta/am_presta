import UserGiver from "utils/UserType";
import Courses_am from "./ampresta_courses";
import Courses_soc from "./ampresta_courses";

const Session = () => {
  const { userType } = UserGiver();
  if (userType === "Societe") {
    return <Courses_soc />;
  }
  if (userType === "SuperAdmin") {
    return <Courses_am />;
  }
};

export default Session;
