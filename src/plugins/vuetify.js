/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import { mdi } from 'vuetify/iconsets/mdi'

import "vuetify/styles";
import ar from "@/locales/Ar";
import en from "@/locales/En";
// import { ar, en } from "vuetify/lib/locale/index.mjs";
// import Store from "@/store";

// Your own translation file

// Composables
import { createVuetify } from "vuetify";
import "@fortawesome/fontawesome-free/css/all.css";
import { aliases, fa } from "vuetify/iconsets/fa";
// import { mdi } from "vuetify/iconsets/mdi";

const lightTheme = {
  dark: false,
  colors: {
    primary: "#1936f7",
    secondary: "#5CBBF6",
    background: "#F9F9F9",
    surface: "#FFFFFF",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    "grey-lighten-5": "#fafafa",
  },
};
const darkTheme = {
  dark: true,
  colors: {
    primary: "#2277f7",
    secondary: "#5CBBF6",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    "grey-lighten-5": "#1c1c1c",
  },
};
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: localStorage.getItem("theme") || "lightTheme",
    themes: {
      lightTheme,
      darkTheme,
    },
  },
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa
      ,
    },
  },
  locale: {
    locale: localStorage.getItem("lang") || "ar",
    // fallback: localStorage.getItem("lang") === "Ar" ? "ar" : "en",
    messages: { ar, en },
    rtl: {
      ar: true,
    },
  },
});
