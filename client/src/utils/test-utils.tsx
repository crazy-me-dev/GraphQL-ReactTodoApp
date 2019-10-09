import React from "react";
import {
  Router,
  Redirect,
  createHistory,
  createMemorySource,
  LocationProvider
} from "@reach/router";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { render } from "@testing-library/react";

import AuthContext, { AuthContexOptions, User } from "../login/AuthContext";

import HomeRoute from "../utils/HomeRoute";
import LoginRoute from "../login/LoginRoute";
import AuthRoute from "../login/AuthRoute";
import PageNotFoundRoute from "../utils/PageNotFoundRoute";
import ProjectRoute from "../project/ProjectRoute";
import SettingsRoute from "../settings/SettingsRoute";

export const App: React.FC = props => (
  <Router>
    <HomeRoute path="/" />
    <LoginRoute path="login" />
    <AuthRoute path="project/:id" component={ProjectRoute} />
    <AuthRoute path="settings" component={SettingsRoute} />
    <Redirect from="project" to="/" noThrow />
    <PageNotFoundRoute default />
  </Router>
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

export function renderWithProviders(
  ui: React.ReactNode,
  user: User,
  { route = "/login", history = createHistory(createMemorySource(route)) } = {}
) {
  authContextValue.user = user;

  return {
    ...render(
      <LocationProvider history={history}>
        <ApolloProvider client={client}>
          <AuthContext.Provider value={authContextValue}>
            {ui}
          </AuthContext.Provider>
        </ApolloProvider>
      </LocationProvider>
    ),
    history
  };
}
