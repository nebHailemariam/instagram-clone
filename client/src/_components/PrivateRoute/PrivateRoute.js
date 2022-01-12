import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: RouteComponent, roles }) => {
  if (localStorage.getItem("currentUserToken")) {
    return <RouteComponent />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
