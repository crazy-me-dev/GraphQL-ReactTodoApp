import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Project } from "./project.model";
import { Button, Input, SROnly } from "../common";
import styled, { color, mq } from "../../config/styles";
import TaskList from "../task/TaskList";
import DeleteProjectButton from "./DeleteProjectButton";
import { useCreateTaskMutation } from "../task/task.requests";

interface ProjectProps {
  project: Project;
}

const ProjectView: React.FC<ProjectProps> = ({ project }) => {
  const createTaskMutation = useCreateTaskMutation();
  const [newTaskName, setNewTaskName] = useState("");
  const { t } = useTranslation();

  const addNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskName === "") return;

    createTaskMutation({
      description: newTaskName,
      done: false,
      project: project.id
    });
    setNewTaskName("");
  };

  return (
    <>
      <ProjectHead>
        <h1>{project.name}</h1>
        <DeleteProjectButton projectId={project.id} />
      </ProjectHead>

      <TaskList project={project} />

      <AddTaskForm onSubmit={addNewTask}>
        <label>
          <SROnly>
            <div>{t("task.newName")}</div>
          </SROnly>
          <AddTaskInput
            type="text"
            placeholder={t("task.placeholder")}
            value={newTaskName}
            onChange={e => setNewTaskName(e.target.value)}
          />
        </label>
        <AddTaskButton filled type="submit">
          {t("task.newSubmit")}
        </AddTaskButton>
      </AddTaskForm>
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

const AddTaskForm = styled.form`
  position: fixed;
  bottom: 0;
  left: 0;
  background: ${color("background")};
  padding: 0.5rem;

  margin-top: 2rem;
  display: flex;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  label {
    flex: 1;
  }
  input {
    max-width: none;
  }
  ${mq("medium")} {
    position: static;
    padding: 0;
  }
`;

const AddTaskInput = styled(Input)`
  height: 3rem;
  padding: 1rem;
  border-radius: 0.5rem 0 0 0.5rem;
  border-color: ${color("grey700")};
  border-right: none;
`;

const AddTaskButton = styled(Button)`
  height: 3rem;
  border-radius: 0 0.5rem 0.5rem 0;
`;

export default ProjectView;
