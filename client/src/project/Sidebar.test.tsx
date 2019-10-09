import React from "react";
import wait from "waait";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";

import Sidebar from "./Sidebar";
import { renderWithProviders, fakeUser } from "../utils/test-utils";
import {
  PROJECTS_QUERY,
  DELETE_PROJECT,
  CREATE_PROJECT
} from "./projectRequests";

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

describe("<Sidebar />", () => {
  test("should render project list", async () => {
    await act(async () => {
      const { getByTestId, queryByTestId } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Sidebar />
        </MockedProvider>
      );
      await wait(0);

      expect(getByTestId("project-1")).toHaveTextContent("Inbox");
      expect(getByTestId("project-2")).toHaveTextContent("Books");
      expect(getByTestId("project-3")).toHaveTextContent("Sports");
      expect(queryByTestId("project-4")).toBeNull();
    });
  });

  test("should create a new project", async () => {
    await act(async () => {
      const { getByTestId, container } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Sidebar />
        </MockedProvider>
      );
      await wait(0);

      fireEvent.change(getByTestId("new-project-input"), {
        target: { value: "Cars" }
      });
      fireEvent.click(getByTestId("new-project-submit"));

      await wait(0);

      expect(getByTestId("project-1")).toHaveTextContent("Inbox");
      expect(getByTestId("project-2")).toHaveTextContent("Books");
      expect(getByTestId("project-3")).toHaveTextContent("Sports");
      expect(getByTestId("project-4")).toHaveTextContent("Cars");
    });
  });
});
