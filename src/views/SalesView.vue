<template>
  <v-toolbar class="bg-background px-0 py-4 pt-0">
    <v-row>
      <v-col cols="6" class="d-flex align-center justify-start">
        <h2>
          {{ $vuetify.locale.t("$vuetify.global.sales.plural") }}
        </h2>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-end">
      </v-col>
    </v-row>
  </v-toolbar>
  <v-data-table-server
    v-model="selected"
    v-model:options="options"
    :headers="headers"
    :loading="this.$store.state.sales.loading"
    :items="sales"
    :items-per-page="10"
    item-value="id"
    class="rounded-lg elevation-0"
    :search="search"
    :items-length="salesTotal"
  >
    <template
      v-if="this.$store.state.sales.dataSuccess == false"
      v-slot:no-data
    >
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
          @click="loadSales"
        >
          {{ $vuetify.locale.t("$vuetify.global.fetch_data.retry") }}
        </v-btn>
      </div>
    </template>
  </v-data-table-server>
</template>

<script>
  import ThePageHead from "@/layouts/default/ThePageHead.vue";
  import { VDataTableServer } from "vuetify/lib/labs/components.mjs";
  import axios from "axios";
  export default {
    props: ["report"],
    components: { ThePageHead, VDataTableServer },

    data: () => ({
      search: null,
      selected: [],
      options: {},
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editItemId: null,
      editedItem: {
        name_ar: null,
        name_en: null,
        status: "active",
        price: null,
        quantity: null,
        sku: null,
        available: "no",
      },
      defaultItem: {
        name_ar: null,
        name_en: null,
        status: "active",
        price: null,
        quantity: null,
        sku: null,
        available: "no",
      },

      sales: [],
    }),
    computed: {
      headers() {
        return [
          {
            title: this.$vuetify.locale.t("$vuetify.global.sales.table.date"),
            key: "date",
          },
          {
            title: this.$vuetify.locale.t(
              "$vuetify.global.sales.table.user_full_name"
            ),
            key: "user_full_name",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.sales.table.type"),
            key: "type",
          },
          {
            title: this.$vuetify.locale.t(
              "$vuetify.global.sales.table.staff_full_name"
            ),
            key: "staff_full_name",
          },
          {
            title: this.$vuetify.locale.t(
              "$vuetify.global.sales.table.item_name"
            ),
            key: "item_name",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.sales.table.price"),
            key: "price",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.sales.table.paid"),
            key: "paid",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.sales.table.debet"),
            key: "debet",
          },
          {
            title: this.$vuetify.locale.t(
              "$vuetify.global.sales.table.item_type"
            ),
            key: "item_type",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.sales.table.status"),
            key: "status",
          },
        ];
      },
      pageCrumb() {
        return {
          icon: "fa-solid fa-sack-dollar",
          pageTitle: this.$vuetify.locale.t("$vuetify.global.sales.plural"),
          items: [
            {
              title: this.$vuetify.locale.t("$vuetify.global.sales.plural"),
              disabled: true,
              href: "/sales",
            },
          ],
        };
      },
      filterItems() {
        return [
          {
            text: this.$vuetify.locale.t("$vuetify.global.active"),
            value: "active",
          },
          {
            text: this.$vuetify.locale.t("$vuetify.global.inactive"),
            value: "inactive",
          },
        ];
      },
      getSales() {
        const prods = this.$store.getters["sales/sales"].data;
        return prods.filter((i) => {
          if (this.search !== "all") {
            return !this.search || i.status === this.search;
          } else {
            return !this.search || i.status !== this.search;
          }
        });
      },
      salesTotal() {
        const sales = this.$store.getters["sales/sales"].total;
        return parseInt(sales);
      },
      formTitle() {
        return this.editedIndex === -1 ? "New Sale" : "Edit sale";
      },
    },

    methods: {
      loadSales() {
        this.$store.dispatch("sales/fetchSales", {
          report: this.report ? this.report : null,
          per_page: this.options.per_page,
          page: this.options.page,
        });
      },
      editItem(item) {
        this.editedIndex = this.sales.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
        this.editItemId = item.id;
      },
      deleteItem(item) {
        this.editedIndex = this.sales.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
        this.editItemId = item.id;
      },
      deleteItemConfirm(id) {
        axios({
          url: `sale/destroy/${id}`,
          method: "delete",
        }).then((response) => {
          if (response.status) {
            this.sales.splice(this.editedIndex, 1);
            this.closeDelete();
            this.loadSales();
          }
        });
      },
      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
      save() {
        if (this.editedIndex > -1) {
          axios({
            url: `sale/update/${this.editItemId}`,
            method: "POST",
            data: this.editedItem,
          })
            .then((res) => {
              if (res.status) {
                Object.assign(this.sales[this.editedIndex], this.editedItem);
              }
            })
            .then(() => {
              this.close();
            });
        } else {
          axios({
            url: `sale/store`,
            method: "POST",
            data: this.editedItem,
          })
            .then((res) => {
              if (res.status) {
                this.sales.unshift(this.editedItem);
              }
            })
            .then(() => {
              this.close();
            });
        }
      },
    },

    watch: {
      getSales(newVal) {
        this.sales = newVal;
      },
      options(value) {
        const { itemsPerPage, page } = value;
        this.$store.dispatch("sales/fetchSales", {
          report: this.report ? this.report : null,
          per_page: itemsPerPage,
          page: page,
        });
      },
      dialog(newVal) {
        if (!newVal) {
          this.close();
        }
      },
      report() {
        this.loadSales();
      },
    },
    mounted() {
      this.loadSales();
    },
  };
</script>
