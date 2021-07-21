import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const security = useSelector((state) => state.securityState);
  return (
    <Route
      {...otherProps}
      render={(props) =>
        security.validToken === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
