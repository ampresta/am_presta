import { useEffect } from "react";
import TypeGiver from "../../utils/UserType";
import SessionAm from "./ampresta";
import SessionSoc from "./societe";

const Session = () => {
  // useEffect(() => {
  const user = TypeGiver();
  // });
  if (user.userType === "Societe") {
    return <>{user !== "" && <SessionSoc />}</>;
  } else if (user.userType === "SuperAdmin") {
    return <>{user !== "" && <SessionAm />}</>;
  }
};

export default Session;
