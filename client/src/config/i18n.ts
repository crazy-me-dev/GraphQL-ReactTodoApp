import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import XHR from "i18next-xhr-backend";

const currentLocale = localStorage.getItem("locale") || "en";

i18n
  .use(XHR)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    },
    lng: currentLocale,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false
    }
  });

i18n.on("languageChanged", lang => {
  localStorage.setItem("locale", lang);
});

export default i18n;
