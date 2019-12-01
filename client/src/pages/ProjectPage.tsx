import React from "react";
import { useParams } from "react-router-dom";

import { Project } from "../components/project/project.model";
import ProjectView from "../components/project/ProjectView";
import { AppHeader, AppContainer } from "../components/common";
import ProjectSidebar from "../components/project/ProjectSidebar";
import { useProjectsQuery } from "../components/project/project.requests";

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
