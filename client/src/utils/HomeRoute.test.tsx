import React from "react";

import { renderWithProviders, App } from "./test-utils";

describe("<HomeRoute/>", () => {
  test("should redirect not-logged in user to login screen", async () => {
    const { history } = await renderWithProviders(<App />, null, {
      route: "/"
    });

    expect(history.location.pathname).toBe("/login");
  });

  test("should redirect logged in user to first project", async () => {
    const { history } = await renderWithProviders(
      <App />,
      {
        id: "7357",
        name: "John Doe"
      },
      {
        route: "/"
      }
    );

    expect(history.location.pathname).toBe("/project/1");
  });
});
