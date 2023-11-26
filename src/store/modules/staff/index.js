import staffMutations from "./mutations";
import staffActions from "./actions";
import staffGetters from "./getters";
export default {
  namespaced: true,
  state() {
    return {
      staff: {
        data: [],
      },
      staffMember: [],
      roles: [],
      loading: true,
      dataSuccess: true,
    };
  },
  getters: staffGetters,
  mutations: staffMutations,
  actions: staffActions,
};
