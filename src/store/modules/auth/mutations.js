import axios from "axios";
import router from "@/router";
export default {
  updateLogin(state, payload) {
    state.authInfo = payload.resData;
    state.isAuthenticated = true;
    state.remember = payload.remember;
    if (payload.remember) {
      localStorage.setItem("remember", true);
      localStorage.setItem("auth", JSON.stringify(payload.resData));
    } else {
      localStorage.removeItem("remember");
      sessionStorage.setItem("auth", JSON.stringify(payload.resData));
    }
    axios.defaults.headers = {
      Authorization: `Bearer ${state.authInfo.token}`,
      Accept: "application/json",
    };
    router.replace({ name: "Home" });
  },
  updateLogout(state) {
    state.authInfo = null;
    state.isAuthenticated = false;
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    router.replace({ name: "Login" });
  },
  search(state,payload){
state.search = payload.resData;
state.isAuthenticated=true
axios.defaults.headers = {
  Authorization: `Bearer ${state.search.token}`,
  Accept: "application/json",
};
router.replace({name:"member/33"})
  }
  // initStorage(state) {
  //   if (localStorage.getItem("auth")) {
  //     state.isAuthenticated = true;
  //     state.authInfo = JSON.parse(localStorage.getItem("auth"));
  //   }
  // },
};
