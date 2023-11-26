import axios from "axios";
export default {
  async fetchSessions({ commit, state }, params) {
    state.loading = true;
    if (params) {
      console.log(params);
      await axios
        .get("sessions", {
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
            const scheduleOnId = JSON.parse(item.schedule_on);
            let daysArr = [];
            state.loading = false;

            scheduleOnId.forEach(async (id) => {
              const foundDay = state.weekDays.find((d) => d.id === id);
              daysArr.push(foundDay.abbr);
            });
            const tableDays = daysArr.join(", ");
            const coachName = item.staff
              ? `${item.staff.first_name} ${item.staff.last_name}`
              : null;

            const itemObj = {
              id: item.id,
              name: item.session_type.name,
              coach: coachName,
              max_participants: item.max_participants,
              date: item.date,
              time_from: item.time_from,
              time_to: item.time_to,
              schedule_on: tableDays,
              end_at: item.end_at,
            };
            dataArr.data.push(itemObj);
          }
          console.log(dataArr);
          commit("updateSessions", dataArr);
          state.loading = false;
        })
        .catch(() => {
          state.dataSuccess = false;
          state.loading = false;
        });
    }
  },
  async fetchSessionsTypes({ commit, state }) {
    state.TypesLoading = true;
    let types = [];
    await axios
      .get(`session_types`)
      .then((response) => {
        for (const item of response.data.data) {
          types.push({ text: item.name, id: item.id });
        }
        commit("updateSessionType", types);
      })
      .finally(() => {
        state.TypesLoading = false;
      });
  },
  fetchWeekDays({ commit }) {
    const days = [
      { id: 0, abbr: "Sat", name: "Saturday" },
      { id: 1, abbr: "Sun", name: "Sunday" },
      { id: 2, abbr: "Mon", name: "Monday" },
      { id: 3, abbr: "Tue", name: "Tuesday" },
      { id: 4, abbr: "Wed", name: "ًWednesday" },
      { id: 5, abbr: "Thu", name: "Thursday" },
      { id: 6, abbr: "Fri", name: "Friday" },
    ];
    commit("updateWeekDays", days);
  },
};
