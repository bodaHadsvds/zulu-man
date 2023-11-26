import membershipsMutations from "./mutations";
import membershipsActions from "./actions";
import membershipsGetters from "./getters";
export default {
  namespaced: true,
  state() {
    return {
      sessions: {
        data: [],
      },
      memberships: {
        data: [],
      },
      membershipsLoading: true,
      sessionsLoading: true,
      membershipsDataSuccess: true,
      sessionsDataSuccess: true,
    };
  },
  getters: membershipsGetters,
  mutations: membershipsMutations,
  actions: membershipsActions,
};
