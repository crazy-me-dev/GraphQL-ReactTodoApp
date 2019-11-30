import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styled, { color } from "../../config/styles";
import { Modal, Title, Sidebar } from "../common";
import { Project } from "./project.model";
import CreateProjectForm from "./CreateProjectForm";
import { useProjectsQuery } from "./project.requests";
import { useSideMenu } from "./SideMenuProvider";

const ProjectSidebar: React.FC = () => {
  const { loading, error, data } = useProjectsQuery();
  const [modalIsOpen, setModalOpen] = useState(false);
  const { setSideMenuOpen } = useSideMenu();
  const { t } = useTranslation();

  if (loading) return null;
  if (error) return <div>{t("common.error")}</div>;

  return (
    <Sidebar>
      <ProjectListTitle>{t("project.listTitle")}</ProjectListTitle>

      <ProjectList>
        {data.projects.map((project: Project) => (
          <ProjectListItem
            key={project.id}
            data-testid={`project-${project.id}`}
            style={{ opacity: project.id === "optimistic" ? 0.2 : 1 }}
          >
            <Link
              to={`/project/${project.id}`}
              onClick={() => {
                setSideMenuOpen(false);
              }}
            >
              {project.name}
              <ProjectNumber>{project.tasks.length}</ProjectNumber>
            </Link>
          </ProjectListItem>
        ))}
      </ProjectList>

      <hr />

      <AddProjectButton
        onClick={() => setModalOpen(true)}
        data-testid="open-new-project-input"
      >
        {t("project.newButton")}
      </AddProjectButton>

      <Modal open={modalIsOpen} onClose={() => setModalOpen(false)}>
        <CreateProjectForm onSubmit={() => setModalOpen(false)} />
      </Modal>
    </Sidebar>
  );
};

const ProjectListTitle = styled(Title.H2)``;

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

const AddProjectButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    color: ${color("primary")};
  }

  &:before {
    display: inline-block;
    content: "+";
    font-weight: bold;
    margin-right: 0.5rem;
    transform: translateY(-0.1em);
  }
`;

export default ProjectSidebar;
