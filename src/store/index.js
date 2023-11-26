import { createStore } from "vuex";
import authModule from "./modules/auth/index";
import statisticsModule from "./modules/statistics/index";
import membersModule from "./modules/members/index";
import memberBookingsModule from "./modules/member-bookings/index";
import staffModule from "./modules/staff/index";
import productsModule from "./modules/products/index";
import salesModule from "./modules/sales/index";
import sessionsModule from "./modules/sessions/index";
import tasksModule from "./modules/tasks/index";
import leadersModule from "./modules/leaders/index";
import leadsSettingsModule from "./modules/leads-settings/index";
import membershipsModule from "./modules/memberships/index";
import reportsModule from "./modules/reports/index";
import branchesModule from "./modules/branches/index";
import rootMutations from "./mutations";
import rootActions from "./actions";
import rootGetters from "./getters";
// import Cookies from "js-cookie";

// const themeCheck = localStorage.getItem("theme")
//   ? localStorage.getItem("theme")
//   : "lightTheme";

const store = createStore({
  modules: {
    auth: authModule,
    statistics: statisticsModule,
    members: membersModule,
    memberBookings: memberBookingsModule,
    staff: staffModule,
    products: productsModule,
    sales: salesModule,
    sessions: sessionsModule,
    tasks: tasksModule,
    memberships: membershipsModule,
    leaders: leadersModule,
    leadsSettings: leadsSettingsModule,
    reports: reportsModule,
    branches: branchesModule,
  },
  state() {
    return {
      drawer: null,
      theme: localStorage.getItem("theme") || "lightTheme",
      lang: localStorage.getItem("lang") || "ar",
    };
  },
  getters: rootGetters,
  mutations: rootMutations,
  actions: rootActions,
});

export default store;
