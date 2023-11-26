export default {
  updateSessions(state, sessions) {
    state.sessions = sessions;
  },

  updateFilterOpts(state, opts) {
    state.filterOpts = opts;
  },

  updateBookings(state, bookings) {
    state.bookings = bookings;
  },

  updateCancellations(state, cancellations) {
    state.cancellations = cancellations;
  },

  updateSessionType(state, sessionsTypes) {
    state.sessionsTypes = sessionsTypes;
  },
  updateWeekDays(state, days) {
    state.weekDays = days;
  },
};
