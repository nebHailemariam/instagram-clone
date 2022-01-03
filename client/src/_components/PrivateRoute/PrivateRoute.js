import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: RouteComponent, roles }) => {
  if (localStorage.getItem("currentUser")) {
    return <RouteComponent />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
