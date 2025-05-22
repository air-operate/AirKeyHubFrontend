import { I18n } from "i18n-js";

import en from "./en";
import de from "./de";
import { getData, storeData } from "../asyncstorage";

const i18n = new I18n({ en, de });

async function initializeLanguage() {
  try {
    const storedLanguage = await getData("language");
    if (storedLanguage) {
      i18n.defaultLocale = storedLanguage;
      i18n.locale = storedLanguage;
    } else {
      storeData("language", "en");
      i18n.defaultLocale = "en";
      i18n.locale = "en";
    }
  } catch (error) {
    i18n.defaultLocale = "en";
    i18n.locale = "en";
  }
}

initializeLanguage();

export function changeLanguage(newLocale: string) {
  i18n.locale = newLocale;
}

export function translate(key: string, dynamicText?: object) {
  return i18n.t(key, dynamicText);
}
