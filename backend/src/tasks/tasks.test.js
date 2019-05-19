import { gql } from "apollo-boost";

import db from "../utils/db";
import getClient from "../test-utils/getClient";
import seedDatabase, {
  userOne,
  userTwo,
  projectOne,
  projectTwo,
  taskOne
} from "../test-utils/seedDatabase";
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

const updateTaskMutation = gql`
  mutation($id: ID!, $data: TaskUpdateInput!) {
    updateTask(id: $id, data: $data) {
      id
      description
    }
  }
`;

const deleteTaskMutation = gql`
  mutation($id: ID!) {
    deleteTask(id: $id) {
      id
      description
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

  it("should update user's own task", async () => {
    const client = getClient(userOne.jwt);
    const variables = {
      id: taskOne.task.id,
      data: { description: "Changed description" }
    };

    await client.mutate({ mutation: updateTaskMutation, variables });

    const [task] = await db.tasks({ where: { id: taskOne.task.id } });

    expect(task.description).toBe("Changed description");
  });

  it("should not update other user's task", async () => {
    const client = getClient(userTwo.jwt);
    const variables = {
      id: taskOne.task.id,
      data: { description: "Changed description" }
    };

    await expect(
      client.mutate({ mutation: updateTaskMutation, variables })
    ).rejects.toEqual(new Error("GraphQL error: Task not found"));

    const [task] = await db.tasks({ where: { id: taskOne.task.id } });

    expect(task.description).toBe(taskOne.task.description);
  });

  it("should not be able to move task to other user's project", async () => {
    const client = getClient(userOne.jwt);
    const variables = {
      id: taskOne.task.id,
      data: {
        project: {
          connect: {
            id: projectTwo.project.id
          }
        }
      }
    };

    await expect(
      client.mutate({ mutation: updateTaskMutation, variables })
    ).rejects.toEqual(
      new Error("GraphQL error: Cannot move task to project you don't own")
    );

    const [taskThatShouldNotExists] = await db.tasks({
      where: { id: taskOne.task.id, project: { id: projectTwo.project.id } }
    });

    expect(taskThatShouldNotExists).toBe(undefined);
  });

  it("should delete user's own task", async () => {
    const client = getClient(userOne.jwt);
    const variables = { id: taskOne.task.id };

    await client.mutate({ mutation: deleteTaskMutation, variables });

    const [task] = await db.tasks({ where: { id: taskOne.task.id } });
    expect(task).toBe(undefined);
  });

  it("should not delete other user's task", async () => {
    const client = getClient(userTwo.jwt);
    const variables = { id: taskOne.task.id };

    await expect(
      client.mutate({ mutation: deleteTaskMutation, variables })
    ).rejects.toEqual(new Error("GraphQL error: Task not found"));

    const [task] = await db.tasks({ where: { id: taskOne.task.id } });
    expect(task).toEqual(taskOne.task);
  });
});
