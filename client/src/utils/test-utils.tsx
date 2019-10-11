import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { render } from "@testing-library/react";
import { ThemeProvider } from "emotion-theming";

import { theme } from "../config/globalStyles";
import AuthContext, { AuthContexOptions, User } from "../login/AuthContext";
import HomeRoute from "../utils/HomeRoute";
import LoginRoute from "../login/LoginRoute";
import AuthRoute from "../login/AuthRoute";
import PageNotFoundRoute from "../utils/PageNotFoundRoute";
import ProjectRoute from "../project/ProjectRoute";
import SettingsRoute from "../settings/SettingsRoute";

export const App: React.FC = props => (
  <Switch>
    <Route exact path="/">
      <HomeRoute />
    </Route>
    <Route exact path="/login">
      <LoginRoute />
    </Route>
    <AuthRoute path="/project/:id">
      <ProjectRoute />
    </AuthRoute>
    <AuthRoute path="/settings">
      <SettingsRoute />
    </AuthRoute>
    <Redirect from="/project" to="/" />
    <Route path="*">
      <PageNotFoundRoute />
    </Route>
  </Switch>
);

export const fakeUser = {
  id: "7357",
  name: "John Doe"
};

const client = new ApolloClient<{}>({
  uri: "https://localhost:7357/graphql",
  request: async operation => {
    operation.setContext({
      fetchOptions: {
        credentials: "include"
      }
    });
  }
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

export function renderWithProviders(
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
      <ApolloProvider client={client}>
        <AuthContext.Provider value={authContextValue}>
          <ThemeProvider theme={theme}>
            <Router history={history}>{ui}</Router>
          </ThemeProvider>
        </AuthContext.Provider>
      </ApolloProvider>
    ),
    history
  };
}
