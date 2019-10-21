import React from "react";

import AppContainer from "../common/AppContainer";
import ThemePicker from "./ThemePicker";

const SettingsRoute: React.FC = () => (
  <AppContainer>
    <h1>Settings</h1>
    <h2>Theme</h2>
    <ThemePicker />
  </AppContainer>
);

export default SettingsRoute;
