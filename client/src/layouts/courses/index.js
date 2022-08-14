import UserGiver from "utils/UserType";
import Courses_am from "./ampresta_courses";
import Courses_soc from "./ampresta_courses";

function Course() {
  let type;
  const user = UserGiver();

  console.log(user);
  switch (user) {
    case "Societe":
      type = Courses_soc;
      break;

    case "Superadmin":
      type = Courses_am;
      break;

    case "Collab":
      //   type = Courses_am;
      break;

    default:
      break;
  }

  return type;
}

export default Course;
