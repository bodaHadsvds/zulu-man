<template>
  <h2 class="text-h6 text-primary mb-2">
    {{ $vuetify.locale.t("$vuetify.global.product.this") }}
  </h2>

  <v-dialog v-model="dialogDelete" width="fit-content">
    <v-card class="px-3 py-8 text-center rounded-lg">
      <v-card-title class="text-h5 mb-4">
        <p class="text-h5">
          {{
            $vuetify.locale.t("$vuetify.global.sure_delete") +
            " " +
            $vuetify.locale.t("$vuetify.global.product.this")
          }}?
        </p>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="closeDelete">
          {{ $vuetify.locale.t("$vuetify.global.close") }}
        </v-btn>
        <v-btn
          color="error"
          variant="flat"
          @click="deleteItemConfirm(editItemId)"
        >
          {{ $vuetify.locale.t("$vuetify.global.delete") }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-data-table-server
    v-model:options="options"
    :headers="headers"
    :loading="loading"
    :items="products.data"
    item-value="id"
    class="elevation-0 mb-6"
    :items-length="porductsTotal"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <div class="d-flex align-center justify-end" style="gap: 5px">
        <v-btn
          v-if="item.default == 0"
          icon="fa-solid fa-trash"
          size="small"
          variant="text"
          color="error"
          @click.stop="deleteItem(item)"
        ></v-btn>
      </div>
    </template>

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
          @click="loadProducts"
          >{{ $vuetify.locale.t("$vuetify.global.fetch_data.retry") }}</v-btn
        >
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
  import axios from "axios";
  export default {
    components: { VDataTableServer },
    data() {
      return {
        products: [],
        options: {},
        dialogDelete: false,
        editedIndex: -1,
        editItemId: null,
        loading: true,
        dataSuccess: true,
      };
    },
    computed: {
      headers() {
        return [
          {
            title: this.$vuetify.locale.t("$vuetify.global.product.table.date"),
            key: "created_at",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.product.table.item"),
            key: "item",
          },
          {
            title: this.$vuetify.locale.t(
              "$vuetify.global.membership.table.value"
            ),
            key: "item_price",
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
      porductsTotal() {
        const products = this.products.total;
        return parseInt(products);
      },
    },
    methods: {
      loadProducts() {
        this.loading = true;
        axios
          .get(`user/get_product/${parseInt(this.$route.params.id)}`, {
            params: {},
          })
          .then((response) => {
            this.loading = false;
            const dataArr = {
              data: [],
              per_page: response.data.per_page,
              page: response.data.page,
              total: response.data.total,
            };
            for (const item of response.data.data) {
              const created_at = new Date(
                Date.parse(item.created_at)
              ).toLocaleDateString("en-GB");

              const itemObj = {
                id: item.id,
                created_at: created_at,
                item: item.name,
                item_price: item.item_price,
                balance: item.debet,
                default: item.default,
              };
              dataArr.data.push(itemObj);
            }
            this.products = dataArr;
          })
          .catch(() => {
            this.dataSuccess = false;
            this.loading = false;
          });
      },
      deleteItem(item) {
        this.editedIndex = this.products.data.indexOf(item);
        // this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
        this.editItemId = item.id;
      },
      deleteItemConfirm(id) {
        axios({
          url: `user/delete_product`,
          method: "POST",
          data: {
            id: id,
            user_id: this.$route.params.id,
          },
        }).then((response) => {
          if (response.status) {
            this.products.data.splice(this.editedIndex, 1);
            this.closeDelete();
            this.loadProducts();
          }
        });
      },
      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          // this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
    },
    created() {
      this.loadProducts();
    },
  };
</script>
