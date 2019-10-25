import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Route } from "react-router-dom";

import { renderWithProviders } from "../../utils/test-utils";
import LoginRoute from "./LoginRoute";

export default describe("<LoginRoute />", () => {
  test("should show Google login button when not authed", async () => {
    const { getByText, history } = await renderWithProviders(
      <Route path="/login">
        <LoginRoute />
      </Route>,
      null,
      { route: "/login" }
    );

    const loginButton = getByText("login.googleButton");

    expect(history.location.pathname).toBe("/login");
    expect(loginButton).toBeDefined();
  });

  test("should redirect already loggedin user to root url", async () => {
    const { history } = await renderWithProviders(<LoginRoute />, {
      id: "7357",
      name: "John Doe"
    });

    expect(history.location.pathname).toBe("/");
  });
});
