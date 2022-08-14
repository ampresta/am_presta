import { useEffect } from "react";
import TypeGiver from "../../utils/UserType";
import SessionAm from "./ampresta";
import SessionSoc from "./societe";

const Session = () => {
  const user = TypeGiver();
  // });
  if (user.userType === "Societe") {
    return <SessionSoc />;
  } else if (user.userType === "SuperAdmin") {
    return <SessionAm />;
  }
};

export default Session;
