import React from "react";
import { useAuthContext } from "../store/authCtxProvider";
import { Navigate } from "react-router-dom";

function AdminPrivateRoute({ children }) {
  const { isUserLoggedIn, isUserAdmin } = useAuthContext();
  if (isUserLoggedIn) {
    return isUserAdmin ? children : <Navigate to={"/list"} />;
  } else return isUserLoggedIn ? children : <Navigate to={"/login"} />;
}

export default AdminPrivateRoute;
