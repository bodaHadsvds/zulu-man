// import Cookies from "js-cookie";
import vuetify from "@/plugins/vuetify";
export default {
  toggleDrawer(state) {
    return (state.drawer = !state.drawer);
  },
  updateTheme(state, payload) {
    localStorage.setItem("theme", payload);
    state.theme = localStorage.getItem("theme");
  },
  updateLang(state, payload) {
    localStorage.setItem("lang", payload);
    vuetify.locale.current = payload;
    state.lang = localStorage.getItem("lang");
  },
};
