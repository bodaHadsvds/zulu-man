export default {
  updateLeadsStatus(state, leads) {
    state.leadsStatus = leads;
  },
  updateLeadsSources(state, leads) {
    state.leadsSources = leads;
  },
  updateLeadsReasons(state, leads) {
    state.leadsReasons = leads;
  },

  // updateStaffMember(state, member) {
  //   state.staffMember = member;
  // },

  // updateRoles(state, roles) {
  //   state.roles = roles;
  // },
};
