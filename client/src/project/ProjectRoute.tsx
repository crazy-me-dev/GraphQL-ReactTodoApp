import React from "react";
import { RouteComponentProps } from "@reach/router";

import AppContainer from "../common/AppContainer";
import Sidebar from "./Sidebar";
import TaskList from "./TaskList";
import { useProjectsQuery } from "./projectRequests";

interface ProjectProps extends RouteComponentProps {
  id?: string;
}

type Project = {
  id: string;
  name: string;
};

const ProjectRoute: React.FC<ProjectProps> = props => {
  const { data } = useProjectsQuery();

  const project = data
    ? data.projects.find((p: Project) => p.id === props.id)
    : null;

  return (
    <AppContainer>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <Sidebar />
        </div>
        <div style={{ flex: 6 }}>
          {project && (
            <div>
              <h1>{project.name}</h1>
              <TaskList project={project} />
            </div>
          )}
        </div>
      </div>
    </AppContainer>
  );
};

export default ProjectRoute;
