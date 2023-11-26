<template>
  <h2 class="text-h6 text-primary mb-2">
    {{ $vuetify.locale.t("$vuetify.global.membership.plural") }}
  </h2>
  <v-data-table
    v-model:options="options"
    :headers="headers"
    :loading="loading"
    :items="memberships"
    :items-per-page="5"
    item-value="id"
    class="elevation-0 mb-6"
    hover
  >
    <template v-slot:[`item.actions`]>
      <div class="d-flex align-center justify-end" style="gap: 5px">
        <edit-dialog style="display: contents" />
        <v-btn
          icon="fa-solid fa-calendar-days"
          size="x-small"
          variant="text"
          color="success"
        ></v-btn>
        <hold-dialog style="display: contents" />
        <v-btn
          icon="fa-solid fa-trash"
          size="x-small"
          variant="text"
          color="error"
        ></v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<script>
  import { VDataTable } from "vuetify/lib/labs/components.mjs";
  import axios from "axios";
  import { defineAsyncComponent } from "vue";
  const EditDialog = defineAsyncComponent(() => import("./EditDialog.vue"));
  const HoldDialog = defineAsyncComponent(() => import("./HoldDialog.vue"));
  export default {
    components: { VDataTable, EditDialog, HoldDialog },
    data() {
      return {
        memberships: [],
        loading: true,
        options: {},

        editDialog: false,
      };
    },
    computed: {
      headers() {
        return [
          {
            title: this.$vuetify.locale.t(
              "$vuetify.global.membership.table.purchase_date"
            ),
            key: "purchase_date",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.membership.this"),
            key: "membership",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.status"),
            key: "status",
          },
          {
            title: this.$vuetify.locale.t(
              "$vuetify.global.membership.table.value"
            ),
            key: "value",
          },
          {
            title: this.$vuetify.locale.t(
              "$vuetify.global.membership.table.balance"
            ),
            key: "balance",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.start.this"),
            key: "start",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.end.this"),
            key: "end",
          },
          {
            title: this.$vuetify.locale.t(
              "$vuetify.global.membership.table.sessions_left"
            ),
            key: "sessions_left",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.actions"),
            align: "end",
            key: "actions",
            sortable: false,
          },
        ];
      },
    },
    methods: {
      fetchMemberShips() {
        this.loading = true;
        axios
          .get("https://retoolapi.dev/PHMJ6E/user-memberships")
          .then((response) => {
            this.memberships = response.data;
            this.loading = false;
          });
      },
    },
    mounted() {
      this.fetchMemberShips();
    },
  };
</script>
