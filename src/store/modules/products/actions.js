import axios from "axios";

export default {
  async fetchProducts({ commit, state }, params) {
    state.loading = true;
    if (params) {
      await axios
        .get("products", {
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
            const resData = {
              id: item.id,
              name_ar: item.name_ar,
              name_en: item.name_en,
              status: item.status,
              price: item.price,
              quantity: item.quantity,
              sku: item.sku,
              available: item.available,
            };
            dataArr.data.push(resData);
          }
          commit("updateProducts", dataArr);
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
