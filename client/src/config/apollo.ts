import ApolloClient from "apollo-boost";

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

export { client };
