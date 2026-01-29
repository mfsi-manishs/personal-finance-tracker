/**
 * @file i18n.ts
 * @fileoverview This file contains the i18n configuration
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: "en", // default language
  fallbackLng: "en", // fallback if translation key is missing
  interpolation: { escapeValue: false },
});

export default i18n;
