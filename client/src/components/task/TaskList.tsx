import React from "react";

import { DragDropList, DragDropListItem } from "../common";
import { Task } from "./task.model";
import { Project } from "../project/project.model";
import TaskListItem from "./TaskListItem";
import {
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useReorderTasks
} from "./task.requests";

export interface TaskListProps {
  project: Project;
}

const TaskList: React.FC<TaskListProps> = ({ project }) => {
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();
  const reorderTasksMutation = useReorderTasks();

  const toggleTaskDone = (task: Task) => {
    updateTaskMutation(task.id, {
      description: task.description,
      done: !task.done
    });
  };

  const deleteTask = (task: Task) => {
    deleteTaskMutation(task.id);
  };

  const updateDescription = (newDescription: string, task: Task) => {
    updateTaskMutation(task.id, {
      description: newDescription,
      done: task.done
    });
  };

  const reorderTasks = (from: number, to: number) => {
    // move task to a correct position
    const rest = [...project.tasks];
    const movingTask = rest.splice(from, 1)[0];
    const before = [...rest].splice(0, to);
    const after = [...rest].slice(to);
    const newTasks = [...before, movingTask, ...after];

    reorderTasksMutation(project, newTasks);
  };

  return (
    <DragDropList onReorder={reorderTasks}>
      {project.tasks.map((task, index) => (
        <DragDropListItem key={task.id} itemId={task.id} index={index}>
          {provided => (
            <TaskListItem
              index={index}
              task={task}
              onDelete={deleteTask}
              onDoneToggle={toggleTaskDone}
              onDescriptionChange={updateDescription}
              dragHandleProps={provided.dragHandleProps}
            />
          )}
        </DragDropListItem>
      ))}
    </DragDropList>
  );
};

export default TaskList;
