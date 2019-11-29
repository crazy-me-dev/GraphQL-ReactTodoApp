import React from "react";

import { Project } from "./project.model";
import styled from "../../config/styles";
import TaskList from "../task/TaskList";
import DeleteProjectButton from "./DeleteProjectButton";

interface ProjectProps {
  project: Project;
}

const ProjectView: React.FC<ProjectProps> = ({ project }) => {
  return (
    <>
      <ProjectHead>
        <h1>{project.name}</h1>
        <DeleteProjectButton projectId={project.id} />
      </ProjectHead>
      <TaskList project={project} />
    </>
  );
};

const ProjectHead = styled.div`
  display: flex;
  align-items: center;
  h1:first-of-type {
    flex: 1;
  }
`;

export default ProjectView;
