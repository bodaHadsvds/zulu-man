import axios from "axios";
export default {
  async fetchSessions({ commit, state }, params) {
    state.loading = true;
    if (params) {
      await axios
        .get("sessions", {
          params: {
            staff_id: params.filterOpts.staff_id,
            event_type: params.filterOpts.event_type,
            event_status: params.filterOpts.event_status,
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
            const scheduleOnId = JSON.parse(item.schedule_on);
            // let daysArr = [];
            state.loading = false;

            // scheduleOnId.forEach(async (id) => {
            //   const foundDay = state.weekDays.find((d) => d.id === id);
            //   daysArr.push(foundDay.abbr);
            // });
            // const tableDays = daysArr.join(", ");
            const coachName = item.staff
              ? `${item.staff.first_name} ${item.staff.last_name}`
              : null;

            const className = item.status == 0 ? "cancelled-schedule" : "";

            const itemObj = {
              id: item.id,
              name: item.session_type.name,
              coach: coachName,
              max_participants: item.max_participants,
              date: item.date,
              time_from: item.time_from,
              time_to: item.time_to,
              schedule_on: scheduleOnId,
              end_at: item.end_at,
              color: item.session_type.color,
              className: className,
              status: item.status,
            };
            dataArr.data.push(itemObj);
          }
          commit("updateSessions", dataArr);
          state.loading = false;
        })
        .catch(() => {
          state.dataSuccess = false;
          state.loading = false;
        });
    }
  },
  async fetchFutureSessions({ commit, state }, params) {
    state.loading = true;
    if (params) {
      await axios
        .get("future-sessions", {
          params: {
            staff_id: params.filterOpts.staff_id,
            event_type: params.filterOpts.event_type,
            event_status: params.filterOpts.event_status,
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
            const scheduleOnId = JSON.parse(item.schedule_on);
            // let daysArr = [];
            state.loading = false;

            // scheduleOnId.forEach(async (id) => {
            //   const foundDay = state.weekDays.find((d) => d.id === id);
            //   daysArr.push(foundDay.abbr);
            // });
            // const tableDays = daysArr.join(", ");
            const coachName = item.staff
              ? `${item.staff.first_name} ${item.staff.last_name}`
              : null;

            const className = item.status == 0 ? "cancelled-schedule" : "";

            const itemObj = {
              id: item.id,
              name: item.session_type.name,
              coach: coachName,
              max_participants: item.max_participants,
              date: item.date,
              time_from: item.time_from,
              time_to: item.time_to,
              schedule_on: scheduleOnId,
              end_at: item.end_at,
              color: item.session_type.color,
              className: className,
              status: item.status,
            };
            dataArr.data.push(itemObj);
          }
          commit("updateSessions", dataArr);
          state.loading = false;
        })
        .catch(() => {
          state.dataSuccess = false;
          state.loading = false;
        });
    }
  },
  async fetchSessionsTypes({ commit, state }, params) {
    state.TypesLoading = true;
    let types = [];
    await axios
      .get(`session_type/show/${params.type}`)
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

  async fetchBookings({ commit, state }, params) {
    state.bookingsLoading = true;

    await axios({
      url: "user_booking/show_bookings",
      method: "POST",
      params: {
        per_page: params.per_page,
        page: params.page,
      },
      data: {
        status: params.status,
        session_id: params.id,
      },
    })
      .then((res) => {
        let bookings = {
          data: [],
          per_page: res.data.per_page,
          page: res.data.page,
          total: res.data.total,
        };
        for (const item of res.data.data) {
          const booking_time = `${item.date} ${item.time}`;
          bookings.data.push({
            id: item.id,
            name: item.first_name,
            booking_time: booking_time,
            membership: item.membership_name,
            status: item.checked,
          });
        }
        commit("updateBookings", bookings);
        state.bookingsLoading = false;
      })
      .catch(() => {
        state.bookingsLoading = false;
        state.bookingsDataSuccess = false;
      });
  },
  async fetchCancellations({ commit, state }, params) {
    state.cancellationsLoading = true;

    await axios({
      url: "user_booking/show_bookings",
      method: "POST",
      params: {
        per_page: params.per_page,
        page: params.page,
      },
      data: {
        status: params.status,
        session_id: params.id,
      },
    })
      .then((res) => {
        let cancellations = {
          data: [],
          per_page: res.data.per_page,
          page: res.data.page,
          total: res.data.total,
        };
        for (const item of res.data.data) {
          const booking_time = `${item.date} ${item.time}`;
          cancellations.data.push({
            id: item.id,
            name: item.first_name,
            booking_time: booking_time,
            cancellation_time: item.cancellation_time,
            cancelled_by: item.cancelled_by,
            membership: item.membership_name,
          });
        }
        commit("updateCancellations", cancellations);
        state.cancellationsLoading = false;
      })
      .catch(() => {
        state.cancellationsLoading = false;
        state.cancellationsDataSuccess = false;
      });
  },
  fetchWeekDays({ commit }) {
    const days = [
      { id: 0, abbr: "Sun", name: "Sunday" },
      { id: 1, abbr: "Mon", name: "Monday" },
      { id: 2, abbr: "Tue", name: "Tuesday" },
      { id: 3, abbr: "Wed", name: "ًWednesday" },
      { id: 4, abbr: "Thu", name: "Thursday" },
      { id: 5, abbr: "Fri", name: "Friday" },
      { id: 6, abbr: "Sat", name: "Saturday" },
    ];
    commit("updateWeekDays", days);
  },
};
