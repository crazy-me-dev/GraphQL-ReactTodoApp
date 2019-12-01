import React from "react";
import wait from "waait";
import "@testing-library/jest-dom/extend-expect";
import { act } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";

import ProjectSidebar from "./ProjectSidebar";
import { renderWithProviders } from "../../utils/test-utils";
import { PROJECTS_QUERY, CREATE_PROJECT } from "./project.requests";

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
      query: CREATE_PROJECT,
      variables: { name: "Cars" }
    },
    result: {
      data: {
        createProject: {
          id: "4",
          name: "Cars",
          tasks: []
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
          { id: "1", name: "Inbox", tasks: [] },
          { id: "2", name: "Books", tasks: [] },
          { id: "3", name: "Sports", tasks: [] },
          { id: "4", name: "Cars", tasks: [] }
        ]
      }
    }
  }
];

describe("<ProjectSidebar />", () => {
  test("should render project list", async () => {
    await act(async () => {
      const { getByTestId, queryByTestId } = renderWithProviders(
        <MockedProvider mocks={mocks} addTypename={false}>
          <ProjectSidebar />
        </MockedProvider>,
        null
      );
      await wait(0);

      expect(getByTestId("project-1")).toHaveTextContent("Inbox");
      expect(getByTestId("project-2")).toHaveTextContent("Books");
      expect(getByTestId("project-3")).toHaveTextContent("Sports");
      expect(queryByTestId("project-4")).toBeNull();
    });
  });
});
