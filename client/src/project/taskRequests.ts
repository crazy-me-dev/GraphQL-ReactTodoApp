import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import { PROJECTS_QUERY } from "./projectRequests";

export const CREATE_TASK_MUTATION = gql`
  mutation create_task($data: TaskInput!) {
    createTask(data: $data) {
      id
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($id: ID!, $data: TaskUpdateInput!) {
    updateTask(id: $id, data: $data) {
      id
    }
  }
`;

type UseTaskCreateMutationVariables = {
  description: string;
  done: boolean;
  project: string;
};

export const useCreateTaskMutation = () => {
  const [createTaskMutation] = useMutation(CREATE_TASK_MUTATION);
  return (data: UseTaskCreateMutationVariables) =>
    createTaskMutation({
      variables: {
        data
      },
      refetchQueries: [{ query: PROJECTS_QUERY }]
    });
};

type UseTaskUpdateMutationVariables = {
  done?: boolean;
  description?: string;
};
export const useUpdateTaskMutation = () => {
  const [updateTaskMutation] = useMutation(UPDATE_TASK_MUTATION);
  return (id: string, data: UseTaskUpdateMutationVariables) =>
    updateTaskMutation({
      variables: {
        id,
        data
      },
      refetchQueries: [{ query: PROJECTS_QUERY }]
    });
};

export const useDeleteTaskMutation = () => {
  const [deleteTaskMutation] = useMutation(DELETE_TASK_MUTATION);
  return (id: string) =>
    deleteTaskMutation({
      variables: { id },
      refetchQueries: [{ query: PROJECTS_QUERY }]
    });
};
