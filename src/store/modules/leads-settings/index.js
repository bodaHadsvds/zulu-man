import leadsMutations from "./mutations";
import leadsActions from "./actions";
import leadsGetters from "./getters";
export default {
  namespaced: true,
  state() {
    return {
      leadsStatus: {
        data: [],
      },
      leadsSources: {
        data: [],
      },
      leadsReasons: {
        data: [],
      },
      staffMember: [],
      statusLoading: true,
      sourcesLoading: true,
      reasonsLoading: true,
      statusDataSuccess: true,
      sourcesDataSuccess: true,
      reasonsDataSuccess: true,
    };
  },
  getters: leadsGetters,
  mutations: leadsMutations,
  actions: leadsActions,
};
