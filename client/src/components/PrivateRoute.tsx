import React from "react";
import AuthState from "../utils/common/auth-state";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  redirect: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  redirect,
  ...rest
}) => {
  const authState = new AuthState();

  return (
    <Route
      {...rest}
      render={(props) =>
        authState.validateUser() ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirect} />
        )
      }
    />
  );
};

export default PrivateRoute;
