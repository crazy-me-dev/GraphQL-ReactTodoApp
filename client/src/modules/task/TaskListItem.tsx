import React, { useState } from "react";

import { Task } from "./task.model";
import styled from "../../config/styles";

export interface TaskListItemProps {
  task: Task;
  onDelete: (task: Task) => void;
  onDoneToggle: (task: Task) => void;
  onDescriptionChange: (newDescription: string, task: Task) => void;
}

const Checkbox = styled.label`
  span {
    position: relative;
    transition: all 0.2s;
    content: "";
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.borderDark};
    margin-right: 0.5rem;
    &:hover {
      border-color: ${props => props.theme.colors.primary};
      border-width: 1px;
      box-shadow: inset 0 0 0 1px ${props => props.theme.colors.primary};
    }
  }

  span::after {
    transition: all 0.2s;
    transition-timing-function: cubic-bezier(0, 1.05, 1, 1.75);
    content: "";
    display: block;
    width: 0.4rem;
    height: 0.8rem;
    position: absolute;
    top: 0.3rem;
    left: 0.5rem;
    border-bottom: 3px solid ${props => props.theme.colors.primary};
    border-right: 3px solid ${props => props.theme.colors.primary};
    transform: rotate(40deg) scale(0.5);
    opacity: 0;
  }

  input {
    display: none;
    &:checked + span {
      &::before {
        background: ${props => props.theme.colors.border};
        border: none;
      }
      &::after {
        opacity: 1;
        transform: rotate(40deg) scale(1);
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
  background-color: transparent;
`;

const DescriptionInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: transparent;
  &:focus {
    outline: none;
    border: 2px solid ${props => props.theme.colors.primary};
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
  color: ${props => props.theme.colors.primary};
  border: 2px solid transparent;
  padding: 0;
  &:hover,
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    opacity: 1;
    outline: none;
  }
`;

const TaskRow = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 0.75rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    <TaskRow>
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
        className="delete-button"
        data-testid="delete-task"
      >
        &times;
      </DeleteButton>
    </TaskRow>
  );
};

export default TaskListItem;
