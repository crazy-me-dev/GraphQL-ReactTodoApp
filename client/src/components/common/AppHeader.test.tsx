import React from "react";

import AppHeader from "./AppHeader";
import { renderWithProviders, fakeUser } from "../../utils/test-utils";

describe("<AppHeader />", () => {
  test("should render correct elements without children prop", () => {
    const { queryByTestId } = renderWithProviders(<AppHeader />);

    expect(queryByTestId("logo")).toBeTruthy();
    expect(queryByTestId("open-side-menu")).toBeTruthy();
  });

  test("should render correct elements with children prop", () => {
    const { queryByTestId } = renderWithProviders(
      <AppHeader>
        <h1 data-testid="test-header"></h1>
      </AppHeader>
    );

    expect(queryByTestId("logo")).toBeFalsy();
    expect(queryByTestId("open-side-menu")).toBeFalsy();
    expect(queryByTestId("test-header")).toBeTruthy();
  });

  test("should render logout button when logged in", () => {
    const { queryByTestId } = renderWithProviders(<AppHeader />, fakeUser);

    expect(queryByTestId("logout-button")).toBeTruthy();
  });
});
