import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../common";
import AuthContext from "./AuthContext";
import { useLogOutMutation } from "./login.requests";

const LogOutButton = () => {
  const logOut = useLogOutMutation();
  const { user, refetchUser } = useContext(AuthContext);
  const { t } = useTranslation();

  if (!user) return null;

  return (
    <Button
      onClick={() => {
        logOut({
          update: refetchUser
        });
      }}
      data-testid="logout-button"
    >
      {t("common.logout")}
    </Button>
  );
};

export default LogOutButton;
