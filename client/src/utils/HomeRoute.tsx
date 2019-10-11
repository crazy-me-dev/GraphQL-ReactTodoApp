import React from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../login";

const HomeRoute: React.FC = props => {
  return (
    <AuthContext.Consumer>
      {({ user }) => {
        const to = user ? "project/1" : "login";
        return <Redirect to={to} />;
      }}
    </AuthContext.Consumer>
  );
};

export default HomeRoute;
