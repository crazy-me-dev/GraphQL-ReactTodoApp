import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { SettingsRoute } from "../modules/settings";
import { ProjectRoute } from "../modules/project";
import { LoginRoute, AuthRoute } from "../modules/login";
import { PageNotFoundRoute, HomeRoute } from "../modules/home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomeRoute />
        </Route>
        <Route path="/login" exact>
          <LoginRoute />
        </Route>
        <AuthRoute path="/project/:id" exact>
          <ProjectRoute />
        </AuthRoute>
        <AuthRoute path="/settings" exact>
          <SettingsRoute />
        </AuthRoute>
        <Redirect from="/project" to="/" exact />
        <Route path="*">
          <PageNotFoundRoute />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
