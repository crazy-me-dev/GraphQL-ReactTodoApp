import React from "react";

import TaskList from "./TaskList";
import { renderWithProviders } from "../../utils/test-utils";

const project = {
  id: "1",
  name: "Test Project",
  tasks: [
    { id: "1", description: "Test all components", done: false },
    { id: "2", description: "Test coverage 100%", done: false }
  ]
};

describe("<TaskList />", () => {
  test("should render tasks", () => {
    const { container } = renderWithProviders(<TaskList project={project} />);
    expect(container.innerHTML).toContain("Test all components");
    expect(container.innerHTML).toContain("Test coverage 100%");
  });
});
