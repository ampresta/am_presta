import TypeGiver from "../../utils/UserType";
import CourseAmpresta from "../courses/ampresta_courses";
import CourseSociete from "../courses/societe_courses";

const Courses = () => {
  const user = TypeGiver();
  // });
  console.log(user);
  if (user.userType === "Societe") {
    return <CourseAmpresta />;
  } else if (user.userType === "SuperAdmin") {
    return <CourseSociete />;
  }
};

export default Courses;
