import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  //...rest contains pathname and other props that ar epassed to PrivateRoute Component
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} {...rest} user={user} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

export default PrivateRoute;
