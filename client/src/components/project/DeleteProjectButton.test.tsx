import React from "react";
import { act, fireEvent } from "@testing-library/react";
import wait from "waait";
import { MockedProvider } from "@apollo/react-testing";
import { ApolloConsumer } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import DeleteProjectButton from "./DeleteProjectButton";
import { DELETE_PROJECT, PROJECTS_QUERY } from "./project.requests";
import { renderWithProviders } from "../../utils/test-utils";

const mocks = [
  {
    request: {
      query: PROJECTS_QUERY
    },
    result: {
      data: {
        projects: [
          { id: "1", name: "Inbox", tasks: [] },
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
  },
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
  }
];

describe("<DeleteProjectButton />", () => {
  test("should delete project when delete button is clicked", async () => {
    await act(async () => {
      let apolloClient: ApolloClient<{}> | undefined;
      const { getByTestId, container } = await renderWithProviders(
        <>
          <MockedProvider mocks={mocks} addTypename={false}>
            <ApolloConsumer>
              {client => {
                apolloClient = client;
                return <DeleteProjectButton projectId="1" />;
              }}
            </ApolloConsumer>
          </MockedProvider>
        </>
      );
      await wait(0);

      if (!apolloClient) throw new Error("ApolloClient no set");

      const resBefore = await apolloClient.query({ query: PROJECTS_QUERY });

      fireEvent.click(getByTestId("delete-project-1"));
      fireEvent.click(getByTestId("confirm-button"));

      const resAfter = await apolloClient.query({ query: PROJECTS_QUERY });

      expect(resBefore.data.projects.length).toBe(3);
      expect(resAfter.data.projects.length).toBe(2);
    });
  });
});
