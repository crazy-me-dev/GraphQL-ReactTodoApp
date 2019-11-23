import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styled, { mq, color } from "../../config/styles";
import { Button, Modal } from "../common";
import { Project } from "./project.model";
import CreateProjectForm from "./CreateProjectForm";
import { useProjectsQuery } from "./project.requests";
import { useSideMenu } from "./SideMenuProvider";

interface WrapperProps {
  open: boolean;
  menuTranslateX: number;
  isTouching: boolean;
}

const Sidebar: React.FC = () => {
  const { loading, error, data } = useProjectsQuery();
  const [modalIsOpen, setModalOpen] = useState(false);
  const { isSideMenuOpen, setSideMenuOpen } = useSideMenu();
  const { t } = useTranslation();
  const [touchX, setTouchX] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isTouching, setTouching] = useState(false);

  let menuTranslateX = ((touchX - touchStartX) * 100) / window.innerWidth;
  menuTranslateX = Math.min(menuTranslateX, 0);

  if (loading) return null;
  if (error) return <div>{t("common.error")}</div>;

  return (
    <>
      <Overlay
        visible={isSideMenuOpen}
        onTouchStart={() => {
          setSideMenuOpen(false);
        }}
      />
      <Wrapper
        menuTranslateX={menuTranslateX}
        isTouching={isTouching}
        open={isSideMenuOpen}
        onTouchStart={e => {
          setTouching(true);
          setTouchStartX(e.targetTouches[0].clientX);
          setTouchX(e.targetTouches[0].clientX);
        }}
        onTouchMove={e => {
          setTouchX(e.targetTouches[0].clientX);
        }}
        onTouchEnd={() => {
          setTouching(false);
          if (menuTranslateX < -25) {
            setSideMenuOpen(false);
          }
          setTouchStartX(0);
          setTouchX(0);
        }}
      >
        <CloseButton
          onClick={() => {
            setSideMenuOpen(false);
          }}
        >
          &times;
        </CloseButton>
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
      </Wrapper>
    </>
  );
};

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

const CloseButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0.5rem;
  border: none;
  font-size: 2rem;
  padding: 0.2rem;
  line-height: 1;
  color: ${color("text")};
  &:hover {
    background: transparent;
    color: ${color("primary")};
  }
  ${mq("medium")} {
    display: none;
  }
`;

const Overlay = styled.div<{ visible: boolean }>`
  transition: all 0.4s;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9;
  opacity: ${props => (props.visible ? "1.0" : "0")};
  pointer-events: ${props => (props.visible ? "auto" : "none")};
`;

const Wrapper = styled.div<WrapperProps>`
  position: relative;
  transition: all ${props => (props.isTouching ? `0s` : `0.4s`)};
  padding: 4rem 1rem 1rem 1rem;
  background: ${color("background")};
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 70vw;
  z-index: 10;
  transform: ${props =>
    props.open ? `translateX(${props.menuTranslateX}%)` : `translateX(-100%)`};

  ${mq("medium")} {
    margin-top: 1rem;
    padding: 1rem;
    background: transparent;
    transform: translate(0);
    position: static;
    width: 220px;
    margin-right: 2rem;
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

export default Sidebar;
