<template>
  <v-toolbar class="bg-background px-0 py-4 pt-0">
    <v-row>
      <v-col cols="6" class="d-flex align-center justify-start">
        <h2>
          {{ $vuetify.locale.t("$vuetify.nav_drawer.schedule.plural") }}
        </h2>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-end">
        <div class="d-flex align-stretch flex-wrap" style="gap: 10px">
            <schedules-filter @filter="filterSchedules" />
    <v-btn color="primary" variant="flat" @click="drawer = !drawer">
      {{ $vuetify.locale.t("$vuetify.global.add") }}
    </v-btn>
        </div>
        
        
      </v-col>
    </v-row>
  </v-toolbar>
  <schedules-drawer
    v-model="drawer"
    class="mainDrawer"
    @close-drawer="closeDrawer"
    :editedId="editItemId"
    :editedIdx="editedIndex"
    :editedItm="editedItem"
    :scheduleType="scheduleType"
    @handle-type="handleScheduleType"
    @refresh="loadSessions"
  />

  <bookings-drawer
    v-model="bookingsDrawer"
    :schedule-info="scheduleInfo"
    @close-drawer="closeBookingsDrawer"
    @refresh="loadSessions"
  />

  <info-dialog
    v-model="infoDialog"
    :editedId="editItemId"
    @edit="(id) => editItem(id)"
    @close="infoDialog = false"
    @delete="deleteSession"
    @manage="openBookings"
  />

  <delete-dialog
    v-model="dialogDelete"
    @close="closeDelete"
    :action="deleteAction"
    :editedId="editItemId"
    :close-event="closeEvent"
  />

  <FullCalendar ref="fullcalendar" :options="calendarOptions" />
</template>

