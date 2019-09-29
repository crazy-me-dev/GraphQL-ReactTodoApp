import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { ADD_TASK_MUTATION } from "../task/AddTask";
import { DELETE_TASK_MUTATION } from "../task/DeleteTask";
import { ME_QUERY } from "../login/Me";
import TaskItem from "../task/TaskItem";

interface Props {
  project: Project;
}

const ProjectOverview = ({ project }: Props) => {
  const [newTask, setNewTask] = useState("");
  const [addTask] = useMutation(ADD_TASK_MUTATION);
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION);

  return (
    <div>
      <h2>{project.name}</h2>
      <ul>
        {project.tasks.map(task => (
          <TaskItem
            task={task}
            onDelete={() => {
              deleteTask({
                variables: {
                  id: task.id
                },
                refetchQueries: [{ query: ME_QUERY }]
              });
            }}
          />
        ))}
      </ul>

      <hr />

      <h3>Create a new task</h3>

      <form
        action=""
        onSubmit={e => {
          e.preventDefault();
          addTask({
            variables: {
              data: {
                description: newTask,
                project: project.id,
                done: false
              }
            },
            refetchQueries: [{ query: ME_QUERY }]
          });
          setNewTask("");
        }}
      >
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button type="submit">Add task</button>
      </form>
    </div>
  );
};

export default ProjectOverview;
