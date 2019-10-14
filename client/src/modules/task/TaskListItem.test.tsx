import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Task } from "./task.model";
import { fakeTask } from "../../utils/test-utils";
import TaskListItem from "./TaskListItem";

describe("<TaskListItem />", () => {
  test("should change edit mode when description clicked", () => {
    const { getByText, queryByTestId } = render(
      <TaskListItem
        task={fakeTask()}
        onDescriptionChange={() => {}}
        onDoneToggle={() => {}}
        onDelete={() => {}}
      />
    );

    expect(queryByTestId("description-input")).toBeFalsy();
    expect(queryByTestId("description-text")).toBeTruthy();

    fireEvent.click(getByText("Buy milk"));

    expect(queryByTestId("description-input")).toBeTruthy();
    expect(queryByTestId("description-text")).toBeFalsy();
  });

  test("should trigger onDelete", () => {
    const mockDeleteFn = jest.fn();

    const { getByTestId } = render(
      <TaskListItem
        task={fakeTask()}
        onDescriptionChange={() => {}}
        onDoneToggle={() => {}}
        onDelete={() => {
          mockDeleteFn();
        }}
      />
    );

    fireEvent.click(getByTestId("delete-task"));
    expect(mockDeleteFn).toHaveBeenCalled();
  });

  test("should trigger onDescriptionChange", () => {
    const mockChangeFn = jest.fn();
    let descriptionText = "";

    const { getByTestId } = render(
      <TaskListItem
        task={fakeTask()}
        onDescriptionChange={(description, task) => {
          descriptionText = description;
          mockChangeFn();
        }}
        onDoneToggle={() => {}}
        onDelete={() => {}}
      />
    );

    // Trigger on blur
    fireEvent.click(getByTestId("description-text"));
    fireEvent.change(getByTestId("description-input"), {
      target: { value: "Changed" }
    });
    fireEvent.blur(getByTestId("description-input"));

    // Trigger on Enter
    fireEvent.click(getByTestId("description-text"));
    fireEvent.change(getByTestId("description-input"), {
      target: { value: "Changed again" }
    });
    fireEvent.keyDown(getByTestId("description-input"), { key: "Enter" });

    expect(mockChangeFn).toHaveBeenCalledTimes(2);
    expect(descriptionText).toBe("Changed again");
  });

  test("should trigger onDoneToggle", () => {
    const mockDoneToggleFn = jest.fn();

    const { getByTestId } = render(
      <TaskListItem
        task={fakeTask()}
        onDescriptionChange={() => {}}
        onDoneToggle={() => {
          mockDoneToggleFn();
        }}
        onDelete={() => {}}
      />
    );

    fireEvent.click(getByTestId("task-done-checkbox"));

    expect(mockDoneToggleFn).toHaveBeenCalled();
  });
});
