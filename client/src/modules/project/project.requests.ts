import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { DataProxy } from "apollo-cache";

import { Project } from "./project.model";

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
      name
      tasks {
        id
      }
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
      refetchQueries: [{ query: PROJECTS_QUERY }],
      optimisticResponse: {
        __typename: "Mutation",
        createProject: {
          __typename: "Project",
          id: "optimistic",
          name,
          tasks: []
        }
      },
      update: (proxy, mutationResult) => {
        const project: Project = mutationResult.data.createProject;
        optimisticallyUpdateProjectsQuery(projects => {
          return [...projects, project];
        }, proxy);
      }
    });
};

export const useDeleteProjectMutation = () => {
  const [deleteProjectMutation] = useMutation(DELETE_PROJECT);
  return (id: string) =>
    deleteProjectMutation({
      variables: { id },
      refetchQueries: [{ query: PROJECTS_QUERY }],
      optimisticResponse: {
        __typename: "Mutation",
        deleteProject: {
          __typename: "Project",
          id
        }
      },
      update: (proxy, mutationResult) => {
        const project: Project = mutationResult.data.deleteProject;
        optimisticallyUpdateProjectsQuery(projects => {
          return projects.filter(p => p.id !== project.id);
        }, proxy);
      }
    });
};

export type OptimisticProjectQueryUpdater = (projects: Project[]) => Project[];

export function optimisticallyUpdateProjectsQuery(
  projectUpdater: OptimisticProjectQueryUpdater,
  proxy: DataProxy
) {
  const queryData = proxy.readQuery<{ projects: Project[] }>({
    query: PROJECTS_QUERY
  });

  if (!queryData) return;

  proxy.writeQuery({
    query: PROJECTS_QUERY,
    data: {
      ...queryData,
      projects: projectUpdater(queryData.projects)
    }
  });
}
