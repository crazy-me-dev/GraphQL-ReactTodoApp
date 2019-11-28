import React from "react";

import { User } from "./user.model";

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
