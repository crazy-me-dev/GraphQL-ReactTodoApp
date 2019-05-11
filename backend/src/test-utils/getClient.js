require("@babel/polyfill/noConflict");
const ApolloClient = require("apollo-client").ApolloClient;
const InMemoryCache = require("apollo-cache-inmemory").InMemoryCache;
const createHttpLink = require("apollo-link-http").createHttpLink;

const getClient = (
  jwt = null,
  httpURL = "http://localhost:4000",
  websocketURL = "ws://localhost:4000"
) => {
  const link = createHttpLink({ uri: httpURL });
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    onError: e => {
      console.log(e);
    }
  });
};

module.exports = getClient;
