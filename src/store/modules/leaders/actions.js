import axios from "axios";
export default {
  async fetchLeaders({ commit, state }, params) {
    state.loading = true;
    if (params) {
      await axios
        .get(`leads`, {
          params: {
            report: params.report,
            per_page: params.per_page,
            page: params.page,
          },
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
            const updated_at = new Date(
              Date.parse(item.updated_at)
            ).toLocaleDateString("en-GB");
            const itemObj = {
              id: item.id,
              name: item.full_name,
              gender: item.gender,
              phone: item.phone,
              status: item.status.name,
              source: item.source.name,
              assignee: item.staff.name,
              created_at: created_at,
              updated_at: updated_at,
            };
            dataArr.data.push(itemObj);
          }

          commit("updateLeaders", dataArr);
          state.loading = false;
        })
        .catch(() => {
          state.dataSuccess = false;
          state.loading = false;
        });
    }
  },
};
