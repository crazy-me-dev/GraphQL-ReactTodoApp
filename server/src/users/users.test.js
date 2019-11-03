import { gql } from "apollo-boost";
import * as bcrypt from "bcryptjs";

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
      projects {
        id
        name
        tasks {
          id
          description
        }
      }
    }
  }
`;

export const registerNewUserMutation = gql`
  mutation(
    $email: String!
    $password: String!
    $name: String!
    $termsAccepted: Boolean!
  ) {
    registerNewUser(
      email: $email
      password: $password
      name: $name
      termsAccepted: $termsAccepted
    ) {
      id
      name
      email
    }
  }
`;

export const deleteAccount = gql`
  mutation {
    deleteAccount {
      id
      name
    }
  }
`;

export const loginWithCredentialsMutation = gql`
  mutation($email: String!, $password: String!) {
    loginWithCredentials(email: $email, password: $password) {
      id
      name
    }
  }
`;

export const loginWithGoogleMutation = gql`
  mutation($id_token: String!) {
    loginWithGoogle(id_token: $id_token) {
      id
      name
    }
  }
`;

export const loginWithDemoCredentials = gql`
  mutation {
    loginWithDemoCredentials {
      id
      name
    }
  }
`;

export const logOutMutation = gql`
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
  let userRegistrationData = {
    email: "john@doe.oh",
    password: "secret123",
    name: "John Doe",
    termsAccepted: true
  };
  let userLoginData = {
    email: userRegistrationData.email,
    password: userRegistrationData.password
  };

  describe("when registering first time", () => {
    it("should create a new user account with credentials", async () => {
      const { data } = await client.mutate({
        mutation: registerNewUserMutation,
        variables: userRegistrationData
      });
      const user = data.registerNewUser;

      expect(user.name).toBe("John Doe");
      expect(user.email).toBe("john@doe.oh");
      expect(user.password).toBeFalsy();

      const [dbUser] = await db("user").where({
        id: user.id
      });
      const validPassword = await bcrypt.compare("secret123", dbUser.password);

      expect(dbUser.name).toBe("John Doe");
      expect(dbUser.email).toBe("john@doe.oh");
      expect(validPassword).toBe(true);
    });

    it("should throw if already registered", async () => {
      await client.mutate({
        mutation: registerNewUserMutation,
        variables: userRegistrationData
      });

      await expect(
        client.mutate({
          mutation: registerNewUserMutation,
          variables: userRegistrationData
        })
      ).rejects.toEqual(
        new Error("GraphQL error: You have already registered!")
      );
    });

    it("should throw when terms are not accepted on register", async () => {
      await expect(
        client.mutate({
          mutation: registerNewUserMutation,
          variables: { ...userRegistrationData, termsAccepted: false }
        })
      ).rejects.toEqual(
        new Error("GraphQL error: You have to accept the terms!")
      );
    });

    it("should throw when too short password", async () => {
      await expect(
        client.mutate({
          mutation: registerNewUserMutation,
          variables: { ...userRegistrationData, password: "short" }
        })
      ).rejects.toEqual(
        new Error(
          "GraphQL error: Password should be at least 6 characters long!"
        )
      );
    });
  });

  describe("when deleting an account", () => {
    it("should delete logged in user's account", async () => {
      const client = getClient(userOne.jwt);

      const {
        data: { deleteAccount: deletedUser }
      } = await client.mutate({
        mutation: deleteAccount
      });

      const users = await db("user").where({ id: userOne.user.id });

      expect(deletedUser).toBeTruthy();
      expect(users.length).toBe(0);
    });

    it("should delete user's projects and tasks", async () => {
      const client = getClient(userOne.jwt);

      await client.mutate({
        mutation: deleteAccount
      });

      const projects = await db("project").where({ user_id: userOne.user.id });
      const tasks = await db("user")
        .innerJoin("project", "user.id", "project.user_id")
        .innerJoin("task", "project.id", "task.project_id")
        .where({ user_id: userOne.user.id });

      expect(projects.length).toBe(0);
      expect(tasks.length).toBe(0);
    });

    it("should throw an error, if not logged in", async () => {
      await expect(
        client.mutate({
          mutation: deleteAccount
        })
      ).rejects.toEqual(
        new Error("GraphQL error: You must be logged in to delete an account")
      );
    });
  });

  describe("when logging in", () => {
    it("should log in with correct password", async () => {
      await client.mutate({
        mutation: registerNewUserMutation,
        variables: userRegistrationData
      });

      const { data } = await client.mutate({
        mutation: loginWithCredentialsMutation,
        variables: userLoginData
      });
      const user = data.loginWithCredentials;

      expect(user.name).toBe("John Doe");
    });

    it("should throw if password not provided", async () => {
      await expect(
        client.mutate({
          mutation: loginWithCredentialsMutation,
          variables: { email: userLoginData.email, password: "" }
        })
      ).rejects.toEqual(
        new Error("GraphQL error: You must provide both email and password!")
      );
    });

    it("should throw with incorrect password", async () => {
      await client.mutate({
        mutation: registerNewUserMutation,
        variables: userRegistrationData
      });

      await expect(
        client.mutate({
          mutation: loginWithCredentialsMutation,
          variables: { email: userLoginData.email, password: "incorrect123!" }
        })
      ).rejects.toEqual(
        new Error("GraphQL error: Given credentials are incorrect!")
      );
    });

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

    it("should register if Google user not existing yet", async () => {
      const usersBeforeRegistration = await db("user");
      expect(usersBeforeRegistration.length).toBe(2);

      const id_token = "123456789-new-user-id-token";
      const {
        data: { loginWithGoogle: user }
      } = await client.mutate({
        mutation: loginWithGoogleMutation,
        variables: { id_token }
      });

      expect(user.name).toBe("New Google User");

      const usersAfterRegistration = await db("user");
      expect(usersAfterRegistration.length).toBe(3);
    });

    it("should log demo user in", async () => {
      const {
        data: { loginWithDemoCredentials: userResponse }
      } = await client.mutate({
        mutation: loginWithDemoCredentials
      });

      const [user] = await db("user").where({ id: userResponse.id });

      expect(user).toBeTruthy();
      expect(user.is_demo_account).toBe(true);
    });
  });

  describe("when logging out", () => {
    it("should log out correctly", async () => {
      const {
        data: { logOut: res }
      } = await client.mutate({
        mutation: logOutMutation,
        variables: {}
      });

      expect(res.message).toEqual("Goodbye!");
    });
  });

  describe("when fetching data", () => {
    it("should have a default project after registration", async () => {
      const id_token = "123456789-new-user-id-token";

      const {
        data: { loginWithGoogle: user }
      } = await client.mutate({
        mutation: loginWithGoogleMutation,
        variables: { id_token }
      });

      const projects = await db("project").where({
        user_id: user.id
      });

      expect(projects.length).toBe(1);
      expect(projects[0].name).toBe("Inbox");
    });

    it("should have correct amount of projects", async () => {
      const client = getClient(userOne.jwt);

      const {
        data: { me }
      } = await client.query({ query: MeQuery });

      expect(me.projects.length).toBe(1);
    });

    it("should have correct amount of tasks in projects", async () => {
      const client = getClient(userOne.jwt);

      const {
        data: { me }
      } = await client.query({ query: MeQuery });

      expect(me.projects[0].tasks[0].description).toBe("Buy a car");
    });
  });
});
