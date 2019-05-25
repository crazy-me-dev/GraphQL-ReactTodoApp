import { gql } from "apollo-boost";

import db from "../utils/db";
import getClient from "../test-utils/getClient";
import seedDatabase, {
  projectOne,
  userOne,
  userTwo
} from "../test-utils/seedDatabase";
import {
  startTestServer,
  closeTestServer
} from "../test-utils/setupTestServer";

const createProjectMutation = gql`
  mutation($name: String!) {
    createProject(name: $name) {
      id
      name
    }
  }
`;

const updateProjectMutation = gql`
  mutation($id: ID!, $data: ProjectUpdateInput!) {
    updateProject(id: $id, data: $data) {
      id
      name
    }
  }
`;

const deleteProjectMutation = gql`
  mutation($id: ID!) {
    deleteProject(id: $id) {
      id
      name
    }
  }
`;

const client = getClient();

describe("Project", () => {
  beforeEach(seedDatabase);
  beforeAll(startTestServer);
  afterAll(closeTestServer);

  it("should create a project for logged in user", async () => {
    const client = getClient(userOne.jwt);
    const variables = { name: "Inbox" };
    const {
      data: { createProject: project }
    } = await client.mutate({
      mutation: createProjectMutation,
      variables
    });

    expect(project.name).toBe("Inbox");
  });

  it("should not create project if user is not logged in", async () => {
    const variables = { name: "Inbox" };

    await expect(
      client.mutate({
        mutation: createProjectMutation,
        variables
      })
    ).rejects.toEqual(new Error("GraphQL error: You must be logged in"));
  });

  it("should give an error when creating a project without a name", async () => {
    const variables = { name: "" };
    await expect(
      client.mutate({
        mutation: createProjectMutation,
        variables
      })
    ).rejects.toEqual(new Error("GraphQL error: Name not provided"));
  });

  it("should update user's own project", async () => {
    const client = getClient(userOne.jwt);
    const variables = {
      id: projectOne.project.id,
      data: { name: "Updated Project Name" }
    };

    await client.mutate({
      mutation: updateProjectMutation,
      variables
    });

    const project = await db('project').where({ id: projectOne.project.id }).first();

    expect(project.name).toBe("Updated Project Name");
  });

  it("should give an error, when trying to update others projects", async () => {
    const client = getClient(userTwo.jwt);

    const variables = {
      id: projectOne.project.id,
      data: { name: "Other's Updated Project Name" }
    };

    await expect(
      client.mutate({
        mutation: updateProjectMutation,
        variables
      })
    ).rejects.toEqual(new Error("GraphQL error: Project not found."));
  });

  it("should give an error, if trying to change project's users", async () => {
    const client = getClient(userOne.jwt);
    const variables = {
      id: projectOne.project.id,
      data: {
        name: "Other's Updated Project Name",
        user: {
          connect: {
            id: userTwo.user.id
          }
        }
      }
    };

    await expect(
      client.mutate({
        mutation: updateProjectMutation,
        variables
      })
    ).rejects.toEqual(
      new Error("GraphQL error: Cannot move the project to other user")
    );
  });

  it("should delete user's own project", async () => {
    const userProjectBefore = await db('project').where({ user_id: userOne.user.id });
    expect(userProjectBefore.length).toBe(1);

    const variables = { id: projectOne.project.id };

    const client = getClient(userOne.jwt);
    await client.mutate({ mutation: deleteProjectMutation, variables });

    const userProjectAfter = await db('project').where({ user_id: userOne.user.id });
    expect(userProjectAfter.length).toBe(0);
  });

  it("should not delete other user's project", async () => {
    const userProjectBefore = await db('project').where({ user_id: userOne.user.id });
    expect(userProjectBefore.length).toBe(1);

    const variables = { id: projectOne.project.id };

    const client = getClient(userTwo.jwt);
    await client.mutate({
      mutation: deleteProjectMutation,
      variables
    });

    const userProjectAfter = await db('project').where({ user_id: userOne.user.id });
    expect(userProjectAfter.length).toBe(1);
  });
});
