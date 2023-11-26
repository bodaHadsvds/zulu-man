<template>
  <v-tabs v-model="tab" border-bottom color="primary">
    <v-tab
      v-for="item in tabsItems"
      :key="item.key"
      :value="item.key"
      :prepend-icon="`fa-solid fa-${item.icon}`"
    >
      {{ item.value }}

      <!-- <div>(11)</div> -->
    </v-tab>
  </v-tabs>
  <v-divider class="mb-6"></v-divider>

  <v-window v-model="tab">
    <v-window-item v-for="item in tabsItems" :key="item.key" :value="item.key">
      <div v-if="tabsItems.indexOf(item) === 0">
        <bookings-table :scheduleId="scheduleId" />
      </div>
      <div v-if="tabsItems.indexOf(item) === 1">
        <waiting-table />
      </div>
      <div v-if="tabsItems.indexOf(item) === 2">
        <cancellations-table :scheduleId="scheduleId" />
      </div>
    </v-window-item>
  </v-window>
</template>

<script>
  import { defineAsyncComponent } from "vue";
  const BookingsTable = defineAsyncComponent(() =>
    import("./tab-content/tables/BookingsTable.vue")
  );
  const WaitingTable = defineAsyncComponent(() =>
    import("./tab-content/tables/WaitingTable.vue")
  );
  const CancellationsTable = defineAsyncComponent(() =>
    import("./tab-content/tables/CancellationsTable.vue")
  );
  export default {
    props: {
      scheduleId: {
        required: false,
      },
    },
    components: { BookingsTable, WaitingTable, CancellationsTable },
    data: () => ({
      tab: null,
    }),
    computed: {
      tabsItems() {
        return [
          {
            key: "bookings",
            icon: "calendar-check",
            value: this.$vuetify.locale.t("$vuetify.global.booking.this"),
          },
          {
            key: "waiting_list",
            icon: "rectangle-list",
            value: this.$vuetify.locale.t(
              "$vuetify.global.booking.tabs.waiting_list"
            ),
          },
          {
            key: "cancellations",
            icon: "trash-can",
            value: this.$vuetify.locale.t(
              "$vuetify.global.booking.tabs.cancellations"
            ),
          },
        ];
      },
    },
  };
</script>
