import { useContext } from "react";

import AuthContext from "./AuthContext";
import { useLogOutMutation } from "./login.requests";

const useLogout = () => {
  const logOut = useLogOutMutation();
  const { refetchUser } = useContext(AuthContext);

  return {
    logOut: () => {
      logOut({
        update: refetchUser
      });
    }
  };
};

export default useLogout;
