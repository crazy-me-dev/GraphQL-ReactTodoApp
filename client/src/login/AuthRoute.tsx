import React from "react";
import { RouteComponentProps, Redirect } from "@reach/router";

import AuthContext from "./AuthContext";

interface AuthRouteProps extends RouteComponentProps {
  component: React.ComponentType;
}

const AuthRoute: React.FC<AuthRouteProps> = props => {
  return (
    <AuthContext.Consumer>
      {({ user, loading }) => {
        if (loading) return "...";

        if (!user) {
          return <Redirect to="/login" noThrow={true} />;
        }

        return <props.component {...props} />;
      }}
    </AuthContext.Consumer>
  );
};

export default AuthRoute;
