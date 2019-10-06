import React, { useState } from "react";
import { Link } from "@reach/router";

import DeleteProjectButton from "./DeleteProjectButton";
import { useProjectsQuery, useCreateProjectMutation } from "./projectRequests";

type Project = {
  id: string;
  name: string;
};

const Sidebar: React.FC = () => {
  const { loading, error, data } = useProjectsQuery();
  const createProjectMutation = useCreateProjectMutation();

  const [newProjectName, updateNewProjectName] = useState("");
  // console.log(loading, error, data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const createNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    createProjectMutation(newProjectName);
    updateNewProjectName("");
  };

  return (
    <div>
      <ul>
        {data.projects.map((project: Project) => (
          <li key={project.id} data-testid={`project-${project.id}`}>
            <Link to={`/project/${project.id}`}>{project.name}</Link>
            <DeleteProjectButton projectId={project.id} />
          </li>
        ))}
      </ul>
      <hr />
      <form onSubmit={createNewProject}>
        <label>
          <div>Add new project</div>
          <input
            data-testid="new-project-input"
            type="text"
            value={newProjectName}
            onChange={e => updateNewProjectName(e.target.value)}
          />
        </label>
        <button data-testid="new-project-submit" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
