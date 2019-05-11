// const db = require("../utils/db");
import db from "../utils/db";

export const userOne = {
  input: {
    name: "John Doe",
    email: "john.doe@example.com"
  },
  user: undefined,
  jwt: undefined
};

export const userTwo = {
  input: {
    name: "Google User",
    email: "google.user@google.com"
  },
  user: undefined,
  jwt: undefined
};

export const projectOne = {
  input: {
    name: "Project 1"
  },
  project: undefined
};

const seedDatabase = async () => {
  // Delete the old data
  await db.deleteManyTasks();
  await db.deleteManyProjects();
  await db.deleteManyUsers();

  // Add users
  userOne.user = await db.createUser(userOne.input);
  userTwo.user = await db.createUser(userTwo.input);

  // Add projects
  projectOne.project = await db.createProject({
    ...projectOne.input,
    user: { connect: { id: userOne.user.id } }
  });
};

export default seedDatabase;
// module.exports = seedDatabase;
// exports.userOne = userOne;
// exports.userTwo = userTwo;
// exports.projectOne = projectOne;
