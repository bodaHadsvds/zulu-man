<template>
  <v-row>
    <v-col cols="4" class="mb-4">
      <v-card elevation="1" rounded="0" class="h-100 mb-4">
        <template v-slot:title>
          <div class="d-flex align-center justify-space-between flex-wrap">
            <h5 class="text-subtitle-1 text-grey">Bookings</h5>
            <v-icon icon="fa-solid fa-money-bills fa-lg"></v-icon>
          </div>
        </template>
        <v-card-text>
          <p class="text-h5 mb-3">{{ bookingsStats }}</p>
          <v-select
            v-model="bookings"
            density="compact"
            variant="outlined"
            class="elevation-0 bg-background p-2"
            :items="['Today', 'Month', 'Year']"
            single-line
            hide-details
          ></v-select>
        </v-card-text>
      </v-card>
      <v-card elevation="1" rounded="0" class="h-100 mb-4">
        <template v-slot:title>
          <div class="d-flex align-center justify-space-between flex-wrap">
            <h5 class="text-subtitle-1">Today Tasks</h5>
          </div>
        </template>
        <v-divider></v-divider>
        <v-card-text class=""> </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4" class="mb-4">
      <v-card elevation="1" rounded="0" class="h-50 mb-4">
        <template v-slot:title>
          <div class="d-flex align-center justify-space-between flex-wrap">
            <h5 class="text-subtitle-1 text-grey">Sales</h5>
            <v-icon icon="fa-solid fa-money-bills fa-lg"></v-icon>
          </div>
        </template>
        <v-card-text>
          <p class="text-h5 mb-3">{{ salesStats }} KWD</p>
          <v-select
            v-model="sales"
            density="compact"
            variant="outlined"
            class="elevation-0 bg-background p-2"
            :items="['Today', 'Month', 'Year']"
            single-line
            hide-details
          ></v-select>
        </v-card-text>
      </v-card>
      <v-card elevation="1" rounded="0" class="h-50 mb-4">
        <template v-slot:title>
          <div class="d-flex align-center justify-space-between flex-wrap">
            <h5 class="text-subtitle-1 text-grey">Debts</h5>
            <v-icon icon="fa-solid fa-money-bill-transfer fa-lg"></v-icon>
          </div>
        </template>
        <v-card-text>
          <p class="text-h5 mb-3">{{ this.statistics.debets }} KWD</p>
        </v-card-text>
      </v-card>
      <v-card elevation="1" rounded="0" class="h-100">
        <template v-slot:title>
          <div class="d-flex align-center justify-space-between flex-wrap">
            <h5 class="text-subtitle-1">Top Services</h5>
          </div>
        </template>
        <v-divider></v-divider>
        <v-card-text class=""></v-card-text>
      </v-card>
    </v-col>

    <v-col cols="4" class="mb-4">
      <v-card elevation="1" rounded="0" class="h-100">
        <template v-slot:title>
          <h5 class="text-subtitle-1 mb-3">Upcoming group sessions</h5>
        </template>
        <v-divider></v-divider>
        <v-card-text class=""> </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    data: () => ({
      search: null,
      statistics: [],
      bookings: "Today",
      sales: "Today",
    }),
    computed: {
      getStatistics() {
        return this.$store.getters["statistics/statistics"];
      },
      bookingsStats() {
        const booking = () => {
          if (this.bookings === "Today") {
            return this.statistics.today_bookings;
          } else if (this.bookings === "Month") {
            return this.statistics.month_bookings;
          } else {
            return this.statistics.year_bookings;
          }
        };
        return booking();
      },
      salesStats() {
        const sale = () => {
          if (this.sales === "Today") {
            return this.statistics.today_sales;
          } else if (this.sales === "Month") {
            return this.statistics.month_sales;
          } else {
            return this.statistics.year_sales;
          }
        };
        return sale();
      },
    },
    methods: {
      loadStatistics() {
        this.$store.dispatch("statistics/fetchStatistics");
      },
    },
    watch: {
      getStatistics(newVal) {
        if (newVal) this.statistics = newVal;
        else this.statistics = [];
      },
    },
    created() {
      this.loadStatistics();
    },
  };
</script>