<script>
  import { defineAsyncComponent } from "vue";
  import ThePageHead from "@/layouts/default/ThePageHead.vue";
  const SchedulesDrawer = defineAsyncComponent(() =>
    import(
      "@/components/schedules/drawers/schedules-drawer/SchedulesDrawer.vue"
    )
  );
  const BookingsDrawer = defineAsyncComponent(() =>
    import("@/components/schedules/drawers/bookings-drawer/BookingsDrawer.vue")
  );
  const InfoDialog = defineAsyncComponent(() =>
    import("@/components/schedules/dialogs/InfoDialog.vue")
  );
  const DeleteDialog = defineAsyncComponent(() =>
    import("@/components/schedules/dialogs/DeleteDialog.vue")
  );
  const SchedulesFilter = defineAsyncComponent(() =>
    import("@/components/schedules/filters/SchedulesFilter.vue")
  );
  import FullCalendar from "@fullcalendar/vue3";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import timeGridPLugin from "@fullcalendar/timegrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import allLocales from "@fullcalendar/core/locales-all";
  export default {
    components: {
      ThePageHead,
      SchedulesDrawer,
      BookingsDrawer,
      FullCalendar,
      InfoDialog,
      DeleteDialog,
      SchedulesFilter,
    },
    data: () => ({
      title: 'aaa',
      drawer: false,
      bookingsDrawer: false,
      infoDialog: false,
      dialogDelete: false,
      deleteAction: null,
      scheduleType: null,
      editedIndex: -1,
      editItemId: null,
      editedItem: null,
      scheduleInfo: null,
      filters: {
        staff_id: null,
        event_type: null,
        event_status: null,
      },
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPLugin, interactionPlugin,],
        customButtons: {
          myCustomButton: {
            text: 'custom!',
            click: function() {
            }
          },
          myCustomTitle: {
            text: 'Calander',
          }
        },
        headerToolbar: {
          right: "dayGridMonth,timeGridWeek,timeGridDay",
          left: 'today prev,next title',
        },
        initialView: "timeGridWeek",
        nowIndicator: true,
        displayEventTime: true,
        now: "",
        dateClick: null,
        eventClick: null,
        // eventBackgroundColor: "rgb(var(--v-theme-primary))",
        // eventBorderColor: "rgb(var(--v-theme-primary))",
        eventDisplay: "auto",
        progressiveEventRendering: true,
        editable: true,
        firstDay: 6,
        timeZone: "Australia/Sydney",
        events: null,
        eventTextColor: "#000",
        locales: allLocales,
        locale: localStorage.getItem("lang") || "ar",
      },
    }),

    computed: {
      pageCrumb() {
        return {
          icon: "fa-solid fa-calendar",
          pageTitle: this.$vuetify.locale.t(
            "$vuetify.nav_drawer.schedule.plural"
          ),
          items: [
            {
              title: this.$vuetify.locale.t(
                "$vuetify.nav_drawer.schedule.plural"
              ),
              disabled: true,
            },
          ],
        };
      },
      getSessions() {
        const sessions = this.$store.getters["sessions/sessions"].data;
        return sessions;
      },
      currentDate() {
        const currentDate = new Date();
        // Get the individual components of the date and time
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Add 1 because months are zero-based
        const day = currentDate.getDate().toString().padStart(2, "0");
        const hours = currentDate.getHours().toString().padStart(2, "0");
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");
        const seconds = currentDate.getSeconds().toString().padStart(2, "0");

        // Create a string in the 24-hour format (e.g., "2023-10-05 13:11:00")
        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        return formattedDate;
      },
    },
    methods: {
      close() {
        console.log("closed");
      },
      closeDelete() {
        this.dialogDelete = false;
        this.loadSessions();
      },
      deleteSession(action) {
        this.deleteAction = action;
        this.$nextTick(() => {
          this.dialogDelete = true;
        });
      },
      loadSessions() {
        this.$store.dispatch("sessions/fetchSessions", {
          filterOpts: this.filters,
          per_page: -1,
          page: 1,
        });
      },
      filterSchedules(fl) {
        this.filters = fl;
        this.loadSessions();
      },
      handleDateClick() {
        this.drawer = !this.drawer;
      },
      editItem(id) {
        this.editedIndex = this.calendarOptions.events.findIndex((object) => {
          return object.id == id;
        });

        this.axios({
          method: "get",
          url: `session/show/${id}`,
        })
          .then((res) => {
            const dataObj = res.data.data;
            this.scheduleType = dataObj.type;
            this.drawer = !this.drawer;
            this.$nextTick(() => {
              this.infoDialog = !this.infoDialog;
              this.editedItem = Object.assign({}, dataObj);
              this.editItemId = id;
            });
          })
          .finally(() => {});
      },
      handleScheduleType(type) {
        this.scheduleType = type;
      },
      getScheduleInfo(item) {
        this.editItemId = item.event._def.publicId;
        this.infoDialog = !this.infoDialog;
      },
      closeEvent() {
        this.infoDialog = false;
      },
      closeDrawer() {
        this.drawer = false;
        this.scheduleType = null;
        this.editedIndex = -1;
        this.editItemId = null;
        this.editedItem = null;
      },
      
      openBookings(info) {
        this.scheduleInfo = info;
        this.bookingsDrawer = true;
        this.infoDialog = false;
      },

      closeBookingsDrawer() {
        this.bookingsDrawer = false;
      },
    },
    watch: {
      getSessions(newVal) {
        this.calendarOptions.events = [];
        for (const item of newVal) {
          if (item.schedule_on.length > 0) {
            this.calendarOptions.events.push({
              id: item.id,
              title: item.name,
              coach: item.coach,
              max_participants: item.max_participants,
              startTime: item.time_from,
              endTime: item.time_to,
              allDay: false,
              daysOfWeek: item.schedule_on,
              startRecur: item.date,
              endRecur: item.end_at,
              backgroundColor: item.color,
              borderColor: item.color,
              className: item.className,
            });
          } else {
            this.calendarOptions.events.push({
              id: item.id,
              title: item.name,
              coach: item.coach,
              max_participants: item.max_participants,
              start: `${item.date}T${item.time_from}`,
              endTime: `${item.date}T${item.time_to}`,
              allDay: false,
              backgroundColor: item.color,
              borderColor: item.color,
              className: item.className,
            });
          }
        }
      },
      "$store.getters.lang": function (newVal) {
        console.log(newVal);
        this.calendarOptions.locale = newVal;
      },
      drawer(newVal) {
        if (!newVal) {
          this.closeDrawer();
        }
      },
      bookingsDrawer(newVal) {
        if (!newVal) {
          this.closeBookingsDrawer();
        }
      },
    },
    created() {
      this.loadSessions();
      this.calendarOptions.now = this.currentDate;
      this.calendarOptions.dateClick = this.handleDateClick;
      this.calendarOptions.eventClick = this.getScheduleInfo;
      this.filters = this.$store.getters["sessions/filterOpts"];
    },
  };
</script>

<style lang="scss">
  .fc-prev-button,
  .fc-next-button,
  .fc-today-button,
  .fc-button-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(var(--v-theme-primary)) !important;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
  }
  .fc-button-active {
    background-color: rgb(var(--v-theme-primary), 0.8) !important;
  }
  .fc .fc-button .fc-icon {
    all: unset;
  }
  .fc .fc-toolbar-title {
    display: inline;
    font-size: 1.125rem;
  }

</style>

<style lang="scss" scoped>
  :deep() {
    .v-slide-group__content {
      flex-wrap: wrap;
    }
    .v-slide-group__next {
      flex: 0 1 22px;
      justify-content: flex-end;
      min-width: 22px;
    }
    .v-slide-group__prev {
      flex: 0 1 22px;
      justify-content: flex-start;
      min-width: 22px;
    }
    .cancelled-schedule {
      opacity: 0.6;
    }
    .fc-myCustomTitle-button{
    background: none;
    background-color: transparent !important;
    color: #000;
    font-size: 1.625rem;
    font-weight: bold;  
  }
  }
</style>
