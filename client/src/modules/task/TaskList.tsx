import React, { useState } from "react";
import styled from "@emotion/styled";

import { Task } from "./task.model";
import { Project } from "../project/project.model";
import TaskListItem from "./TaskListItem";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation
} from "./task.requests";

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
`;

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

  const deleteTask = (task: Task) => {
    deleteTaskMutation(task.id);
  };

  return (
    <div>
      {props.project.tasks.map(task => {
        return (
          <TaskListItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onDoneToggle={toggleTaskDone}
          />
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
