import React from "react";
import styled from "@emotion/styled";

import { Task } from "./task.model";

const TaskRow = styled.div`
  border-bottom: 1px solid #eee;
  padding: 0.75rem 0;
  display: flex;
  justify-content: space-between;
`;

const Checkbox = styled.label`
  span {
    display: flex;
    align-items: center;
    &:hover::before {
      border-color: tomato;
      border-width: 2px;
    }
  }

  span::before {
    transition: all 0.2s;
    content: "";
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid #ccc;
    margin-right: 0.5rem;
  }

  input {
    display: none;
    &:checked + span {
      opacity: 0.3;
      &::before {
        background: #777;
        border: none;
      }
    }
  }
`;

export interface TaskListItemProps {
  task: Task;
  onDelete: (task: Task) => void;
  onDoneToggle: (task: Task) => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  onDelete,
  onDoneToggle
}) => {
  return (
    <TaskRow
      key={task.id}
      style={{ opacity: task.id === "optimistic" ? 0.2 : 1 }}
    >
      <Checkbox htmlFor={`t-${task.id}`}>
        <input
          id={`t-${task.id}`}
          type="checkbox"
          checked={task.done}
          onChange={() => {
            onDoneToggle(task);
          }}
        />
        <span>{task.description}</span>
      </Checkbox>
      <button
        onClick={() => {
          onDelete(task);
        }}
      >
        &times;
      </button>
    </TaskRow>
  );
};

export default TaskListItem;
