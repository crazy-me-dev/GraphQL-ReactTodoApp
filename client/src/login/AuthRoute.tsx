import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";

import AuthContext from "./AuthContext";

interface AuthRouteProps extends RouteProps {
  path: string;
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children, ...rest }) => {
  return (
    <Route {...rest}>
      <AuthContext.Consumer>
        {({ user, loading }) => {
          if (loading) return "...";

          if (!user) {
            return <Redirect to="/login" />;
          }

          return children;
        }}
      </AuthContext.Consumer>
    </Route>
  );
};

export default AuthRoute;
