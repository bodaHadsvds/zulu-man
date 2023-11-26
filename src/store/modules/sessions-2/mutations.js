export default {
  updateSessions(state, sessions) {
    state.sessions = sessions;
  },

  updateSessionType(state, sessionsTypes) {
    state.sessionsTypes = sessionsTypes;
  },
  updateWeekDays(state, days) {
    state.weekDays = days;
  },
};
