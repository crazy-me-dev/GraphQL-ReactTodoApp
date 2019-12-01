import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { AuthRoute } from "../components/login";
import {
  PageNotFoundPage,
  HomePage,
  LoginPage,
  RegistrationPage,
  SettingsPage,
  ProjectPage
} from "../pages";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/registration" exact>
          <RegistrationPage />
        </Route>
        <AuthRoute path="/project/:id" exact>
          <ProjectPage />
        </AuthRoute>
        <AuthRoute path="/settings" exact>
          <SettingsPage />
        </AuthRoute>
        <Redirect from="/project" to="/" exact />
        <Route path="*">
          <PageNotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
