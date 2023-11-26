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
      filterOpts: {
        staff_id: null,
        event_type: null,
        event_status: null,
      },
      session: [],
      loading: true,
      dataSuccess: true,
      sessionsTypes: [],
      sessionsTypesLoading: true,
      weekDays: [],
      bookings: {
        data: [],
      },
      bookingsLoading: true,
      bookingsDataSuccess: true,
      cancellations: {
        data: [],
      },
      cancellationsLoading: true,
      cancellationsDataSuccess: true,
    };
  },
  getters: staffGetters,
  mutations: staffMutations,
  actions: staffActions,
};
