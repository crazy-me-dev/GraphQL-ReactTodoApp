import { gql } from "apollo-boost";

import db from "../utils/db";
import getClient from "../test-utils/getClient";
import seedDatabase, { userOne } from "../test-utils/seedDatabase";
import {
  startTestServer,
  closeTestServer
} from "../test-utils/setupTestServer";

const createTask = gql`
  mutation($data: TaskInput!) {
    createTask(data: $data) {
      id
      description
      done
    }
  }
`;

const client = getClient();

describe("Task", () => {
  beforeEach(seedDatabase);
  beforeAll(startTestServer);
  afterAll(closeTestServer);

  it("should create a task for logged in user", async () => {
    const [user] = await db.users({ where: { name: "John Doe" } });

    const client = getClient(userOne.jwt);
    const variables = { data: { description: "Buy milk", done: false } };
    const {
      data: { createTask: task }
    } = await client.mutate({
      mutation: createTask,
      variables
    });

    const [dbTask] = await db.tasks({ where: { id: task.id } });
    expect(dbTask.description).toBe("Buy milk");
    expect(dbTask.done).toBe(false);
  });

  it("should not create a task for not logged in user", async () => {
    const variables = { data: { description: "Read a book", done: false } };
    await expect(
      client.mutate({ mutation: createTask, variables })
    ).rejects.toEqual(new Error("GraphQL error: You must be logged in"));
  });

  it("should go to inbox project, if project not set", async () => {
    const [user] = await db.users({ where: { name: "John Doe" } });

    const inbox = await db.projects({
      where: { name: "Inbox", user: { id: user.id } }
    });

    const client = getClient(userOne.jwt);
    const variables = {
      data: { description: "Clean the house", done: false }
    };
    const {
      data: { createTask: task }
    } = await client.mutate({
      mutation: createTask,
      variables
    });

    const [dbTask] = await db.tasks({
      where: { id: task.id, project: { id: inbox.id } }
    });

    expect(dbTask.description).toBe("Clean the house");
    expect(dbTask.id).toBe(task.id);
  });
});
