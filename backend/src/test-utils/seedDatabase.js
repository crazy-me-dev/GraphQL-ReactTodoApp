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

export const projectTwo = {
  input: {
    name: "Inbox"
  },
  project: undefined
};

export const taskOne = {
  input: {
    description: "Buy a car",
    done: false
  },
  task: undefined
};

export const taskTwo = {
  input: {
    description: "Buy a house",
    done: false
  },
  task: undefined
};

const seedDatabase = async () => {
  // Delete the old data
  await db("task").delete();
  await db("project").delete();
  await db("user").delete();

  // Add users
  [userOne.user] = await db("user")
    .returning("*")
    .insert({ ...userOne.input });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.APP_SECRET);

  [userTwo.user] = await db("user")
    .returning("*")
    .insert({ ...userTwo.input });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.APP_SECRET);

  // Add projects
  [projectOne.project] = await db("project")
    .returning("*")
    .insert({
      ...projectOne.input,
      user_id: userOne.user.id
    });
  [projectTwo.project] = await db("project")
    .returning("*")
    .insert({
      ...projectTwo.input,
      user_id: userTwo.user.id
    });

  // Add tasks
  [taskOne.task] = await db("task")
    .returning("*")
    .insert({
      ...taskOne.input,
      project_id: projectOne.project.id
    });
  [taskTwo.task] = await db("task")
    .returning("*")
    .insert({
      ...taskTwo.input,
      project_id: projectTwo.project.id
    });
};

export default seedDatabase;
