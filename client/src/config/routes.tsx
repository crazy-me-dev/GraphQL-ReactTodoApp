import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { Spinner } from "../components/common";
import { AuthRoute } from "../components/login";

const PageNotFoundPage = lazy(() => import("../pages/PageNotFoundPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const ProjectPage = lazy(() => import("../pages/ProjectPage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const RegistrationPage = lazy(() => import("../pages/RegistrationPage"));

const Routes = () => {
  return (
    <Router>
      <React.Suspense fallback={<Spinner />}>
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
      </React.Suspense>
    </Router>
  );
};

export default Routes;
