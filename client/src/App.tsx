import React from "react";
import { Router, Redirect } from "@reach/router";
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
              <HomeRoute path="/" />
              <LoginRoute path="login" />
              <AuthRoute path="project/:id" component={ProjectRoute} />
              <AuthRoute path="settings" component={SettingsRoute} />
              <Redirect from="project" to="/" noThrow />
              <PageNotFoundRoute default />
            </Router>
          </main>
        </ThemeProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default App;
