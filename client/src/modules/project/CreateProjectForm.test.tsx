import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import { fireEvent, act } from "@testing-library/react";
import wait from "waait";
import "@testing-library/jest-dom/extend-expect";

import CreateProjectForm from "./CreateProjectForm";
import Sidebar from "./Sidebar";
import { renderWithProviders } from "../../utils/test-utils";
import {
  PROJECTS_QUERY,
  DELETE_PROJECT,
  CREATE_PROJECT
} from "./project.requests";

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

describe("<CreateProjectForm />", () => {
  test("should create a new project", async () => {
    await act(async () => {
      const { getByTestId, container } = renderWithProviders(
        <MockedProvider mocks={mocks} addTypename={false}>
          <>
            <Sidebar />
            <CreateProjectForm />
          </>
        </MockedProvider>,
        null
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
