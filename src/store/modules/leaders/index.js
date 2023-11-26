import leadsMutations from "./mutations";
import leadsActions from "./actions";
import leadsGetters from "./getters";
export default {
  namespaced: true,
  state() {
    return {
      leaders: {
        data: [],
      },
      loading: true,
      dataSuccess: true,
    };
  },
  getters: leadsGetters,
  mutations: leadsMutations,
  actions: leadsActions,
};
