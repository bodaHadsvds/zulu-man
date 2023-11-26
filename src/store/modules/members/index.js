import membersMutations from "./mutations";
import membersActions from "./actions";
import membersGetters from "./getters";
export default {
  namespaced: true,
  state() {
    return {
      users: {
        data: [],
      },
      user: [],
      dataSuccess: true,
      loading: true,
    };
  },
  getters: membersGetters,
  mutations: membersMutations,
  actions: membersActions,
};
