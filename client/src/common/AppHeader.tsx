import React from "react";
import { Link } from "@reach/router";
import { useMutation } from "@apollo/react-hooks";

import AuthContext from "../login/AuthContext";
import { LOGOUT_MUTATION } from "../login/loginRequests";

const LogOutButton = () => {
  const [logOut] = useMutation(LOGOUT_MUTATION);

  return (
    <AuthContext.Consumer>
      {({ user, refetchUser }) => {
        if (!user) return null;

        return (
          <button
            onClick={() => {
              logOut({
                awaitRefetchQueries: true,
                update: () => {
                  refetchUser();
                }
              });
            }}
          >
            Logout
          </button>
        );
      }}
    </AuthContext.Consumer>
  );
};

const AppHeader: React.FC = () => {
  return (
    <header
      style={{
        background: "tomato",
        color: "white",
        padding: "1rem",
        textAlign: "right"
      }}
    >
      <Link to="/settings">Settings</Link>
      <LogOutButton />
    </header>
  );
};

export default AppHeader;
