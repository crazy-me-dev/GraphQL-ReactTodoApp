import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "emotion-theming";
import { Global } from "@emotion/core";

import Routes from "./routes";
import { theme, globalStyles } from "./config/styles";
import { AuthContext } from "./modules/login";
import { useMeQuery } from "./modules/login/loginRequests";
import { client } from "./config/apollo";
import { SideMenuProvider } from "./modules/project/SideMenuProvider";

const App: React.FC = () => {
  const { data, refetch, loading } = useMeQuery(client);
  const user = data ? data.me : null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ user, loading, refetchUser: refetch }}>
        <ThemeProvider theme={theme}>
          <SideMenuProvider>
            <Global styles={globalStyles(theme)} />
            <Routes />
          </SideMenuProvider>
        </ThemeProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default App;
