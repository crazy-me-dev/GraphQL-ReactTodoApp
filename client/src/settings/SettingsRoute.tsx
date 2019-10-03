import React from "react";
import { RouteComponentProps } from "@reach/router";

import AppContainer from "../common/AppContainer";

const SettingsRoute: React.FC<RouteComponentProps> = () => {
  return (
    <AppContainer>
      <h1>Settings</h1>
    </AppContainer>
  );
};

export default SettingsRoute;
