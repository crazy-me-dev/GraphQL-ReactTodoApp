import React from "react";
import { fireEvent, act } from "@testing-library/react";

import Modal from "./Modal";
import { renderWithProviders } from "../../utils/test-utils";

describe("<Modal />", () => {
  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("should render open modal", () => {
    renderWithProviders(
      <Modal open={true} onClose={() => {}}>
        <span>This is modal content</span>
      </Modal>
    );

    expect(document.body.innerHTML).toContain("This is modal content");
  });

  test("should not render closed modal", () => {
    renderWithProviders(
      <Modal open={false} onClose={() => {}}>
        <span>This is modal content</span>
      </Modal>
    );

    expect(document.body.innerHTML).not.toContain("This is modal content");
  });

  test("should close modal on outside click", () => {
    let onCloseCalled = false;

    renderWithProviders(
      <Modal
        open={true}
        onClose={() => {
          onCloseCalled = true;
        }}
      >
        <span>This is modal content</span>
      </Modal>
    );

    const modalOutside = document.querySelector("[data-testid=modal-outside]");

    if (modalOutside) {
      fireEvent.mouseDown(modalOutside);
    }

    expect(onCloseCalled).toBe(true);
  });

  test("should close modal on close button click", () => {
    let onCloseCalled = false;

    renderWithProviders(
      <Modal
        open={true}
        onClose={() => {
          onCloseCalled = true;
        }}
      >
        <span>This is modal content</span>
      </Modal>
    );

    const modalCloseButton = document.querySelector(
      "[data-testid=modal-close-button]"
    );

    if (modalCloseButton) {
      fireEvent.click(modalCloseButton);
    }

    expect(onCloseCalled).toBe(true);
  });
});
