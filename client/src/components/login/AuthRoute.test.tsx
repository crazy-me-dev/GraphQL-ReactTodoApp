import React from "react";

import AuthRoute from "./AuthRoute";
import { renderWithProviders, fakeUser } from "../../utils/test-utils";

describe("<AuthRoute />", () => {
  test("should redirect no-logged in user to login screen", () => {
    const { history, container } = renderWithProviders(
      <AuthRoute path="/private-page">
        <h1>This is a private page for logged in users</h1>
      </AuthRoute>,
      null,
      {
        route: "/private-page"
      }
    );

    expect(container.innerHTML).not.toContain(
      "This is a private page for logged in users"
    );
    expect(history.location.pathname).toBe("/login");
  });

  test("should show private page for logged in user", () => {
    const { history, container } = renderWithProviders(
      <AuthRoute path="/private-page">
        <h1>This is a private page for logged in users</h1>
      </AuthRoute>,
      fakeUser,
      {
        route: "/private-page"
      }
    );
    expect(container.innerHTML).toContain(
      "This is a private page for logged in users"
    );
    expect(history.location.pathname).toBe("/private-page");
  });
});
