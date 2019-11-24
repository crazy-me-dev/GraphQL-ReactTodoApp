import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";

import styled, { color } from "../../config/styles";
import { Button, Input, SROnly } from "../common";
import { Task } from "./task.model";
import { Project } from "../project/project.model";
import TaskListItem from "./TaskListItem";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useReorderTasks
} from "./task.requests";

export interface TaskListProps {
  project: Project;
}

const TaskList: React.FC<TaskListProps> = ({ project }) => {
  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();
  const reorderTasksMutation = useReorderTasks();

  const [newTaskName, setNewTaskName] = useState("");
  const { t } = useTranslation();

  const addNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskName === "") return;

    createTaskMutation({
      description: newTaskName,
      done: false,
      project: project.id
    });
    setNewTaskName("");
  };

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

  const reorderTasks = (result: DropResult) => {
    if (!result.destination) return;
    const from = result.source.index;
    const to = result.destination.index;

    // move task to a correct position
    const rest = [...project.tasks];
    const movingTask = rest.splice(from, 1)[0];
    const before = [...rest].splice(0, to);
    const after = [...rest].slice(to);
    const newTasks = [...before, movingTask, ...after];

    reorderTasksMutation(project, newTasks);
  };

  return (
    <div>
      <DragDropContext onDragEnd={reorderTasks}>
        <Droppable droppableId={"tasks"}>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {project.tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {provided => (
                    <div {...provided.draggableProps} ref={provided.innerRef}>
                      <TaskListItem
                        index={index}
                        task={task}
                        onDelete={deleteTask}
                        onDoneToggle={toggleTaskDone}
                        onDescriptionChange={updateDescription}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <br />

      <AddTaskForm onSubmit={addNewTask}>
        <label>
          <SROnly>
            <div>{t("task.newName")}</div>
          </SROnly>
          <AddTaskInput
            type="text"
            placeholder={t("task.placeholder")}
            value={newTaskName}
            onChange={e => setNewTaskName(e.target.value)}
          />
        </label>
        <AddTaskButton filled type="submit">
          {t("task.newSubmit")}
        </AddTaskButton>
      </AddTaskForm>
    </div>
  );
};

const AddTaskForm = styled.form`
  margin-top: 2rem;
  display: flex;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  label {
    flex: 1;
  }
  input {
    max-width: none;
  }
`;

const AddTaskInput = styled(Input)`
  height: 3rem;
  padding: 1rem;
  border-radius: 0.5rem 0 0 0.5rem;
  border-color: ${color("grey700")};
  border-right: none;
`;

const AddTaskButton = styled(Button)`
  height: 3rem;
  border-radius: 0 0.5rem 0.5rem 0;
`;

export default TaskList;
