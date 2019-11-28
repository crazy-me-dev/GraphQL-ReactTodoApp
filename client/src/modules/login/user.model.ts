import { Project } from "../project/project.model";

export type User = {
  id: string;
  name: string;
  projects: Project[];
} | null;
