import axios from "axios";
export default {
  async fetchBookings({ commit, state }, params) {
    function changeLoading(status) {
      if (params.type === "future") {
        state.futureLoading = status;
      } else if (params.type === "history") {
        state.historyLoading = status;
      } else {
        state.cancelledLoading = status;
      }
    }
    function changeSuccess(status) {
      if (params.type === "future") {
        state.futureDataSuccess = status;
      } else if (params.type === "history") {
        state.historysDataSuccess = status;
      } else {
        state.cancelledDataSuccess = status;
      }
    }
    changeLoading(true);
    if (params) {
      await axios
        .get(`user_booking/show/${params.user_id}/${params.type}`, {
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
            const day = new Date(item.date).toLocaleDateString("en-US", {
              weekday: "long",
            });
            let itemObj;
            if (params.type === "history") {
              itemObj = {
                id: item.id,
                date: item.date,
                day: day,
                group_name: item.group_name,
                time: item.time,
                coach: `${item.first_staff_name} ${item.last_staff_name}`,
                booked: item.booked,
                checked: item.checked,
                membership_name: item.membership_name,
                session_name: item.session_name,
              };
            } else if (params.type === "cancelled") {
              itemObj = {
                id: item.id,
                date: item.date,
                day: day,
                group_name: item.group_name,
                time: item.time,
                coach: `${item.first_staff_name} ${item.last_staff_name}`,
                booked: item.booked,
                cancellation_time: item.cancellation_time,
              };
            } else {
              itemObj = {
                id: item.id,
                date: item.date,
                day: day,
                group_name: item.group_name,
                time: item.time,
                coach: `${item.first_staff_name} ${item.last_staff_name}`,
                session_name: item.session_name,
                membership_name: item.membership_name,
              };
            }
            dataArr.data.push(itemObj);
          }
          if (params.type === "future") {
            commit("updateFutureBookings", dataArr);
          } else if (params.type === "history") {
            commit("updateHistoryBookings", dataArr);
          } else {
            commit("updateCancelledBookings", dataArr);
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
