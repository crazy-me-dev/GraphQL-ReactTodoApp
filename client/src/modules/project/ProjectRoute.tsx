import React from "react";
import { useParams } from "react-router-dom";

import { Project } from "./project.model";
import AppContainer from "../common/AppContainer";
import Sidebar from "./Sidebar";
import TaskList from "../task/TaskList";
import { useProjectsQuery } from "./project.requests";

interface ProjectProps {
  id?: string;
}

const ProjectRoute: React.FC<ProjectProps> = props => {
  const { data } = useProjectsQuery();
  const { id } = useParams();

  const project = data ? data.projects.find((p: Project) => p.id === id) : null;

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
