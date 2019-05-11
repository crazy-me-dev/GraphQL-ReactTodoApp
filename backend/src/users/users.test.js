import { gql } from "apollo-boost";
import seedDatabase from "../test-utils/seedDatabase";
import db from "../utils/db";
import getClient from "../test-utils/getClient";

import { Mutation, Query } from "../users/users.resolvers";

const client = getClient(null);

const loginWithGoogle = gql`
  mutation($id_token: String!) {
    loginWithGoogle(id_token: $id_token) {
      name
    }
  }
`;

describe("User", () => {
  beforeEach(seedDatabase);

  it("should return me when logged in", async () => {
    const [user] = await db.users({ where: { name: "John Doe" } });
    const ctx = {
      db,
      request: {
        userId: user.id
      }
    };
    const me = await Query.me(null, null, ctx, null);
    expect(me.email).toBe("john.doe@example.com");
  });

  it("should not return me data when not logged in", async () => {
    const ctx = {
      db,
      request: {
        userId: undefined
      }
    };
    await expect(Query.me(null, null, ctx, null)).rejects.toEqual(
      new Error("User ID not provided.")
    );
  });

  it("should not return me data with incorrect userId", async () => {
    const ctx = {
      db,
      request: {
        userId: "id-not-exists"
      }
    };
    const me = await Query.me(null, null, ctx, null);
    expect(me).toBe(undefined);
  });

  it("should login with existing account", async () => {
    const idToken = "123456789-existing-user-id-token";
    const cookie = jest.fn((a, b, c) => {});
    const user = await Mutation.loginWithGoogle(
      null,
      { id_token: idToken },
      { db, response: { cookie } },
      null
    );
    expect(user.name).toBe("Google User");
    expect(cookie).toBeCalledTimes(1);
  });

  it("should register if user not existing yet", async () => {
    const usersBeforeRegistration = await db.users();
    expect(usersBeforeRegistration.length).toBe(2);

    const idToken = "123456789-new-user-id-token";
    const cookie = jest.fn((a, b, c) => {});
    const user = await Mutation.loginWithGoogle(
      null,
      { id_token: idToken },
      { db, response: { cookie } },
      null
    );
    expect(user.name).toBe("New Google User");
    expect(cookie).toBeCalledTimes(1);

    const usersAfterRegistration = await db.users();
    expect(usersAfterRegistration.length).toBe(3);
  });

  it("should have a default project after registration", async () => {
    const idToken = "123456789-new-user-id-token";
    const cookie = jest.fn((a, b, c) => {});
    const user = await Mutation.loginWithGoogle(
      null,
      { id_token: idToken },
      { db, response: { cookie } },
      null
    );
    const projects = await db.projects({
      where: { user: { id: user.id } }
    });
    expect(projects.length).toBe(1);
    expect(projects[0].name).toBe("Inbox");
  });

  it("should log out correctly", async () => {
    const ctx = {
      response: {
        clearCookie: jest.fn(a => {})
      }
    };
    const response = await Mutation.logOut(null, null, ctx, null);
    expect(ctx.response.clearCookie).toBeCalledWith("token");
    expect(response).toEqual({ message: "Goodbye!" });
  });
});
