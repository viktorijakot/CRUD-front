import { Navigate } from "react-router-dom";
import { useAuthContext } from "../store/authCtxProvider";

function PrivateRoute({ children }) {
  const { isUserLoggedIn } = useAuthContext();
  return isUserLoggedIn ? children : <Navigate to={"/login"} />;
}

export default PrivateRoute;
