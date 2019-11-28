import React from "react";

import { renderWithProviders } from "../utils/test-utils";
import HomePage from "./HomePage";

describe("<HomePage/>", () => {
  test("should redirect not-logged in user to login screen", async () => {
    const { history } = await renderWithProviders(<HomePage />, null, {
      route: "/"
    });

    expect(history.location.pathname).toBe("/login");
  });

  test("should redirect logged in user to first project", async () => {
    const { history } = await renderWithProviders(
      <HomePage />,
      {
        id: "7357",
        name: "John Doe",
        projects: [{ id: "13", name: "Inbox", tasks: [], order_number: 1 }]
      },
      {
        route: "/"
      }
    );

    expect(history.location.pathname).toBe("/project/13");
  });
});
