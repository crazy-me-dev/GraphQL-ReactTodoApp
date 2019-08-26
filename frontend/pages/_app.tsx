import "cross-fetch/polyfill";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { Container } from "next/app";
import { ThemeProvider } from "emotion-theming";

import GlobalStyles from "../utils/GlobalStyles";
import { defaultTheme } from "../utils/themes";
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

interface Props {
  Component: React.Component;
  pageProps: Object;
}

const MyApp = (props: Props) => {
  const { Component, pageProps } = props;
  return (
    <Container>
      <ApolloProvider client={client}>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyles />
          <AppContainer>
            <Component {...pageProps} />
          </AppContainer>
        </ThemeProvider>
      </ApolloProvider>
    </Container>
  );
};

export default MyApp;
