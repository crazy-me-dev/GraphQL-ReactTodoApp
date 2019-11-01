import React from "react";

import { Project } from "../project/project.model";

export type User = {
  id: string;
  name: string;
  projects: Project[];
} | null;
export interface AuthContexOptions {
  user: User;
  loading: boolean;
  refetchUser: Function;
}

const AuthContext = React.createContext<AuthContexOptions>({
  user: null,
  loading: false,
  refetchUser: () => {}
});

export default AuthContext;
