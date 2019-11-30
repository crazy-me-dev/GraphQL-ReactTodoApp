import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ToastContainer } from "react-toastify";

import Routes from "./config/routes";
import ThemeProvider from "./utils/ThemeProvider";
import { AuthContext } from "./modules/login";
import { useMeQuery } from "./modules/login/login.requests";
import { client } from "./config/apollo";
import { SideMenuProvider } from "./utils/SideMenuProvider";
import "./config/i18n";

const App: React.FC = () => {
  const { data, refetch, loading } = useMeQuery(client);
  const user = data ? data.me : null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ user, loading, refetchUser: refetch }}>
        <ThemeProvider>
          <SideMenuProvider>
            <ToastContainer></ToastContainer>
            <Routes />
          </SideMenuProvider>
        </ThemeProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default App;
