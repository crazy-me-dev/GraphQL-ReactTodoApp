import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../common";
import styled from "../../config/styles";

const languages = ["en", "fi"];

const LanguagePicker: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {languages.map(lang => (
        <LanguageSelectButton
          key={lang}
          filled={i18n.language === lang}
          onClick={() => i18n.changeLanguage(lang)}
        >
          {t(`settings.languageSelect.${lang}`)}
        </LanguageSelectButton>
      ))}
    </>
  );
};

const LanguageSelectButton = styled(Button)`
  margin-right: 1rem;
`;

export default LanguagePicker;
