import db from "../utils/db";
import jwt from "jsonwebtoken";

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
    name: "Inbox"
  },
  project: undefined
};

const seedDatabase = async () => {
  // Delete the old data
  await db.deleteManyTasks();
  await db.deleteManyProjects();
  await db.deleteManyUsers();

  // Add users
  userOne.user = await db.createUser({ ...userOne.input });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.APP_SECRET);

  userTwo.user = await db.createUser({ ...userTwo.input });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.APP_SECRET);

  // Add projects
  projectOne.project = await db.createProject({
    ...projectOne.input,
    user: { connect: { id: userOne.user.id } }
  });
};

export default seedDatabase;
