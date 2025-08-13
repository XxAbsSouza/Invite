import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import infoGeneralPT from "./locales/pt/infoGeneral.json";
import infoGeneralES from "./locales/es/infoGeneral.json";
import mapPT from "./locales/pt/map.json";
import mapES from "./locales/es/map.json";
import comoChegarPT from "./locales/pt/comoChegar.json";
import comoChegarES from "./locales/es/comoChegar.json";
import dicasPT from "./locales/pt/dicas.json";
import dicasES from "./locales/es/dicas.json";
import citacoesPT from "./locales/pt/citacoes.json";
import citacoesES from "./locales/es/citacoes.json";
import countdownPT from "./locales/pt/countdown.json";
import countdownES from "./locales/es/countdown.json";
import confirmationPT from "./locales/pt/confirmation.json";
import confirmationES from "./locales/es/confirmation.json";
import footerPT from "./locales/pt/footer.json";
import footerES from "./locales/es/footer.json";
import navbarPT from "./locales/pt/navbar.json";
import navbarES from "./locales/es/navbar.json";

// Detecta o idioma do navegador
const userLang = navigator.language.startsWith("es") ? "es" : "pt";

i18n.use(initReactI18next).init({
  resources: {
    pt: {
      infoGeneral: infoGeneralPT,
      comoChegar: comoChegarPT,
      map: mapPT,
      dicas: dicasPT,
      citacoes: citacoesPT,
      countdown: countdownPT,
      confirmation: confirmationPT,
      footer: footerPT,
      navbar: navbarPT,
    },
    es: {
      infoGeneral: infoGeneralES,
      comoChegar: comoChegarES,
      map: mapES,
      dicas: dicasES,
      citacoes: citacoesES,
      countdown: countdownES,
      confirmation: confirmationES,
      footer: footerES,
      navbar: navbarES,
    },
  },
  lng: userLang, // <-- aqui é o que muda
  fallbackLng: "pt", // caso não tenha a tradução
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  debug: false,
});

export default i18n;
