import React from "react";
import { useTranslation } from "react-i18next";

import styled, { color } from "../../config/styles";
import { Confirm } from "../common";
import { useDeleteProjectMutation } from "./project.requests";

interface DeleteProjectButtonProps {
  projectId: string;
}

const DeleteProjectButton: React.FC<DeleteProjectButtonProps> = props => {
  const deleteProjectMutation = useDeleteProjectMutation();
  const { t } = useTranslation();

  const deleteProject = (id: string) => {
    deleteProjectMutation(id);
  };

  return (
    <Confirm
      title={t("project.delete.areYouSure")}
      confirmButtonText={t("project.delete.submit")}
      cancelButtonText={t("project.delete.cancel")}
    >
      {onConfirm => (
        <DeleteButton
          onClick={() => onConfirm(() => deleteProject(props.projectId))}
          data-testid={`delete-project-${props.projectId}`}
        >
          <span>&times;</span>
        </DeleteButton>
      )}
    </Confirm>
  );
};

const DeleteButton = styled.button`
  transition: all 0.2s;
  background: transparent;
  transition: all 0.2s;
  border: none;
  font-size: 2rem;
  font-weight: 400;
  color: ${color("grey700")};
  border-radius: 50%;
  line-height: 1;
  &:hover,
  &:focus {
    transform: scale(1.1);
    color: ${color("primary")};
  }
  span {
    position: relative;
    top: -0.1em;
  }
`;

export default DeleteProjectButton;
