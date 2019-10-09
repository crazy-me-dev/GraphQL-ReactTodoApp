const { ApolloServer } = require("apollo-server-express");

const db = require("./db");
const resolvers = require("../resolvers");
const typeDefs = require("./typeDefs");

const createServer = () =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context: req => ({ ...req, db })
  });

module.exports = createServer;
