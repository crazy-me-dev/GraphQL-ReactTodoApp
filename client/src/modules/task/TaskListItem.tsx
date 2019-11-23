import React, { useState } from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd/index";

import { ReactComponent as HandleIcon } from "../../assets/drag-handle-icon.svg";
import { Task } from "./task.model";
import styled, { mq, color } from "../../config/styles";

export interface TaskListItemProps {
  task: Task;
  index: number;
  onDelete: (task: Task) => void;
  onDoneToggle: (task: Task) => void;
  onDescriptionChange: (newDescription: string, task: Task) => void;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  index,
  onDelete,
  onDoneToggle,
  onDescriptionChange,
  dragHandleProps
}) => {
  const [newDescription, setNewDescription] = useState(task.description);
  const [isEditMode, setEditMode] = useState(false);

  const exitEditMode = () => {
    onDescriptionChange(newDescription, task);
    setEditMode(false);
  };

  return (
    <TaskRow>
      {dragHandleProps && (
        <DragHandle {...dragHandleProps} className="drag-handle">
          <HandleIcon />
        </DragHandle>
      )}

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

const DragHandle = styled.div`
  transition: all 0.2s;
  padding: 1rem;
  color: ${color("grey400")};
  opacity: 1;
  display: flex;
  align-items: center;
  svg {
    fill: currentColor;
  }

  ${mq("medium")} {
    opacity: 0;
    position: absolute;
    right: 100%;
    bottom: 0;
    top: 0;
  }
`;

const Checkbox = styled.label`
  display: inline-flex;
  align-items: center;

  span {
    position: relative;
    transition: all 0.2s;
    content: "";
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid ${color("borderDark")};
    margin-right: 0.5rem;
    &:hover {
      border-color: ${color("primary")};
      border-width: 1px;
      box-shadow: inset 0 0 0 1px ${color("primary")};
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
    border-bottom: 3px solid ${color("primary")};
    border-right: 3px solid ${color("primary")};
    transform: rotate(40deg) scale(0.5);
    opacity: 0;
  }

  input {
    display: none;
    &:checked + span {
      &::before {
        background: ${color("border")};
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
  opacity: ${props => (props.done ? 0.7 : 1)};
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
    border: 2px solid ${color("primary")};
  }
`;

const DeleteButton = styled.button`
  background: transparent;
  transition: all 0.2s;
  border: none;
  font-size: 1.5rem;
  line-height: 0.9;
  width: 2rem;
  height: 2rem;
  font-weight: 400;
  color: ${color("grey400")};
  border-radius: 50%;
  border: 2px solid transparent;
  padding: 0;
  &:hover,
  &:focus {
    border-color: ${color("primary")};
    color: ${color("primary")};
    opacity: 1;
    outline: none;
  }

  ${mq("medium")} {
    opacity: 0;
    color: ${color("primary")};
  }
`;

const TaskRow = styled.div`
  position: relative;
  border-bottom: 1px solid ${color("border")};
  padding: 0.75rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${color("background")};
  &:hover {
    .delete-button,
    .drag-handle {
      opacity: 1;
    }
  }
`;

export default TaskListItem;
