import axios from "axios";

export default {
  async fetchMemberships({ commit, state }, params) {
    function changeLoading(status) {
      if (params.type === "membership") {
        state.membershipsLoading = status;
      } else {
        state.sessionsLoading = status;
      }
    }
    function changeSuccess(status) {
      if (params.type === "membership") {
        state.membershipsDataSuccess = status;
      } else {
        state.sessionsDataSuccess = status;
      }
    }
    changeLoading(true);
    if (params) {
      await axios
        .get("memberships", {
          params: {
            report: params.report,
            per_page: params.per_page,
            page: params.page,
            type: params.type,
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
            const timePeriod = () => {
              if (item.expired_time && item.expiration_type) {
                return `${item.expired_time} ${item.expiration_type}`;
              }
              return "No period";
            };
            const itemObj = {
              id: item.id,
              name: item.name,
              status: item.status,
              price: item.price,
              entrances: item.entrances,
              time_period: timePeriod(),
            };
            dataArr.data.push(itemObj);
            console.log(dataArr.data);

          }
          if (params.type === "membership") {
            commit("updateMemberships", dataArr);
          } else {
            commit("updateSessions", dataArr);
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
