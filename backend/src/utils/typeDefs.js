const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    users: [User!]!
    me: User
    projects: [Project!]!
  }

  type Mutation {
    loginWithGoogle(id_token: String!): User!
    logOut: Message!

    createProject(name: String!): Project
    updateProject(id: ID!, data: ProjectUpdateInput!): Project
    deleteProject(id: ID!): Project

    createTask(data: TaskInput!): Task
    updateTask(id: ID!, data: TaskUpdateInput!): Task
    deleteTask(id: ID!): Task
  }

  input ProjectUpdateInput {
    name: String
    user: ID
    tasks: ID
  }

  input TaskUpdateInput {
    project: ID
    done: Boolean
    description: String
  }

  input TaskInput {
    description: String!
    done: Boolean!
  }

  type User {
    id: ID!
    name: String!
    email: String
    projects: [Project!]!
  }

  type Project {
    id: ID!
    name: String!
    user: User!
    tasks: [Task!]!
  }

  type Task {
    id: ID!
    project: Project!
    done: Boolean!
    description: String!
  }

  type Message {
    message: String!
    date: String!
  }
`;
