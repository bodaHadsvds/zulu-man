<template>
  <h2 class="text-h6 text-primary mb-2">Invoices</h2>
  <v-data-table
    v-model:options="options"
    :headers="headers"
    :loading="loading"
    loading-text="Loading... Please wait"
    :items="memberships"
    :items-per-page="5"
    item-value="id"
    class="elevation-0"
    hover
  >
    <template v-slot:[`item.actions`]>
      <div class="d-flex align-center justify-end" style="gap: 5px">
        <v-btn
          icon="fa-solid fa-envelope"
          size="x-small"
          variant="text"
          color="grey-darken-1"
        ></v-btn>
        <v-btn
          icon="fa-solid fa-file-pdf"
          size="x-small"
          variant="text"
          color="primary"
        ></v-btn>
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
  // import { defineAsyncComponent } from "vue";
  import { VDataTable } from "vuetify/lib/labs/components.mjs";
  import axios from "axios";
  export default {
    components: { VDataTable },
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
            title: this.$vuetify.locale.t("$vuetify.global.invoice.issue_date"),
            key: "start",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.invoice.due_date"),
            key: "end",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.invoice.invoice_no"),
            key: "value",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.status"),
            key: "status",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.invoice.amount"),
            key: "balance",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.actions"),
            align: "end",
            key: "actions",
          },
        ];
      },
    },
    methods: {
      fetchInvoices() {
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
      this.fetchInvoices();
    },
  };
</script>
