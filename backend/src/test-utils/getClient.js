import ApolloBoost from "apollo-boost";
import fetch from "node-fetch";

global.fetch = fetch;

const getClient = jwt => {
  return new ApolloBoost({
    uri: "http://localhost:4004/graphql",
    credentials: "include",
    request(operation) {
      if (jwt) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
      }
    },
    onError: e => {}
  });
};

export { getClient as default };
