const userQuery = require("../users/users.resolvers").Query;
const userMutation = require("../users/users.resolvers.js").Mutation;
const User = require("../users/users.resolvers.js").User;

const projectMutation = require("../projects/projects.resolver.js").Mutation;

const taskMutation = require("../tasks/tasks.resolver").Mutation;

exports.Query = { ...userQuery };
exports.Mutation = { ...taskMutation, ...projectMutation, ...userMutation };
exports.Relations = { ...User };
