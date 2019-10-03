import React, { useState } from "react";
import { Link } from "@reach/router";

import {
  useProjectsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation
} from "./projectRequests";

type Project = {
  id: string;
  name: string;
};

const Sidebar: React.FC = () => {
  const { loading, error, data } = useProjectsQuery();
  const createProjectMutation = useCreateProjectMutation();
  const deleteProjectMutation = useDeleteProjectMutation();

  const [newProjectName, updateNewProjectName] = useState("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const createNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    createProjectMutation(newProjectName);
    updateNewProjectName("");
  };

  const deleteProject = (id: string) => {
    deleteProjectMutation(id);
  };

  return (
    <div>
      <ul>
        {data.projects.map((project: Project) => (
          <li key={project.id}>
            <Link to={`/project/${project.id}`}>{project.name}</Link>
            <button onClick={() => deleteProject(project.id)}>&times;</button>
          </li>
        ))}
      </ul>
      <hr />
      <form onSubmit={createNewProject}>
        <label>
          <div>Add new project</div>
          <input
            type="text"
            value={newProjectName}
            onChange={e => updateNewProjectName(e.target.value)}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Sidebar;
