import { gql } from "apollo-boost";

import db from "../utils/db";
import getClient from "../test-utils/getClient";
import seedDatabase, { userOne } from "../test-utils/seedDatabase";
import {
  startTestServer,
  closeTestServer
} from "../test-utils/setupTestServer";

const MeQuery = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

const loginWithGoogleMutation = gql`
  mutation($id_token: String!) {
    loginWithGoogle(id_token: $id_token) {
      id
      name
    }
  }
`;

const logOutMutation = gql`
  mutation {
    logOut {
      message
    }
  }
`;

const client = getClient();

describe("User", () => {
  beforeEach(seedDatabase);
  beforeAll(startTestServer);
  afterAll(closeTestServer);

  it("should return me when logged in", async () => {
    const client = getClient(userOne.jwt);

    const {
      data: { me }
    } = await client.query({ query: MeQuery });

    expect(me.email).toBe("john.doe@example.com");
  });

  it("should not return me data when not logged in", async () => {
    await expect(client.query({ query: MeQuery })).rejects.toEqual(
      new Error("GraphQL error: You are not logged in.")
    );
  });

  it("should not return me data with incorrect userId", async () => {
    const client = getClient("token-that-does-not-exist.123.123");
    await expect(client.query({ query: MeQuery })).rejects.toEqual(
      new Error("GraphQL error: You are not logged in.")
    );
  });

  it("should login with existing account", async () => {
    const id_token = "123456789-existing-user-id-token";

    const {
      data: { loginWithGoogle: user }
    } = await client.mutate({
      mutation: loginWithGoogleMutation,
      variables: { id_token }
    });

    expect(user.name).toBe("Google User");
  });

  it("should register if user not existing yet", async () => {
    const usersBeforeRegistration = await db.users();
    expect(usersBeforeRegistration.length).toBe(2);

    const id_token = "123456789-new-user-id-token";
    const {
      data: { loginWithGoogle: user }
    } = await client.mutate({
      mutation: loginWithGoogleMutation,
      variables: { id_token }
    });

    expect(user.name).toBe("New Google User");

    const usersAfterRegistration = await db.users();
    expect(usersAfterRegistration.length).toBe(3);
  });

  it("should have a default project after registration", async () => {
    const id_token = "123456789-new-user-id-token";

    const {
      data: { loginWithGoogle: user }
    } = await client.mutate({
      mutation: loginWithGoogleMutation,
      variables: { id_token }
    });

    const projects = await db.projects({
      where: { user: { id: user.id } }
    });
    expect(projects.length).toBe(1);
    expect(projects[0].name).toBe("Inbox");
  });

  it("should log out correctly", async () => {
    const {
      data: { logOut: response }
    } = await client.mutate({
      mutation: logOutMutation,
      variables: {}
    });

    expect(response.message).toEqual("Goodbye!");
  });
});
