import statsMutations from "./mutations";
import statsActions from "./actions";
import statsGetters from "./getters";
export default {
  namespaced: true,
  state() {
    return {
      statistics: null,
      loading: true,
      dataSuccess: true,
    };
  },
  getters: statsGetters,
  mutations: statsMutations,
  actions: statsActions,
};
