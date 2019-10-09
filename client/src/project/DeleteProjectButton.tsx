import React from "react";

import { useDeleteProjectMutation } from "./projectRequests";

interface DeleteProjectButtonProps {
  projectId: string;
}

const DeleteProjectButton: React.FC<DeleteProjectButtonProps> = props => {
  const deleteProjectMutation = useDeleteProjectMutation();

  const deleteProject = (id: string) => {
    deleteProjectMutation(id);
  };

  return (
    <button
      onClick={() => deleteProject(props.projectId)}
      data-testid={`delete-project-${props.projectId}`}
    >
      &times;
    </button>
  );
};

export default DeleteProjectButton;
