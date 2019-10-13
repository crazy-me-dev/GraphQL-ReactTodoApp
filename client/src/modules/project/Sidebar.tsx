import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { Project } from "./project.model";
import DeleteProjectButton from "./DeleteProjectButton";
import { useProjectsQuery, useCreateProjectMutation } from "./project.requests";

const ProjectList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ProjectNumber = styled.small`
  margin-left: 0.5rem;
  font-size: 0.75rem;
  opacity: 0.6;
`;

const ProjectListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  a {
    text-decoration: none;
  }
`;

const Wrapper = styled.div`
  margin-right: 2rem;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
`;

const Sidebar: React.FC = () => {
  const { loading, error, data } = useProjectsQuery();
  const createProjectMutation = useCreateProjectMutation();
  const [newProjectName, updateNewProjectName] = useState("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const createNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    createProjectMutation(newProjectName);
    updateNewProjectName("");
  };

  return (
    <Wrapper>
      <ProjectList>
        {data.projects.map((project: Project) => (
          <ProjectListItem
            key={project.id}
            data-testid={`project-${project.id}`}
            style={{ opacity: project.id === "optimistic" ? 0.2 : 1 }}
          >
            <Link to={`/project/${project.id}`}>
              {project.name}
              <ProjectNumber>{project.tasks.length}</ProjectNumber>
            </Link>
            <DeleteProjectButton projectId={project.id} />
          </ProjectListItem>
        ))}
      </ProjectList>
      <hr />
      <form onSubmit={createNewProject}>
        <label>
          <div>Add a new project</div>
          <Input
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
    </Wrapper>
  );
};

export default Sidebar;
