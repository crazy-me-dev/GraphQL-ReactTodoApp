import db from "../utils/db";
import { Mutation } from "../tasks/tasks.resolver";
import seedDatabase from "../test-utils/seedDatabase";

describe("Task", () => {
  beforeEach(seedDatabase);

  it("should create a task for logged in user", async () => {
    const [user] = await db.users({ where: { name: "John Doe" } });
    const args = { data: { description: "Buy milk", done: false } };
    const ctx = { db, request: { userId: user.id } };
    const task = await Mutation.createTask(null, args, ctx, null);

    const [dbTask] = await db.tasks({ where: { id: task.id } });
    expect(dbTask.description).toBe("Buy milk");
    expect(dbTask.done).toBe(false);
  });

  it("should not create a task for not logged in user", async () => {
    const args = { data: { description: "Go to gym", done: false } };
    const ctx = { db, request: {} };
    await expect(Mutation.createTask(null, args, ctx, null)).rejects.toEqual(
      new Error("You must be logged in")
    );
  });

  it("should go to inbox project, if project not set", async () => {
    const [user] = await db.users({ where: { name: "John Doe" } });

    const inbox = await db.projects({
      where: { name: "Inbox", user: { id: user.id } }
    });
    const args = { data: { description: "Buy milk", done: false } };
    const ctx = { db, request: { userId: user.id } };
    const task = await Mutation.createTask(null, args, ctx, null);

    const [dbTask] = await db.tasks({
      where: { id: task.id, project: { id: inbox.id } }
    });

    expect(dbTask.description).toBe("Buy milk");
    expect(dbTask.id).toBe(task.id);
  });
});
