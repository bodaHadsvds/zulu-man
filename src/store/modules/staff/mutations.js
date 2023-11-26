export default {
  updateStaff(state, members) {
    state.staff = members;
  },

  updateStaffMember(state, member) {
    state.staffMember = member;
  },

  updateRoles(state, roles) {
    state.roles = roles;
  },
};
