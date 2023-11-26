import authMutations from "./mutations";
import authActions from "./actions";
import authGetters from "./getters";
const authcheck =
  localStorage.getItem("auth") || sessionStorage.getItem("auth") ? true : false;
const infoCheck = () => {
  if (localStorage.getItem("auth")) {
    return JSON.parse(localStorage.getItem("auth"));
  } else if (sessionStorage.getItem("auth")) {
    return JSON.parse(sessionStorage.getItem("auth"));
  } else {
    return null;
  }
};

export default {
  namespaced: true,
  state() {
    return {
      remember: sessionStorage.getItem("auth") ? true : false,
      isAuthenticated: authcheck,
      authInfo: infoCheck(),
    };
  },
  getters: authGetters,
  mutations: authMutations,
  actions: authActions,
};
