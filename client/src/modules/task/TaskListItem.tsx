import React, { useState } from "react";
import styled from "@emotion/styled/macro";

import { Task } from "./task.model";

export interface TaskListItemProps {
  task: Task;
  onDelete: (task: Task) => void;
  onDoneToggle: (task: Task) => void;
  onDescriptionChange: (newDescription: string, task: Task) => void;
}

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

const DescriptionContainer = styled.div`
  flex: 1;
  margin-right: 1rem;
`;

const Description = styled.button<{ done: boolean }>`
  padding: 0.5rem 1rem;
  width: 100%;
  text-align: left;
  border: 2px solid transparent;
  opacity: ${props => (props.done ? 0.5 : 1)};
`;

const DescriptionInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  &:focus {
    outline: none;
    border: 2px solid #fb3535;
  }
`;

const DeleteButton = styled.button`
  opacity: 0;
  background: transparent;
  transition: all 0.2s;
  border: none;
  font-size: 1.5rem;
  line-height: 0.9;
  width: 2rem;
  height: 2rem;
  font-weight: 400;
  color: #ddd;
  border-radius: 50%;
  color: #fb3535;
  border: 2px solid transparent;
  padding: 0;
  &:hover,
  &:focus {
    border-color: #fb3535;
    opacity: 1;
    outline: none;
  }
`;

const TaskRow = styled.div`
  border-bottom: 1px solid #eee;
  padding: 0.75rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover,
  &:focus-within {
    ${DeleteButton} {
      opacity: 1;
    }
  }
`;

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  onDelete,
  onDoneToggle,
  onDescriptionChange
}) => {
  const [newDescription, setNewDescription] = useState(task.description);
  const [isEditMode, setEditMode] = useState(false);

  const exitEditMode = () => {
    onDescriptionChange(newDescription, task);
    setEditMode(false);
  };

  return (
    <TaskRow key={task.id}>
      <Checkbox htmlFor={`t-${task.id}`}>
        <input
          id={`t-${task.id}`}
          type="checkbox"
          checked={task.done}
          onChange={() => {
            onDoneToggle(task);
          }}
          data-testid="task-done-checkbox"
        />
        <span></span>
      </Checkbox>
      <DescriptionContainer>
        {isEditMode ? (
          <DescriptionInput
            type="text"
            autoFocus
            value={newDescription}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setNewDescription(e.currentTarget.value);
            }}
            onBlur={() => exitEditMode()}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                exitEditMode();
              }
            }}
            data-testid="description-input"
          />
        ) : (
          <Description
            done={task.done}
            onClick={() => setEditMode(true)}
            data-testid="description-text"
          >
            {task.description}
          </Description>
        )}
      </DescriptionContainer>
      <DeleteButton
        onClick={() => {
          onDelete(task);
        }}
        data-testid="delete-task"
      >
        &times;
      </DeleteButton>
    </TaskRow>
  );
};

export default TaskListItem;
