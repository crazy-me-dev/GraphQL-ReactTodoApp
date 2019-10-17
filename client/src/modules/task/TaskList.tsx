import React, { useState } from "react";

import { Button, Input, ListTransition } from "../common";
import { Task } from "./task.model";
import { Project } from "../project/project.model";
import TaskListItem from "./TaskListItem";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation
} from "./task.requests";

export interface TaskListProps {
  project: Project;
}

const TaskList: React.FC<TaskListProps> = ({ project }) => {
  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();

  const [newTaskName, setNewTaskName] = useState("");

  const addNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    createTaskMutation({
      description: newTaskName,
      done: false,
      project: project.id
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

  const updateDescription = (newDescription: string, task: Task) => {
    updateTaskMutation(task.id, {
      description: newDescription,
      done: task.done
    });
  };

  return (
    <div>
      {project.tasks.map(task => (
        <ListTransition key={task.id}>
          <TaskListItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onDoneToggle={toggleTaskDone}
            onDescriptionChange={updateDescription}
          />
        </ListTransition>
      ))}

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
        <Button type="submit">Add task</Button>
      </form>
    </div>
  );
};

export default TaskList;
