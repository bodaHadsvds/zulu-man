/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import store from "./store/index";

// Plugins
import { registerPlugins } from "@/plugins";

/* fontawesome */
// import { library, dom } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { fab } from "@fortawesome/free-brands-svg-icons";
// library.add(fas, fab);
// dom.watch();

import mitt from "mitt";
const Emitter = mitt();

import axios from "axios";
import VueAxios from "vue-axios";
axios.defaults.baseURL = "https://back.zulufitness.co/api/";
// axios.defaults.baseURL = "https://vip.toyshomekw.com/api/";
if (localStorage.getItem("auth") || sessionStorage.getItem("auth")) {
  axios.defaults.headers = {
    Authorization: `Bearer ${store.getters["auth/authInfo"].token}`,
    lang: localStorage.getItem("lang"),
    Accept: "application/json",
  };
}

import "@/styles/main.scss";
const app = createApp(App);

// app.component("font-awesome-icon", FontAwesomeIcon);

registerPlugins(app);

app.use(store);
app.provide("Emitter", Emitter);
app.use(VueAxios, axios);
app.mount("#app");
