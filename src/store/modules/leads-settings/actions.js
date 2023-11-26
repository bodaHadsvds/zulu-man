import axios from "axios";
export default {
  async fetchLeads({ commit, state }, params) {
    function changeLoading(status) {
      if (params.type === "status") {
        state.statusLoading = status;
      } else if (params.type === "source") {
        state.sourcesLoading = status;
      } else {
        state.reasonsLoading = status;
      }
    }
    function changeSuccess(status) {
      if (params.type === "status") {
        state.statusDataSuccess = status;
      } else if (params.type === "source") {
        state.sourcesDataSuccess = status;
      } else {
        state.reasonsDataSuccess = status;
      }
    }
    changeLoading(true);
    if (params) {
      await axios
        .get(`lead_settings/${params.type}`, {
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
            };
            dataArr.data.push(itemObj);
          }
          if (params.type === "status") {
            commit("updateLeadsStatus", dataArr);
          } else if (params.type === "source") {
            commit("updateLeadsSources", dataArr);
          } else {
            commit("updateLeadsReasons", dataArr);
          }
          changeLoading(false);
        })
        .catch(() => {
          changeSuccess(false);
          changeLoading(false);
        });
    }
  },
};
