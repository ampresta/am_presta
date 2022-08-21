import { Route } from "react-router-dom";
import ChangePassword from "layouts/authentication/reset-password";
import { useMaterialUIController } from "context";
import Loading from "layouts/Loading";
const SpecialRoute = ({ children }) => {
  console.log(children);
  const [controller, dispatch] = useMaterialUIController();
  const { changedPassword, accountType, loadingType } = controller;
  if (accountType && changedPassword === false) {
    console.log("first");
    children = <ChangePassword />;
  }
  if (!accountType && loadingType === true) {
    children = <Loading />;
  }
  console.log("inside");
  console.log(accountType);
  return children;
};
export default SpecialRoute;
