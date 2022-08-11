// import { getType } from "utils/APIRoutes";
// import authService from "services/auth.service";
// import axios from "services/authAxios";

// import { useState, useEffect } from "react";

// const UserGiver = () => {
//   const [userType, setUserType] = useState("");
//   const [loading, setloading] = useState(false);

//   useEffect(() => {
//     const gettype = async () => {
//       const { data } = await axios.get(getType);
//       if (data.status) {
//         setUserType(data.type);
//       }
//       setloading(true);
//     };

//     gettype();
//   }, []);

//   return { loading, userType };
// };

// export default UserGiver;
