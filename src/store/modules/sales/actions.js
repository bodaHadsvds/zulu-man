import axios from "axios";

export default {
  async fetchSales({ commit, state }, params) {
    state.loading = true;
    if (params) {
      await axios
        .get("sales", {
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
              Date.parse(item.date)
            ).toLocaleDateString("en-GB");
            const resData = {
              id: item.id,
              price: item.price,
              status: item.status,
              paid: item.paid,
              debet: item.debet,
              user_full_name: item.user_full_name,
              type: item.type,
              date: created_at,
              item_type: item.item_type,
              item_price: item.item_price,
              start_date: item.start_date,
              end_date: item.end_date,
              quantity: item.quantity,
              staff_full_name: item.staff_full_name,
              item_name: item.item_name,
            };
            dataArr.data.push(resData);
          }
          commit("updateSales", dataArr);
          // state.loading = false;
          state.loading = false;
        })
        .catch(() => {
          state.dataSuccess = false;
          state.loading = false;
        });
    }
  },
  // fetchUser({ commit }, memberId) {
  //   axios.get(`http://192.168.1.25/api/users/${memberId}`).then((response) => {
  //     // const membersData = [response];
  //     commit("updateUser", response.data.data);
  //     // rootState.loading = false;
  //   });
  // },
};
