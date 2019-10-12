import React from "react";

import { renderWithProviders, App } from "./utils/test-utils";

describe("<App />", () => {
  test("should render 404 page", async () => {
    const { container } = await renderWithProviders(<App />, null, {
      route: "/this-route-does-not-exist"
    });

    expect(container.innerHTML).toMatch("404");
  });
});
