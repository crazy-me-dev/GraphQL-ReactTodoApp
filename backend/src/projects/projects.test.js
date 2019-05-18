import db from "../utils/db";
import { Mutation } from "../projects/projects.resolver.js";
import seedDatabase, {
  projectOne,
  userOne,
  userTwo
} from "../test-utils/seedDatabase";

describe("Project", () => {
  beforeEach(seedDatabase);

  it("should create a project for logged in user", async () => {
    const [user] = await db.users({ where: { name: "John Doe" } });
    const args = { name: "Inbox" };
    const ctx = { request: { userId: user.id }, db };
    const project = await Mutation.createProject(null, args, ctx, null);
    expect(project.name).toBe("Inbox");
  });

  it("should not create project if user is not logged in", async () => {
    const args = { name: "Inbox" };
    const ctx = { request: { db } };

    await expect(Mutation.createProject(null, args, ctx, null)).rejects.toEqual(
      new Error("You must be logged in")
    );
  });

  it("should give an error when creating a project without a name", async () => {
    const args = { name: "" };
    const ctx = { db, request: {} };

    await expect(Mutation.createProject(null, args, ctx, null)).rejects.toEqual(
      new Error("Name not provided")
    );
  });

  it("should update a project user's own project", async () => {
    const args = {
      id: projectOne.project.id,
      data: { name: "Updated Project Name" }
    };
    const ctx = { db, request: { userId: userOne.user.id } };
    await Mutation.updateProject(null, args, ctx, null);

    const [project] = await db.projects({
      where: { id: projectOne.project.id }
    });

    expect(project.name).toBe("Updated Project Name");
  });

  it("should give an error, when trying to update others projects", async () => {
    const args = {
      id: projectOne.project.id,
      data: { name: "Other's Updated Project Name" }
    };
    const ctx = { db, request: { userId: userTwo.user.id } };

    await expect(Mutation.updateProject(null, args, ctx, null)).rejects.toEqual(
      new Error("Project not found.")
    );
  });

  it("should delete user project", async () => {
    const userProjectBefore = await db.projects({
      where: { user: { id: userOne.user.id } }
    });
    expect(userProjectBefore.length).toBe(1);

    const args = { id: projectOne.project.id };
    const ctx = { db, request: { userId: userOne.user.id } };
    await Mutation.deleteProject(null, args, ctx, null);

    const userProjectAfter = await db.projects({
      where: { user: { id: userOne.user.id } }
    });
    expect(userProjectAfter.length).toBe(0);
  });
});
