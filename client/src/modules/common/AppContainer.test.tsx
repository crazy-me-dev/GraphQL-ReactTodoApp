import React from "react";
import { renderWithProviders } from "../../utils/test-utils";

import AppContainer from "./AppContainer";

describe("<AppContainer />", () => {
  test("should contain the app header and container", () => {
    const { getByTestId, container } = renderWithProviders(
      <AppContainer>
        <h1 data-testid="app-content">App Content</h1>
      </AppContainer>
    );

    expect(getByTestId("app-container")).toBeTruthy();
    expect(container.innerHTML).toContain("App Content");
  });
});
