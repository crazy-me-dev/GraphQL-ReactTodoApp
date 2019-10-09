import React from "react";
import { RouteComponentProps, Redirect } from "@reach/router";

import { AuthContext } from "../login";

const HomeRoute: React.FC<RouteComponentProps> = props => {
  return (
    <AuthContext.Consumer>
      {({ user }) => {
        const to = user ? "project/1" : "login";
        return <Redirect to={to} noThrow={true} />;
      }}
    </AuthContext.Consumer>
  );
};

export default HomeRoute;
