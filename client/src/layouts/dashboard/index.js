import TypeGiver from "../../utils/UserType";
import DashAm from "./ampresta_dash";
import DashSoc from "./societe_dash";

const Dashboard = () => {
  const user = TypeGiver();
  // });
  console.log(user);
  if (user.userType === "Societe") {
    return <DashSoc />;
  } else if (user.userType === "Superadmin") {
    return <DashAm />;
  }
};

export default Dashboard;
