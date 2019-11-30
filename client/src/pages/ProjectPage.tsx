import React from "react";
import { useParams } from "react-router-dom";

import { Project } from "../modules/project/project.model";
import ProjectView from "../modules/project/ProjectView";
import { AppHeader, AppContainer } from "../modules/common";
import ProjectSidebar from "../modules/project/ProjectSidebar";
import { useProjectsQuery } from "../modules/project/project.requests";

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
      <AppContainer flex>
        <ProjectSidebar />
        <div style={{ flex: 1 }}>
          {project && <ProjectView project={project} />}
        </div>
      </AppContainer>
    </>
  );
};

export default ProjectRoute;
