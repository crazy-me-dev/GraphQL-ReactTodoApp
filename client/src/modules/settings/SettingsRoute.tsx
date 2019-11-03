import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AppHeader, Container } from "../common";
import ThemePicker from "./ThemePicker";
import LanguagePicker from "./LanguagePicker";
import DeleteAccountButton from "./DeleteAccountButton";

const SettingsRoute: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <AppHeader>
        <Link to="/">{t("common.back")}</Link>
      </AppHeader>
      <Container>
        <h1>{t("settings.title")}</h1>
        <h2>{t("settings.theme")}</h2>
        <ThemePicker />

        <h2>{t("settings.language")}</h2>
        <LanguagePicker />

        <h2>{t("settings.deleteAccount")}</h2>
        <DeleteAccountButton />
      </Container>
    </>
  );
};

export default SettingsRoute;
