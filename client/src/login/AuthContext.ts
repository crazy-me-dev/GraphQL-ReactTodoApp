import React from "react";

interface AuthContexOptions {
  user: Object | null;
  loading: boolean;
  refetchUser: Function;
}

const AuthContext = React.createContext<AuthContexOptions>({
  user: {},
  loading: false,
  refetchUser: () => {}
});

export default AuthContext;
