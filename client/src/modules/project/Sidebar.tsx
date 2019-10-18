import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "../../config/styles";

import { Button, Modal } from "../common";
import { Project } from "./project.model";
import CreateProjectForm from "./CreateProjectForm";
import DeleteProjectButton from "./DeleteProjectButton";
import { useProjectsQuery } from "./project.requests";

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

const Sidebar: React.FC = () => {
  const { loading, error, data } = useProjectsQuery();

  const [modalIsOpen, setModalOpen] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
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

      <Button
        onClick={() => setModalOpen(true)}
        data-testid="open-new-project-input"
      >
        Add Project
      </Button>

      <Modal open={modalIsOpen} onClose={() => setModalOpen(false)}>
        <CreateProjectForm onSubmit={() => setModalOpen(false)} />
      </Modal>
    </Wrapper>
  );
};

export default Sidebar;
