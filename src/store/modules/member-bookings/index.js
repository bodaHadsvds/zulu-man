import bookingsMutations from "./mutations";
import bookingsActions from "./actions";
import bookingsGetters from "./getters";
export default {
  namespaced: true,
  state() {
    return {
      future: {
        data: [],
      },
      history: {
        data: [],
      },
      cancelled: {
        data: [],
      },
      futureLoading: true,
      historyLoading: true,
      cancelledLoading: true,
      futureDataSuccess: true,
      historyDataSuccess: true,
      cancelledDataSuccess: true,
    };
  },
  getters: bookingsGetters,
  mutations: bookingsMutations,
  actions: bookingsActions,
};
