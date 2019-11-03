import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../common";
import { AuthContext } from "../login";
import { useAccountDeleteMutation } from "../login/login.requests";

const DeleteAccountButton = () => {
  const { t } = useTranslation();
  const { refetchUser } = React.useContext(AuthContext);
  const deleteAccount = useAccountDeleteMutation();

  return (
    <div>
      <Button
        onClick={() => {
          deleteAccount({
            update: refetchUser
          });
        }}
      >
        {t("account.deleteButton")}
      </Button>
    </div>
  );
};

export default DeleteAccountButton;
