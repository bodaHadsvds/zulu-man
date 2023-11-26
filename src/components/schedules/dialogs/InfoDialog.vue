<template>
  <v-dialog max-width="550" scrollable>
    <v-card v-if="info">
      <v-card-title class="pa-0">
        <v-toolbar color="transparent">
          <template v-slot:title>
            <h1 class="text-h6 font-weight-bold">
              {{ info.type_name }}
            </h1>
          </template>
          <div class="buttons">
            <v-btn
              variant="text"
              icon="fa-solid fa-pen"
              @click="edit(info.id)"
              size="small"
              v-show="info.status == 1"
            ></v-btn>
            <v-btn
              variant="text"
              icon="fa-solid fa-trash-can"
              @click="deleteItem(info.status == 1 ? 'cancel' : 'delete')"
              size="small"
            ></v-btn>
            <v-btn
              variant="text"
              icon="fa-solid fa-x"
              @click="close"
              size="small"
            ></v-btn>
          </div>
        </v-toolbar>
      </v-card-title>
      <v-card-text style="max-height: 70vh" class="pa-3 pt-0">
        <v-alert
          text="cancelled at 1/11/2023"
          color="error"
          class="py-0 px-3 mb-3"
          variant="tonal"
          v-show="info.status == 0"
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              class="pa-0 text-decoration-underline"
              @click="deleteItem('restore')"
              >restore</v-btn
            >
          </template>
        </v-alert>
        <p class="mb-3" v-show="info.end_at" v-if="scheduleDays">
          <span v-for="day in scheduleDays" :key="day">{{ day }}</span> -
          {{ info.date }} -
          {{ info.end_at }}
        </p>
        <p class="mb-3" v-show="!info.end_at">
          {{ info.date }} . {{ info.time_from }} - {{ info.time_to }}
        </p>
        <p>{{ info.staff_name }}</p>
        <v-divider class="my-4"></v-divider>
        <h5
          class="text-body-1 font-weight-bold mb-3"
          v-show="info.type !== 'appointment'"
        >
          Bookings
          {{ bookings.length }}/{{
            info.max_participants
              ? info.max_participants
              : $vuetify.locale.t("$vuetify.global.unknown")
          }}
          . {{ arrivedNum }} arrived
        </h5>
        <v-list :items="bookings" max-height="200px" class="mb-5" scrollable>
          <template v-slot:prepend>
            <v-avatar
              size="30"
              image="https://cdn.vuetifyjs.com/images/john.png"
            >
            </v-avatar>
          </template>
          <template v-slot:title="{ item }">
            <p class="ms-2 text-body-1">{{ item.first_name }}</p>
          </template>
          <template v-slot:append="{ item }">
            <v-btn variant="outlined" v-show="item.checked == 0">
              check in
            </v-btn>
            <v-btn
              variant="tonal"
              prepend-icon="fa-solid fa-check"
              color="success"
              v-show="item.checked == 1"
            >
              arrived
            </v-btn>
          </template>
        </v-list>
      </v-card-text>

      <v-card-actions v-show="info.type !== 'appointment'">
        <v-spacer></v-spacer>
        <v-btn
          variant="flat"
          color="primary"
          type="submit"
          @click="handleManage"
        >
          manage participants
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ["editedId"],
    data: () => ({
      itemId: null,
      info: {},
      weekDays: null,
    }),
    computed: {
      arrivedNum() {
        if (this.info) {
          const arrivedPartics = this.info.booking.filter(
            (b) => b.checked == 1
          );
          return arrivedPartics.length;
        }
        return 0;
      },
      getWeekDays() {
        return this.$store.getters["sessions/weekDays"];
      },
      scheduleDays() {
        const scheduleDays = JSON.parse(this.info.schedule_on);
        if (scheduleDays || scheduleDays.length) {
          const daysAbbrs = [];
          for (const id of scheduleDays) {
            const selectedDay = this.weekDays.find((day) => day.id == id);
            daysAbbrs.push(selectedDay.abbr);
          }
          return daysAbbrs.join(", ");
        }
        return "";
      },
      bookings() {
        return this.info.booking.filter((b) => b.status !== "cancelled");
      },
    },
    methods: {
      getInfo() {
        this.axios({
          method: "get",
          url: `session/show/${this.editedId}`,
        }).then((res) => {
          this.info = res.data.data;
        });
      },
      edit(id) {
        this.$emit("edit", id);
        // this.$nextTick(() => {
        //   this.close();
        // });
      },
      close() {
        this.$emit("close");
      },
      deleteItem(action) {
        this.$emit("delete", action);
      },
      loadWeekDays() {
        this.$store.dispatch("sessions/fetchWeekDays");
      },
      handleManage() {
        this.$emit("manage", this.info);
      },
    },
    watch: {
      editedId(newVal) {
        this.itemId = newVal;
        this.$nextTick(() => {
          this.getInfo();
        });
      },
      getWeekDays(newVal) {
        this.weekDays = newVal;
      },
    },
    created() {
      this.getInfo();
      this.loadWeekDays();
    },
    emits: ["manage"],
  };
</script>

<style lang="scss" scoped>
  :deep() {
    .v-list-item--density-default:not(.v-list-item--nav).v-list-item--one-line {
      padding-inline: 0;
      padding-top: 0;
      padding-bottom: 15px;
    }
  }
</style>
