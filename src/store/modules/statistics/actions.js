import axios from "axios";
export default {
  async fetchStatistics({ commit, state }) {
    state.loading = true;
    await axios
      .get(`statistics`)
      .then((response) => {
        const items = response.data.data;

        commit("updateStatistics", items);
        state.loading = false;
      })
      .catch(() => {
        state.dataSuccess = false;
        state.loading = false;
      });
  },
};
