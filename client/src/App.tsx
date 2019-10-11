import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "emotion-theming";

import { theme } from "./config/globalStyles";
import { SettingsRoute } from "./settings";
import { ProjectRoute } from "./project";
import { LoginRoute, AuthRoute, AuthContext } from "./login";
import { PageNotFoundRoute, HomeRoute } from "./utils";
import { useMeQuery } from "./login/loginRequests";

const client = new ApolloClient<{}>({
  uri: process.env.REACT_APP_API_URL,
  request: async operation => {
    operation.setContext({
      fetchOptions: {
        credentials: "include"
      }
    });
  }
});

const App: React.FC = () => {
  const { data, refetch, loading } = useMeQuery(client);
  const user = data ? data.me : null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ user, loading, refetchUser: refetch }}>
        <ThemeProvider theme={theme}>
          <main>
            <Router>
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
            </Router>
          </main>
        </ThemeProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default App;
