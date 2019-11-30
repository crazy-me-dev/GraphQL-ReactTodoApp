import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { render } from "@testing-library/react";

import AuthContext, { AuthContexOptions } from "../modules/login/AuthContext";
import { User } from "../modules/login/user.model";
import {
  SettingsPage,
  ProjectPage,
  LoginPage,
  HomePage,
  PageNotFoundPage
} from "../pages";
import AuthRoute from "../modules/login/AuthRoute";
import { SideMenuProvider } from "./SideMenuProvider";
import ThemeProvider from "../utils/ThemeProvider";
import "../config/i18n";

const App: React.FC = props => (
  <Switch>
    <Route exact path="/">
      <HomePage />
    </Route>
    <Route exact path="/login">
      <LoginPage />
    </Route>
    <AuthRoute path="/project/:id">
      <ProjectPage />
    </AuthRoute>
    <AuthRoute path="/settings">
      <SettingsPage />
    </AuthRoute>
    <Redirect from="/project" to="/" />
    <Route path="*">
      <PageNotFoundPage />
    </Route>
  </Switch>
);

const fakeUser: User = {
  id: "7357",
  name: "John Doe",
  projects: []
};

const fakeTask = () => ({
  id: "7357",
  description: "Buy milk",
  done: false
});

const client = new ApolloClient<{}>({
  uri: "https://localhost:7357/graphql"
});

const authContextValue: AuthContexOptions = {
  user: null,
  loading: false,
  refetchUser: () => {}
};

interface RouterOptions {
  route?: string;
  history?: MemoryHistory;
}

function renderWithProviders(
  ui: React.ReactNode,
  user: User = null,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  }: RouterOptions = {}
) {
  authContextValue.user = user;
  return {
    ...render(
      <>
        <ApolloProvider client={client}>
          <AuthContext.Provider value={authContextValue}>
            <ThemeProvider>
              <SideMenuProvider>
                <Router history={history}>{ui}</Router>
              </SideMenuProvider>
            </ThemeProvider>
          </AuthContext.Provider>
        </ApolloProvider>
        <div id="modal-root"></div>
      </>
    ),
    history
  };
}

export { App, renderWithProviders, fakeTask, fakeUser };
