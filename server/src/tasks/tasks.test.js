import { gql } from "apollo-boost";

import db from "../utils/db";
import getClient from "../test-utils/getClient";
import seedDatabase, {
  userOne,
  userTwo,
  projectOne,
  projectTwo,
  projectThree,
  taskOne,
  taskThree
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

const reorderTasksMutation = gql`
  mutation($project: ID!, $taskMap: [ID]!) {
    reorderTasks(project: $project, taskMap: $taskMap) {
      id
      description
      order_number
    }
  }
`;

const client = getClient();

describe("Task", () => {
  beforeEach(seedDatabase);
  beforeAll(startTestServer);
  afterAll(closeTestServer);

  describe("when creating a task", () => {
    it("should create a task for logged in user", async () => {
      const client = getClient(userOne.jwt);
      const variables = { data: { description: "Buy milk", done: false } };
      const {
        data: { createTask: task }
      } = await client.mutate({
        mutation: createTask,
        variables
      });

      const dbTask = await db("task")
        .where({ id: task.id })
        .first();
      expect(dbTask.description).toBe("Buy milk");
      expect(dbTask.done).toBe(false);
    });

    it("should create a task for selected project", async () => {
      const client = getClient(userOne.jwt);
      const variables = {
        data: {
          description: "Create a todo app",
          done: false,
          project: projectThree.project.id
        }
      };
      const {
        data: { createTask: task }
      } = await client.mutate({
        mutation: createTask,
        variables
      });

      const dbTask = await db("task")
        .where({ id: task.id })
        .first();
      expect(dbTask.description).toBe("Create a todo app");
      expect(dbTask.project_id).toBe(projectThree.project.id);
      expect(dbTask.done).toBe(false);
    });

    it("should not create a task for not logged in user", async () => {
      const variables = { data: { description: "Read a book", done: false } };
      await expect(
        client.mutate({ mutation: createTask, variables })
      ).rejects.toEqual(new Error("GraphQL error: You must be logged in"));
    });

    it("should go to inbox project, if project not set", async () => {
      const user = await db("user")
        .where({ name: "John Doe" })
        .first();
      const inbox = await db("project")
        .where({ name: "Inbox", user_id: user.id })
        .first();

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

      const dbTask = await db("task")
        .where({ id: task.id, project_id: inbox.id })
        .first();
      expect(dbTask.description).toBe("Clean the house");
      expect(dbTask.id).toBe(parseInt(task.id));
    });
  });

  describe("when updating a task", () => {
    it("should update user's own task", async () => {
      const client = getClient(userOne.jwt);
      const variables = {
        id: taskOne.task.id,
        data: { description: "Changed description" }
      };

      await client.mutate({ mutation: updateTaskMutation, variables });

      const [task] = await db("task").where({ id: taskOne.task.id });

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

      const task = await db("task")
        .where({ id: taskOne.task.id })
        .first();

      expect(task.description).toBe(taskOne.task.description);
    });

    it("should not be able to move task to other user's project", async () => {
      const client = getClient(userOne.jwt);
      const variables = {
        id: taskOne.task.id,
        data: {
          project: projectTwo.project.id
        }
      };

      await expect(
        client.mutate({ mutation: updateTaskMutation, variables })
      ).rejects.toEqual(
        new Error(
          "GraphQL error: Cannot move the task to a project you don't own"
        )
      );

      const [taskThatShouldNotExists] = await db("task").where({
        id: taskOne.task.id,
        project_id: projectTwo.project.id
      });

      expect(taskThatShouldNotExists).toBe(undefined);
    });
  });

  describe("when deleting a task", () => {
    it("should delete user's own task", async () => {
      const client = getClient(userOne.jwt);
      const variables = { id: taskOne.task.id };

      await client.mutate({ mutation: deleteTaskMutation, variables });

      const task = await db("task")
        .where({ id: taskOne.task.id })
        .first();
      expect(task).toBe(undefined);
    });

    it("should not delete other user's task", async () => {
      const client = getClient(userTwo.jwt);
      const variables = { id: taskOne.task.id };

      await expect(
        client.mutate({ mutation: deleteTaskMutation, variables })
      ).rejects.toEqual(new Error("GraphQL error: Task not found"));

      const [task] = await db("task").where({ id: taskOne.task.id });
      expect(task).toEqual(taskOne.task);
    });
  });

  describe("when reordering tasks", () => {
    let variables = {};

    beforeEach(() => {
      variables = {
        project: projectOne.project.id,
        taskMap: [taskThree.task.id, taskOne.task.id]
      };
    });

    it("should reorder tasks", async () => {
      const client = getClient(userOne.jwt);

      await client.mutate({ mutation: reorderTasksMutation, variables });

      const [task1] = await db("task").where({ id: taskOne.task.id });
      const [task3] = await db("task").where({ id: taskThree.task.id });

      expect(task1.order_number).toEqual(1);
      expect(task3.order_number).toEqual(0);
    });

    it("should not reorder other user's tasks", async () => {
      const client = getClient(userTwo.jwt);

      await expect(
        client.mutate({ mutation: reorderTasksMutation, variables })
      ).rejects.toEqual(
        new Error("GraphQL error: You can reorder only your own projects")
      );

      const [task1] = await db("task").where({ id: taskOne.task.id });
      const [task3] = await db("task").where({ id: taskThree.task.id });

      expect(task1.order_number).toEqual(0);
      expect(task3.order_number).toEqual(1);
    });
  });
});
