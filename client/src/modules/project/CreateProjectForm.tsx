import React, { useState } from "react";

import { useCreateProjectMutation } from "./project.requests";
import { Title, Button, Input } from "../common";

interface Props {
  onSubmit?: () => void;
}

const CreateProjectForm: React.FC<Props> = ({ onSubmit }) => {
  const [newProjectName, updateNewProjectName] = useState("");
  const createProjectMutation = useCreateProjectMutation();

  const createNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    createProjectMutation(newProjectName);
    updateNewProjectName("");
    onSubmit && onSubmit();
  };

  return (
    <form onSubmit={createNewProject}>
      <Title.H2>Add a new project</Title.H2>
      <label>
        Name
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
        Add
      </Button>
    </form>
  );
};
export default CreateProjectForm;
