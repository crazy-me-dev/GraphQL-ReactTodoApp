import React, { useState } from "react";
import styled from "@emotion/styled";

import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation
} from "./taskRequests";

const TaskRow = styled.div`
  border-bottom: 1px solid #eee;
  padding: 0.75rem 0;
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
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

export type Task = {
  id: string;
  description: string;
  done: boolean;
};

export type Project = {
  id: string;
  name: string;
  tasks: Task[];
};

export interface TaskListProps {
  project: Project;
}

const TaskList: React.FC<TaskListProps> = props => {
  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();

  const [newTaskName, setNewTaskName] = useState("");

  const addNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    createTaskMutation({
      description: newTaskName,
      done: false,
      project: props.project.id
    });
    setNewTaskName("");
  };

  const toggleTaskDone = (task: Task) => {
    updateTaskMutation(task.id, {
      description: task.description,
      done: !task.done
    });
  };

  const deleteTask = (id: string) => {
    deleteTaskMutation(id);
  };

  return (
    <div>
      {props.project.tasks.map(task => {
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
                  toggleTaskDone(task);
                }}
              />
              <span>{task.description}</span>
            </Checkbox>
            <button onClick={() => deleteTask(task.id)}>&times;</button>
          </TaskRow>
        );
      })}

      <br />

      <form onSubmit={addNewTask}>
        <label>
          <div>Add a new task</div>
          <Input
            type="text"
            value={newTaskName}
            onChange={e => setNewTaskName(e.target.value)}
          />
        </label>
        <button type="submit">Add task</button>
      </form>
    </div>
  );
};

export default TaskList;
