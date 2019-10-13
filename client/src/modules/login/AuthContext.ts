import React from "react";

export type User = {
  id: string;
  name: string;
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
