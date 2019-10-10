import React from "react";
import styled from "@emotion/styled";

import { useDeleteProjectMutation } from "./projectRequests";

const DeleteButton = styled.button`
  background: transparent;
  transition: all 0.2s;
  border: none;
  font-size: 1.25rem;
  font-weight: 400;
  color: #ddd;
  border-radius: 50%;
  &:hover,
  &:focus {
    background: #eee;
    color: tomato;
  }
`;

interface DeleteProjectButtonProps {
  projectId: string;
}

const DeleteProjectButton: React.FC<DeleteProjectButtonProps> = props => {
  const deleteProjectMutation = useDeleteProjectMutation();

  const deleteProject = (id: string) => {
    deleteProjectMutation(id);
  };

  return (
    <DeleteButton
      onClick={() => deleteProject(props.projectId)}
      data-testid={`delete-project-${props.projectId}`}
    >
      &times;
    </DeleteButton>
  );
};

export default DeleteProjectButton;
