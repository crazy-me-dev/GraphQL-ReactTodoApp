import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../login";

const HomeRoute: React.FC = () => {
  const { user } = useContext(AuthContext);
  const to = user ? `project/${user.projects[0].id}` : "login";

  return <Redirect to={to} />;
};

export default HomeRoute;
