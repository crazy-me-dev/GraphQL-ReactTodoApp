import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "emotion-theming";

import Routes from "./routes";
import { theme } from "./config/globalStyles";
import { AuthContext } from "./modules/login";
import { useMeQuery } from "./modules/login/loginRequests";
import { client } from "./config/apollo";

const App: React.FC = () => {
  const { data, refetch, loading } = useMeQuery(client);
  const user = data ? data.me : null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ user, loading, refetchUser: refetch }}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default App;
