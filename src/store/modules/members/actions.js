import axios from "axios";

export default {
  async fetchUsers({ commit, state }, params) {
    state.loading = true;
    if (params) {
      await axios
        .get(`users`, {
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
          
          const today = new Date();
          const dates = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          console.log(dates);
          for (const item of response.data.data) {
            const created_at = new Date(
              Date.parse(item.created_at)
            ).toLocaleDateString("en-GB");
            let activeMemberships = "";
            let futureMemberships = "";
            if (item.usermembership.length > 0) {
                activeMemberships = item.usermembership
                .map((usermember) => {
                  if(usermember.start <= dates && usermember.end >= dates){
                    return `${usermember.name}`;
                  }
                })
                .join(", ");
                futureMemberships = item.usermembership
                .map((futuremember) => {
                  if(futuremember.start > dates){
                    return `${futuremember.name}`;
                  }
                  
                })
                .join(", ");
            } else {
              futureMemberships = "No Future Plan";
              activeMemberships = "No Active Plan";
            }

            const itemObj = {
              id: item.id,
              full_name: item.full_name,
              gender: item.gender,
              age: item.age,
              phone: item.phone,
              street: item.street,
              injuery: item.injuery,
              memberships: activeMemberships,
              futureshipfs: futureMemberships,
              created_at: created_at,
            };
            dataArr.data.push(itemObj);
          }
          commit("updateUsers", dataArr);
          state.loading = false;
        })
        .catch(() => {
          state.dataSuccess = false;
          state.loading = false;
        });
    }
  },
  async fetchUser({ commit }, memberId) {
    await axios.get(`users/${memberId}`).then((response) => {
      commit("updateUser", response.data.data);
    });
  },
};
