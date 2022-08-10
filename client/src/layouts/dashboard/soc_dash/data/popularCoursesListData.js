import { useEffect, useState } from "react";
import axios from "services/authAxios";

import { baseURL, topCoursesRoute } from "utils/APIRoutes";

const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    const getAllCourses = async () => {
      const { data } = await axios.post(topCoursesRoute);
      return data.companies;
    };

    let Conversation = [];

    getAllCourses().then((data) =>
      data.map((course) =>
        Conversation.push({
          image: `${baseURL}/${course.image}`,
          name: course.nom,
          description: course.Provider.nom,
        })
      )
    );
    setPopularCourses(Conversation);
  }, []);

  return popularCourses;
};

export default PopularCourses;
