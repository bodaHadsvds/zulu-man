export default {
  updateFutureBookings(state, bookings) {
    state.future = bookings;
  },
  updateHistoryBookings(state, bookings) {
    state.history = bookings;
  },
  updateCancelledBookings(state, bookings) {
    state.cancelled = bookings;
  },

  // updateStaffMember(state, member) {
  //   state.staffMember = member;
  // },

  // updateRoles(state, roles) {
  //   state.roles = roles;
  // },
};
