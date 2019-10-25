import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useCreateProjectMutation } from "./project.requests";
import { Title, Button, Input } from "../common";
import { useSideMenu } from "./SideMenuProvider";

interface Props {
  onSubmit?: () => void;
}

const CreateProjectForm: React.FC<Props> = ({ onSubmit }) => {
  const [newProjectName, updateNewProjectName] = useState("");
  const createProjectMutation = useCreateProjectMutation();
  const { setSideMenuOpen } = useSideMenu();
  const { t } = useTranslation();

  let history = useHistory();

  const createNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    createProjectMutation(newProjectName).then(result => {
      if (!result.data) return;
      const project = result.data.createProject;
      history.push(`/project/${project.id}`);
      setSideMenuOpen(false);
    });
    updateNewProjectName("");
    onSubmit && onSubmit();
  };

  return (
    <form onSubmit={createNewProject}>
      <Title.H2>{t("project.newModal.title")}</Title.H2>
      <label>
        {t("project.newModal.name")}
        <br />
        <Input
          data-testid="new-project-input"
          type="text"
          value={newProjectName}
          autoFocus
          onChange={e => updateNewProjectName(e.target.value)}
        />
      </label>
      <Button data-testid="new-project-submit" filled type="submit">
        {t("project.newModal.submit")}
      </Button>
    </form>
  );
};
export default CreateProjectForm;
