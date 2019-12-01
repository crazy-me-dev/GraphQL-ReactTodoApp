import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import { Task } from "./task.model";
import { optimisticallyUpdateProjectsQuery } from "../project/project.requests";
import { Project } from "../project/project.model";
import { PROJECTS_QUERY } from "../project/project.requests";

const CREATE_TASK_MUTATION = gql`
  mutation create_task($data: TaskInput!) {
    createTask(data: $data) {
      id
      description
      done
      order_number
    }
  }
`;

const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($id: ID!, $data: TaskUpdateInput!) {
    updateTask(id: $id, data: $data) {
      id
      description
      done
      order_number
    }
  }
`;

const REORDER_TASKS_MUTATION = gql`
  mutation reorderTasks($project: ID!, $taskMap: [ID]!) {
    reorderTasks(project: $project, taskMap: $taskMap) {
      id
    }
  }
`;

type UseTaskCreateMutationVariables = {
  description: string;
  done: boolean;
  project: string;
};

const useCreateTaskMutation = () => {
  const [createTaskMutation] = useMutation(CREATE_TASK_MUTATION);
  return (data: UseTaskCreateMutationVariables) =>
    createTaskMutation({
      variables: {
        data
      },
      refetchQueries: [{ query: PROJECTS_QUERY }],
      optimisticResponse: {
        __typename: "Mutation",
        createTask: {
          __typename: "task",
          id: "optimistic",
          description: data.description,
          order_number: 1000,
          done: false
        }
      },
      update: (proxy, { data: proxyData }) => {
        const task: Task = proxyData.createTask;
        optimisticallyUpdateProjectsQuery((projects: Project[]) => {
          return projects.map(project => {
            if (project.id === data.project) {
              project.tasks = [...project.tasks, task];
            }
            return project;
          });
        }, proxy);
      }
    });
};

type UseTaskUpdateMutationVariables = {
  done: boolean;
  description: string;
};

const useUpdateTaskMutation = () => {
  const [updateTaskMutation] = useMutation(UPDATE_TASK_MUTATION);
  return (id: string, data: UseTaskUpdateMutationVariables) => {
    const optimisticResponse = {
      __typename: "Mutation",
      updateTask: {
        __typename: "Task",
        id,
        description: data.description,
        done: data.done
      }
    };

    return updateTaskMutation({
      variables: {
        id,
        data
      },
      refetchQueries: [{ query: PROJECTS_QUERY }],
      optimisticResponse,
      update: (proxy, mutationResult) => {
        const task: Task = mutationResult.data.updateTask;
        optimisticallyUpdateProjectsQuery((projects: Project[]) => {
          return projects.map(project => {
            project.tasks = project.tasks.map(t => {
              return t.id === task.id ? task : t;
            });
            return project;
          });
        }, proxy);
      }
    });
  };
};

const useDeleteTaskMutation = () => {
  const [deleteTaskMutation] = useMutation(DELETE_TASK_MUTATION);
  return (id: string) => {
    const optimisticResponse = {
      __typename: "Mutation",
      deleteTask: {
        __typename: "Task",
        id
      }
    };

    return deleteTaskMutation({
      variables: { id },
      refetchQueries: [{ query: PROJECTS_QUERY }],
      optimisticResponse,
      update: (proxy, mutationResult) => {
        const task: Task = mutationResult.data.deleteTask;

        optimisticallyUpdateProjectsQuery((projects: Project[]) => {
          return projects.map(project => {
            project.tasks = project.tasks.filter(t => t.id !== task.id);
            return project;
          });
        }, proxy);
      }
    });
  };
};

const useReorderTasks = () => {
  const [reorderTasksMutation] = useMutation(REORDER_TASKS_MUTATION);

  return (project: Project, tasks: Task[]) => {
    const optimisticResponse = {
      __typename: "Mutation",
      reorderTasks: tasks.map(t => ({
        __typename: "Task",
        id: t.id
      }))
    };

    return reorderTasksMutation({
      variables: {
        project: project.id,
        taskMap: tasks.map(t => t.id)
      },
      refetchQueries: [{ query: PROJECTS_QUERY }],
      optimisticResponse,
      update: (proxy, mutationResult) => {
        optimisticallyUpdateProjectsQuery((projects: Project[]) => {
          return projects.map(p => {
            if (p.id === project.id) {
              project.tasks = tasks;
            }
            return p;
          });
        }, proxy);
      }
    });
  };
};

export {
  CREATE_TASK_MUTATION,
  DELETE_TASK_MUTATION,
  UPDATE_TASK_MUTATION,
  REORDER_TASKS_MUTATION,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useReorderTasks
};
