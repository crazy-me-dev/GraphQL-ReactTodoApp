import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useCreateProjectMutation } from "./project.requests";
import { Title, Button, Input } from "../common";
import styled from "../../config/styles";

interface Props {
  onSubmit?: () => void;
}

const CreateProjectForm: React.FC<Props> = ({ onSubmit }) => {
  const [newProjectName, updateNewProjectName] = useState("");
  const createProjectMutation = useCreateProjectMutation();
  const { t } = useTranslation();

  let history = useHistory();

  const createNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    createProjectMutation(newProjectName).then(result => {
      if (!result.data) return;
      const project = result.data.createProject;
      history.push(`/project/${project.id}`);
    });
    updateNewProjectName("");
    onSubmit && onSubmit();
  };

  return (
    <Form onSubmit={createNewProject}>
      <Title.H2>{t("project.newModal.title")}</Title.H2>

      <Input
        data-testid="new-project-input"
        type="text"
        value={newProjectName}
        placeholder={t("project.newModal.placeholder")}
        autoFocus
        onChange={e => updateNewProjectName(e.target.value)}
      />

      <Actions>
        <Button
          disabled={newProjectName === ""}
          data-testid="new-project-submit"
          filled
          type="submit"
        >
          {t("project.newModal.submit")}
        </Button>
        <Button>{t("common.cancel")}</Button>
      </Actions>
    </Form>
  );
};

const Form = styled.form`
  text-align: center;
`;

const Actions = styled.div`
  margin-top: 1rem;
  button {
    margin: 0 0.5rem;
  }
`;

export default CreateProjectForm;
