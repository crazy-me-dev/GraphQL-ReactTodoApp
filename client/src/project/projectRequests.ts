import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

export const PROJECTS_QUERY = gql`
  {
    projects {
      id
      name
      tasks {
        id
        description
        done
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject($name: String!) {
    createProject(name: $name) {
      id
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export const useProjectsQuery = () => {
  return useQuery(PROJECTS_QUERY);
};

export const useCreateProjectMutation = () => {
  const [createProject] = useMutation(CREATE_PROJECT);

  return (name: string) =>
    createProject({
      variables: { name },
      refetchQueries: [{ query: PROJECTS_QUERY }]
    });
};

export const useDeleteProjectMutation = () => {
  const [deleteProjectMutation] = useMutation(DELETE_PROJECT);
  return (id: string) =>
    deleteProjectMutation({
      variables: { id },
      refetchQueries: [{ query: PROJECTS_QUERY }]
    });
};
