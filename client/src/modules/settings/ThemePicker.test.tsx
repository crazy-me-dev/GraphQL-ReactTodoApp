import React from "react";
import { fireEvent } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test-utils";
import ThemePicker from "./ThemePicker";

describe("<ThemePicker />", () => {
  test("should change current theme", () => {
    const { container, getByTestId } = renderWithProviders(<ThemePicker />);

    const DarkThemeButton = getByTestId("selectthemebutton-dark");
    fireEvent.click(DarkThemeButton);

    expect(container.innerHTML).toContain(
      "Currently using <strong>Dark</strong> theme."
    );
  });
});
