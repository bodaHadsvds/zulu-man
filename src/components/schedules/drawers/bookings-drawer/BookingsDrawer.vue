<template>
  <v-navigation-drawer
    location="end"
    floating
    sticky
    temporary
    style="width: 60vw"
    scrollable
  >
    <v-card class="h-100 d-flex flex-column rounded-0" v-if="info">
      <v-card-title class="pa-0">
        <v-toolbar color="transparent" class="" title="formTitle">
          <v-btn
            variant="text"
            icon="fa-solid fa-x"
            @click="close"
            size="small"
          ></v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text class="flex-fill overflow-auto">
        <p class="mb-3" v-show="info.end_at" v-if="scheduleDays">
          <span v-for="day in scheduleDays" :key="day">{{ day }}</span> -
          {{ info.date }} - {{ info.end_at }} . {{ info.staff_name }}
        </p>
        <p class="mb-3" v-show="!info.end_at">
          {{ info.date }} . {{ info.time_from }} - {{ info.time_to }} .
          {{ info.staff_name }}
        </p>
        <bookings-tabs :scheduleId="info.id" />
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
  import BookingsTabs from "@/components/schedules/drawers/bookings-drawer/bookings-tabs/BookingsTabs.vue";
  export default {
    components: { BookingsTabs },
    props: ["scheduleInfo"],
    data: () => ({
      type: null,
      info: null,
      weekDays: null,
    }),
    computed: {
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
    },
    methods: {
      loadWeekDays() {
        this.$store.dispatch("sessions/fetchWeekDays");
      },
      close() {
        this.$emit("closeDrawer");
      },
      refresh() {
        this.$emit("refresh");
      },
    },
    watch: {
      scheduleInfo(newVal) {
        this.info = newVal;
      },
      getWeekDays(newVal) {
        this.weekDays = newVal;
      },
    },

    created() {
      this.info = this.scheduleInfo;
      this.loadWeekDays();
    },

    emits: ["closeDrawer", "refresh"],
  };
</script>
