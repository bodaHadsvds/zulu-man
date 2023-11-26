import salesMutations from "./mutations";
import salesActions from "./actions";
import salesGetters from "./getters";
export default {
  namespaced: true,
  state() {
    return {
      sales: {
        data: [],
      },
      // product: [],
      loading: true,
      dataSuccess: true,
    };
  },
  getters: salesGetters,
  mutations: salesMutations,
  actions: salesActions,
};
