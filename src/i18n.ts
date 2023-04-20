import { createI18n } from "vue-i18n";

import en from "./i18n/en.json";
import fr from "./i18n/fr.json";
import nl from "./i18n/nl.json";

const userAgentLocale = window.navigator.language.substring(0, 2);
const savedLocale = window.localStorage.getItem("locale");
const locale = savedLocale || userAgentLocale || "nl";

export default createI18n({
    legacy: false,
    locale,
    fallbackLocale: "nl",
    messages: { nl, en, fr },
    globalInjection: true,
});
