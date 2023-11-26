import staffMutations from "./mutations";
import staffActions from "./actions";
import staffGetters from "./getters";
export default {
  namespaced: true,
  state() {
    return {
      sessions: {
        data: [],
      },
      session: [],
      loading: true,
      dataSuccess: true,
      sessionsTypes: [],
      sessionsTypesLoading: true,
      weekDays: [],
    };
  },
  getters: staffGetters,
  mutations: staffMutations,
  actions: staffActions,
};
