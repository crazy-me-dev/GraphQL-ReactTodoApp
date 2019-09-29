import "cross-fetch/polyfill";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { Container } from "next/app";
import { ThemeProvider } from "emotion-theming";

import GlobalStyles from "../utils/GlobalStyles";
import { defaultTheme } from "../utils/themes";
import { AppContainer } from "../components/common";

export const client = new ApolloClient({
  uri: process.env.API_URL,
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
        <ApolloHooksProvider client={client}>
          <ThemeProvider theme={defaultTheme}>
            <GlobalStyles />
            <AppContainer>
              <Component {...pageProps} />
            </AppContainer>
          </ThemeProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </Container>
  );
};

export default MyApp;
