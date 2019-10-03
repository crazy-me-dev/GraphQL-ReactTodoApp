import React, { useState } from "react";

import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation
} from "./taskRequests";

type Task = {
  id: string;
  description: string;
  done: boolean;
};

type Project = {
  id: string;
  name: string;
  tasks: [Task];
};

interface TaskListProps {
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
          <div key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => {
                  toggleTaskDone(task);
                }}
              />
              {task.description}
              <button onClick={() => deleteTask(task.id)}>&times;</button>
            </label>
          </div>
        );
      })}
      <hr />

      <form onSubmit={addNewTask}>
        <label>
          <div>Add a new task</div>
          <input
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
