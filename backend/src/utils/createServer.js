const { GraphQLServer } = require("graphql-yoga");

const db = require("./db");
const Query = require("../resolvers").Query;
const Mutation = require("../resolvers").Mutation;

const resolvers = {
  Query,
  Mutation
};

const createServer = () => {
  return new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {},
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });
};

module.exports = createServer;
