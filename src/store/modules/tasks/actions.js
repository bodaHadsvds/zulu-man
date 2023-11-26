import axios from "axios";
export default {
  async fetchTasks({ commit, state }) {
    const dataArr = [];
    state.loading = true;
    await axios
      .get("tasks")
      .then((response) => {
        for (const item of response.data.data) {
          const date = new Date(item.date);
          const startAt = `${date.getDate()} ${date.toLocaleString("default", {
            month: "short",
          })} ${date.getFullYear()}`;

          const time12Hrs = function (time) {
            // Check correct time format and split into components
            time = time
              .toString()
              .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

            if (time.length > 1) {
              // If time format correct
              time = time.slice(1); // Remove full string match value
              time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
              time[0] = +time[0] % 12 || 12; // Adjust hours
            }
            return time.join(""); // return adjusted time or original string
          };
          // let staffRoles = "";
          // if (item.roles.length > 0) {
          //   staffRoles = item.roles
          //     .map((role) => {
          //       return `${role.name_en}`;
          //     })
          //     .join(", ");
          // } else {
          //   staffRoles = "No Role";
          // }
          const itemObj = {
            id: item.id,
            staff: item.staff,
            description: item.description,
            status: item.status,
            date: startAt,
            time: time12Hrs(item.time),
            type: item.type,
            user: item.user,
          };
          dataArr.push(itemObj);
        }
        commit("updateTasks", dataArr);
        state.loading = false;
      })
      .catch(() => {
        state.dataSuccess = false;
        state.loading = false;
      });
  },
};
