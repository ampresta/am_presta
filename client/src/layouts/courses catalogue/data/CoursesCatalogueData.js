import { useEffect, useState } from "react";
import {
  CoursesCatalogue,
  // allCoursesRoute,
  allPartnersRoute,
} from "utils/APIRoutes";
import axiosAuth from "services/authAxios";

export default function Data() {
  const [allCourses, setAllCourses] = useState([]);
  const [allPartners, setAllPartners] = useState([]);

  useEffect(() => {
    const getAllCourses = async () => {
      const { data } = await axiosAuth.get(CoursesCatalogue);
      console.log(data);
      setAllCourses(data.cours);
    };
    getAllCourses();
  }, []);

  useEffect(() => {
    const getAllPartners = async () => {
      const { data } = await axiosAuth.get(allPartnersRoute);
      setAllPartners((prev) => data);
    };
    getAllPartners();
  }, []);

  const coursesData = [];

  allCourses.map((course) =>
    coursesData.push({
      id: course.id,
      image: course.image,
      provider: course.Provider.nom,
      name: course.nom,
      route: `/catalogue/details/${course.id}`,
      pro: course.Provider.Quota.length > 0 ? false : true,
    })
  );

  const partnersData = [];

  allPartners.map((partner) =>
    partnersData.push({
      id: partner.id,
      name: partner.nom,
    })
  );

  console.log(partnersData);

  return { coursesData, partnersData };
}
