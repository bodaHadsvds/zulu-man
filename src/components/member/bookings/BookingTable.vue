<template>
  <v-data-table-server
    v-model:options="options"
    :headers="headers"
    :loading="loading"
    :items="bookings"
    item-value="id"
    class="elevation-0"
    :items-length="bookingsTotal"
  >
    <template v-if="dataSuccess == false" v-slot:no-data>
      <div class="py-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.com/svgjs"
          width="80"
          height="80"
          x="0"
          y="0"
          viewBox="0 0 64 64"
          style="enable-background: new 0 0 80 80"
          xml:space="preserve"
          class="hovered-paths mb-2"
        >
          <g>
            <path
              d="M59.7 17.8 46.2 4.45a1.017 1.017 0 0 0-.7-.28l-27.09-.18a.982.982 0 0 0-.71.3L4.33 17.83a.984.984 0 0 0-.29.7L3.99 45.5a1 1 0 0 0 .3.71l13.5 13.49a.967.967 0 0 0 .7.29h27a.99.99 0 0 0 .71-.29l13.48-13.52a.99.99 0 0 0 .29-.71l.02-26.95a1.013 1.013 0 0 0-.29-.72zm-1.73 27.26L45.08 57.99H18.91L5.99 45.09l.05-26.14L18.82 6l26.26.16 12.91 12.77z"
              fill="rgb(var(--v-theme-primary))"
              data-original="rgb(var(--v-theme-primary))"
              class="hovered-path"
            ></path>
            <path
              d="M44.29 18.32 32 30.58 19.74 18.29a1.004 1.004 0 0 0-1.42 1.42L30.58 32 18.29 44.26a1.004 1.004 0 0 0 1.42 1.42L32 33.42l12.26 12.29a1.004 1.004 0 0 0 1.42-1.42L33.42 32l12.29-12.26a1.004 1.004 0 0 0-1.42-1.42z"
              fill="rgb(var(--v-theme-primary))"
              data-original="rgb(var(--v-theme-primary))"
              class="hovered-path"
            ></path>
          </g>
        </svg>
        <p class="text-subtitle-1 font-weight-bold mb-0">
          {{ $vuetify.locale.t("$vuetify.global.fetch_data.error") }}
        </p>
        <v-btn
          variant="text"
          color="primary"
          prepend-icon="fa-solid fa-rotate-right"
          class="text-caption pa-0"
          @click="loadBookings"
        >
          {{ $vuetify.locale.t("$vuetify.global.fetch_data.retry") }}
        </v-btn>
      </div>
    </template>
    <template v-slot:loading>
      <p class="text-subtitle-1 font-weight-bold">
        {{ $vuetify.locale.t("$vuetify.global.fetch_data.loading") }}
      </p>
    </template>
  </v-data-table-server>
</template>
<script>
  import { VDataTableServer } from "vuetify/lib/labs/components.mjs";
  export default {
    props: ["bookingType"],
    components: { VDataTableServer },
    data: () => ({
      options: {
        per_page: 10,
        page: 1,
      },
      type: null,
      bookings: [],
    }),
    computed: {
      headers() {
        if (this.bookingType === "history") {
          return [
            {
              title: "date",
              key: "date",
            },
            {
              title: "day",
              key: "day",
            },
            {
              title: "group_name",
              key: "group_name",
            },
            {
              title: "time",
              key: "time",
            },
            {
              title: "coach",
              key: "coach",
            },
            {
              title: "booked",
              key: "booked",
            },
            {
              title: "checked",
              key: "checked",
            },
            {
              title: "membership_name",
              key: "membership_name",
            },
            {
              title: "session_name",
              key: "session_name",
            },
          ];
        } else if (this.bookingType === "cancelled") {
          return [
            {
              title: "date",
              key: "date",
            },
            {
              title: "day",
              key: "day",
            },
            {
              title: "group_name",
              key: "group_name",
            },
            {
              title: "time",
              key: "time",
            },
            {
              title: "coach",
              key: "coach",
            },
            {
              title: "booked",
              key: "booked",
            },
            {
              title: "cancellation_time",
              key: "cancellation_time",
            },
          ];
        }
        return [
          {
            title: "date",
            key: "date",
          },
          {
            title: "day",
            key: "day",
          },
          {
            title: "group_name",
            key: "group_name",
          },
          {
            title: "time",
            key: "time",
          },
          {
            title: "coach",
            key: "coach",
          },
          {
            title: "session_name",
            key: "session_name",
          },
          {
            title: "membership_name",
            key: "membership_name",
          },
        ];
      },
      getBookings() {
        return this.$store.getters[`memberBookings/${this.bookingType}`].data;
      },
      loading() {
        const loadingFun = () => {
          if (this.bookingType === "history") {
            return this.$store.state.memberBookings.historyLoading;
          } else if (this.bookingType === "cancelled") {
            return this.$store.state.memberBookings.cancelledLoading;
          } else {
            return this.$store.state.memberBookings.futureLoading;
          }
        };
        return loadingFun();
      },
      dataSuccess() {
        const sucessFun = () => {
          if (this.bookingType === "history") {
            return this.$store.state.memberBookings.historyDataSuccess;
          } else if (this.bookingType === "cancelled") {
            return this.$store.state.memberBookings.cancelledDataSuccess;
          } else {
            return this.$store.state.memberBookings.futureDataSuccess;
          }
        };
        return sucessFun();
      },
      bookingsTotal() {
        const bookings =
          this.$store.getters[`memberBookings/${this.type}`].total;
        return parseInt(bookings);
      },
    },
    methods: {
      loadBookings() {
        this.$store.dispatch("memberBookings/fetchBookings", {
          user_id: this.$route.params.id,
          type: this.type,
          per_page: this.options.per_page,
          page: this.options.page,
        });
      },
    },
    watch: {
      getBookings(newVal) {
        this.bookings = newVal;
      },
      options(value) {
        const { itemsPerPage, page } = value;
        this.$store.dispatch("memberBookings/fetchBookings", {
          user_id: this.$route.params.id,
          type: this.bookingType,
          per_page: itemsPerPage,
          page: page,
        });
        this.loadBookings();
      },
    },
    created() {
      this.type = this.bookingType;
      this.loadBookings();
    },
  };
</script>
