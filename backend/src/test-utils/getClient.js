import ApolloBoost from "apollo-boost";

const getClient = jwt => {
  return new ApolloBoost({
    uri: "http://localhost:4004",
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
