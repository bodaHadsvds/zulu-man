import axios from "axios";
export default {
  async fetchBranches({ commit, state }, params) {
    state.loading = true;
    if (params) {
      await axios
        .get(`branches`, {
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
            const itemObj = {
              id: item.id,
              name: item.name,
              location: item.location,
              phone: item.phone,
            };
            dataArr.data.push(itemObj);
          }

          commit("updateBranches", dataArr);
          state.loading = false;
        })
        .catch(() => {
          state.dataSuccess = false;
          state.loading = false;
        });
    }
  },
};
