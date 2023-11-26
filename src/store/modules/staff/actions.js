import axios from "axios";
export default {
  async fetchStaff({ commit, state }, params) {
    state.loading = true;
    if (params) {
      await axios
        .get("staffs", {
          params: { per_page: params.per_page, page: params.page },
        })
        .then((response) => {
          const dataArr = {
            data: [],
            per_page: response.data.per_page,
            page: response.data.page,
            total: response.data.total,
          };
          for (const item of response.data.data) {
            const created_at = new Date(
              Date.parse(item.created_at)
            ).toLocaleDateString("en-GB");

            let staffRoles = "";

            if (item.roles.length > 0) {
              staffRoles = item.roles
                .map((role) => {
                  return `${role.name_en}`;
                })
                .join(", ");
            } else {
              staffRoles = "No Role";
            }

            const itemObj = {
              id: item.id,
              first_name: item.first_name,
              last_name: item.last_name,
              gender: item.gender,
              email: item.email,
              status: item.status,
              roles: staffRoles,
              role_id: item.role_id,
              created_at: created_at,
            };
            dataArr.data.push(itemObj);
          }
          commit("updateStaff", dataArr);
          state.loading = false;
        })
        .catch(() => {
          state.dataSuccess = false;
          state.loading = false;
        });
    }
  },
  fetchStaffMember({ commit }, memberId) {
    axios.get(`staff/show/${memberId}`).then((response) => {
      commit("updateStaffMember", response.data.data);
    });
  },
  async fetchRoles({ commit }) {
    await axios.get("roles").then((response) => {
      commit("updateRoles", response.data.data);
    });
  },
};
