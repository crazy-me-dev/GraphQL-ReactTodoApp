import { Task } from "../task/task.model";

export type Project = {
  id: string;
  name: string;
  tasks: Task[];
};
