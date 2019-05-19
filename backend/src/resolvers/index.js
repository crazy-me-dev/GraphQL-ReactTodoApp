const userQuery = require("../users/users.resolvers").Query;
const userMutation = require("../users/users.resolvers.js").Mutation;

const projectMutation = require("../projects/projects.resolver.js").Mutation;

const taskMutation = require("../tasks/tasks.resolver").Mutation;

exports.Query = { ...userQuery };
exports.Mutation = { ...taskMutation, ...projectMutation, ...userMutation };
