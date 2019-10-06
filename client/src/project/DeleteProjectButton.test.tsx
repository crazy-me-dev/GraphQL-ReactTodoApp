import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import wait from "waait";
import { MockedProvider } from "@apollo/react-testing";
import { ApolloConsumer } from "@apollo/react-hooks";

import DeleteProjectButton from "./DeleteProjectButton";
import { DELETE_PROJECT, PROJECTS_QUERY } from "../project/projectRequests";

const mocks = [
  {
    request: {
      query: PROJECTS_QUERY
    },
    result: {
      data: {
        projects: [
          { id: "2", name: "Books", tasks: [] },
          { id: "3", name: "Sports", tasks: [] }
        ]
      }
    }
  },
  {
    request: {
      query: DELETE_PROJECT,
      variables: { id: "1" }
    },
    result: {
      data: {
        deleteProject: {
          id: "1"
        }
      }
    }
  }
];

describe("<DeleteProjectButton />", () => {
  test("should delete project when delete button is clicked", async () => {
    await act(async () => {
      let apolloClient;
      const { getByTestId, container } = await render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <ApolloConsumer>
            {client => {
              apolloClient = client;
              return <DeleteProjectButton projectId="1" />;
            }}
          </ApolloConsumer>
        </MockedProvider>
      );
      await wait(0);

      fireEvent.click(getByTestId("delete-project-1"));

      const res = await apolloClient.query({ query: PROJECTS_QUERY });

      expect(res.data.projects.length).toBe(2);
    });
  });
});
