import React from "react";

import { renderWithProviders } from "./test-utils";
import HomeRoute from "./HomeRoute";

describe("<HomeRoute/>", () => {
  test("should redirect not-logged in user to login screen", async () => {
    const { history } = await renderWithProviders(<HomeRoute />, null, {
      route: "/"
    });

    expect(history.location.pathname).toBe("/login");
  });

  test("should redirect logged in user to first project", async () => {
    const { history } = await renderWithProviders(
      <HomeRoute />,
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
