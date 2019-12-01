import React from "react";
import { useTranslation } from "react-i18next";

import { Button, Confirm } from "../common";
import { AuthContext } from "../login";
import { useAccountDeleteMutation } from "../login/login.requests";

const DeleteAccountButton = () => {
  const { t } = useTranslation();
  const { refetchUser } = React.useContext(AuthContext);
  const deleteAccount = useAccountDeleteMutation();

  return (
    <div>
      <Confirm
        title={t("account.delete.areYouSure")}
        confirmButtonText={t("account.delete.submit")}
        cancelButtonText={t("account.delete.cancel")}
      >
        {onConfirm => (
          <Button
            onClick={() => {
              onConfirm(() =>
                deleteAccount({
                  update: refetchUser
                })
              );
            }}
          >
            {t("account.delete.button")}
          </Button>
        )}
      </Confirm>
    </div>
  );
};

export default DeleteAccountButton;
