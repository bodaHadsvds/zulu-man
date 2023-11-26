import branchesMutations from "./mutations";
import branchesActions from "./actions";
import branchesGetters from "./getters";
export default {
  namespaced: true,
  state() {
    return {
      branches: {
        data: [],
      },
      loading: true,
      dataSuccess: true,
    };
  },
  getters: branchesGetters,
  mutations: branchesMutations,
  actions: branchesActions,
};
