import React from "react";
import { useParams } from "react-router-dom";

import styled from "../config/styles";
import { Project } from "../modules/project/project.model";
import { AppHeader, AppContainer } from "../modules/common";
import Sidebar from "../modules/project/Sidebar";
import TaskList from "../modules/task/TaskList";
import { useProjectsQuery } from "../modules/project/project.requests";
import DeleteProjectButton from "../modules/project/DeleteProjectButton";
interface ProjectProps {
  id?: string;
}

const ProjectRoute: React.FC<ProjectProps> = props => {
  const { data } = useProjectsQuery();
  const { id } = useParams();

  const project = data ? data.projects.find((p: Project) => p.id === id) : null;

  return (
    <>
      <AppHeader />
      <AppContainer>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            {project && (
              <div>
                <ProjectHead>
                  <h1>{project.name}</h1>
                  <DeleteProjectButton projectId={project.id} />
                </ProjectHead>
                <TaskList project={project} />
              </div>
            )}
          </div>
        </div>
      </AppContainer>
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

export default ProjectRoute;
