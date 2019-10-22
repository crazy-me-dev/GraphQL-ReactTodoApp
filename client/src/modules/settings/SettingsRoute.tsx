import React from "react";
import { Link } from "react-router-dom";

import { AppHeader, Container } from "../common";
import ThemePicker from "./ThemePicker";

const SettingsRoute: React.FC = () => (
  <>
    <AppHeader>
      <Link to="/">Back</Link>
    </AppHeader>
    <Container>
      <h1>Settings</h1>
      <h2>Theme</h2>
      <ThemePicker />
    </Container>
  </>
);

export default SettingsRoute;
