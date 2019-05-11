import "cross-fetch/polyfill";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { Container } from "next/app";

import GlobalStyles from "../utils/GlobalStyles";
import { AppContainer } from "../components/common";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  request: async operation => {
    operation.setContext({
      fetchOptions: {
        credentials: "include"
      }
    });
  }
});

const MyApp = props => {
  const { Component, pageProps } = props;
  return (
    <Container>
      <ApolloProvider client={client}>
        <GlobalStyles />
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
      </ApolloProvider>
    </Container>
  );
};

export default MyApp;
