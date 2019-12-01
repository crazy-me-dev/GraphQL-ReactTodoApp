import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { DataProxy } from "apollo-cache";

import { Project } from "./project.model";

const PROJECTS_QUERY = gql`
  {
    projects {
      id
      name
      tasks {
        id
        description
        done
        order_number
      }
    }
  }
`;

const CREATE_PROJECT = gql`
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

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const useProjectsQuery = () => {
  return useQuery(PROJECTS_QUERY);
};

const useCreateProjectMutation = () => {
  const [createProject] = useMutation<{
    __typename: string;
    createProject: Project & { __typename: string };
  }>(CREATE_PROJECT);

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
          order_number: 0,
          tasks: []
        }
      },
      update: (proxy, mutationResult) => {
        if (!mutationResult.data) return;
        const project: Project = mutationResult.data.createProject;
        optimisticallyUpdateProjectsQuery(projects => {
          return [...projects, project];
        }, proxy);
      }
    });
};

const useDeleteProjectMutation = () => {
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

function optimisticallyUpdateProjectsQuery(
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

export {
  PROJECTS_QUERY,
  CREATE_PROJECT,
  DELETE_PROJECT,
  useProjectsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  optimisticallyUpdateProjectsQuery
};
