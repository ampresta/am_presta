import ChangePassword from "layouts/authentication/reset-password";
import { useMaterialUIController } from "context";
import Loading from "layouts/Loading";
const SpecialRoute = ({ children }) => {
  // console.log(children);
  const [controller, dispatch] = useMaterialUIController();
  const { changedPassword, accountType, loadingType } = controller;
  if (accountType && changedPassword === false) {
    children = <ChangePassword />;
  }
  if (loadingType === true) {
    children = <Loading />;
  }
  return children;
};
export default SpecialRoute;
