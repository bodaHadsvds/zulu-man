<template>
  <h2 class="text-h6 text-primary mb-2">
    {{ $vuetify.locale.t("$vuetify.global.product.plural") }}
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
  import { defineAsyncComponent } from "vue";
  import { VDataTable } from "vuetify/lib/labs/components.mjs";
  import axios from "axios";
  const EditDialog = defineAsyncComponent(() => import("./EditDialog.vue"));
  export default {
    components: { VDataTable, EditDialog },
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
            title: this.$vuetify.locale.t("$vuetify.global.product.table.date"),
            key: "start",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.product.table.item"),
            key: "membership",
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
            title: this.$vuetify.locale.t("$vuetify.global.actions"),
            align: "end",
            key: "actions",
            sortable: false,
          },
        ];
      },
    },
    methods: {
      fetchProducts() {
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
      this.fetchProducts();
    },
  };
</script>
