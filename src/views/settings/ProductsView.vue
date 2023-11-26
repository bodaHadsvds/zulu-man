<template>
  <v-toolbar class="bg-background px-0 py-4 pt-0">
    <v-row>
      <v-col cols="6" class="d-flex align-center justify-start">
        <h2>
          {{ $vuetify.locale.t("$vuetify.global.product.plural") }}
        </h2>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-end">
        <div class="d-flex align-stretch flex-wrap" style="gap: 10px">
          <v-dialog v-model="dialog" class="main-dialog" max-width="900">
      <template v-slot:activator="{ props }">
        <div class="d-flex align-stretch flex-wrap" style="gap: 10px">
          <v-btn
            color="primary"
            class="h-auto"
            variant="flat"
            dark
            v-bind="props"
          >
            {{ $vuetify.locale.t("$vuetify.global.product.add") }}
          </v-btn>
          <v-responsive width="200">
            <v-select
              v-model="search"
              :label="$vuetify.locale.t('$vuetify.global.search')"
              density="compact"
              variant="outlined"
              hide-details
              :items="filterItems"
              item-title="text"
              item-value="value"
              single-line
              clearable
            ></v-select>
          </v-responsive>
        </div>
      </template>
      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar color="primary" :title="formTitle"></v-toolbar>
        </v-card-title>
        <form @submit.prevent="save">
          <v-card-text style="max-height: 50vh" class="pa-0">
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    type="text"
                    v-model="editedItem.name_ar"
                    :label="$vuetify.locale.t('$vuetify.global.name.this')"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.name.placeholder')
                    "
                    name="name_ar"
                    density="compact"
                    variant="outlined"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    type="text"
                    v-model="editedItem.price"
                    :label="$vuetify.locale.t('$vuetify.global.price.this')"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.price.placeholder')
                    "
                    name="price"
                    density="compact"
                    variant="outlined"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    type="number"
                    v-model="editedItem.quantity"
                    :label="$vuetify.locale.t('$vuetify.global.qty.this')"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.qty.placeholder')
                    "
                    name="quantity"
                    density="compact"
                    variant="outlined"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="editedItem.sku"
                    :label="$vuetify.locale.t('$vuetify.global.sku.this')"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.sku.placeholder')
                    "
                    density="compact"
                    variant="outlined"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-switch
                    v-model="editedItem.available"
                    hide-details
                    true-value="1"
                    false-value="0"
                    :label="
                      $vuetify.locale.t(
                        '$vuetify.global.product.available_in_shop'
                      )
                    "
                    name="available"
                    color="primary"
                    density="compact"
                  ></v-switch>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-switch
                    v-model="editedItem.status"
                    hide-details
                    true-value="active"
                    false-value="inactive"
                    :label="$vuetify.locale.t('$vuetify.global.item_is_active')"
                    name="status"
                    color="primary"
                    density="compact"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="px-2 py-3">
            <v-spacer></v-spacer>
            <v-btn variant="text" type="button" @click="close">
              {{ $vuetify.locale.t("$vuetify.global.close") }}
            </v-btn>
            <v-btn color="primary" variant="flat" type="submit">
              {{ $vuetify.locale.t("$vuetify.global.save") }}
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" width="fit-content">
      <v-card>
        <v-card-title class="text-h5">
          {{
            `${$vuetify.locale.t(
              "$vuetify.global.sure_delete"
            )} ${$vuetify.locale.t("$vuetify.global.product.this")}`
          }}
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
        </div>
        
        
      </v-col>
    </v-row>
  </v-toolbar>
  <v-data-table-server
    v-model="selected"
    v-model:options="options"
    :headers="headers"
    :loading="this.$store.state.products.loading"
    :items="products"
    :items-per-page="10"
    item-value="id"
    class="rounded-lg elevation-0"
    :search="search"
    :items-length="productsTotal"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        icon="fa-solid fa-pen"
        size="small"
        variant="text"
        color="primary"
        class="me-2"
        @click="editItem(item)"
      >
      </v-btn>
      <v-btn
        icon="fa-solid fa-trash"
        size="small"
        variant="text"
        color="error"
        @click="deleteItem(item)"
      ></v-btn>
    </template>
    <template
      v-if="this.$store.state.products.dataSuccess == false"
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
          @click="loadProducts"
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
        status: "active",
        price: null,
        quantity: null,
        sku: null,
        available: "0",
      },
      defaultItem: {
        name_ar: null,
        status: "active",
        price: null,
        quantity: null,
        sku: null,
        available: "0",
      },

      products: [],
    }),
    computed: {
      headers() {
        return [
          {
            title: this.$vuetify.locale.t("$vuetify.global.name.this"),
            key: "name_ar",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.status"),
            key: "status",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.price.this"),
            key: "price",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.qty.this"),
            key: "quantity",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.sku.this"),
            key: "sku",
          },
          {
            title: this.$vuetify.locale.t(
              "$vuetify.global.product.available_in_shop"
            ),
            key: "available",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.actions"),
            align: "end",
            key: "actions",
            sortable: false,
          },
        ];
      },
      pageCrumb() {
        return {
          icon: "fa-solid fa-grip",
          pageTitle: this.$vuetify.locale.t("$vuetify.global.product.plural"),
          items: [
            {
              title: this.$vuetify.locale.t("$vuetify.global.product.plural"),
              disabled: true,
              href: "/products",
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
      getProducts() {
        const prods = this.$store.getters["products/products"].data;
        return prods.filter((i) => {
          if (this.search !== "all") {
            return !this.search || i.status === this.search;
          } else {
            return !this.search || i.status !== this.search;
          }
        });
      },
      productsTotal() {
        const products = this.$store.getters["products/products"].total;
        return parseInt(products);
      },
      formTitle() {
        return this.editedIndex === -1 ? "New Product" : "Edit Product";
      },
    },

    methods: {
      loadProducts() {
        this.$store.dispatch("products/fetchProducts", {
          per_page: this.options.per_page,
          page: this.options.page,
        });
      },
      editItem(item) {
        this.editedIndex = this.products.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
        this.editItemId = item.id;
      },
      deleteItem(item) {
        this.editedIndex = this.products.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
        this.editItemId = item.id;
      },
      deleteItemConfirm(id) {
        axios({
          url: `product/destroy/${id}`,
          method: "delete",
        }).then((response) => {
          if (response.status) {
            this.products.splice(this.editedIndex, 1);
            this.closeDelete();
            this.loadProducts();
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
            url: `product/update/${this.editItemId}`,
            method: "POST",
            data: this.editedItem,
          })
            .then((res) => {
              if (res.status) {
                Object.assign(this.products[this.editedIndex], this.editedItem);
              }
            })
            .then(() => {
              this.close();
            });
        } else {
          axios({
            url: `product/store`,
            method: "POST",
            data: this.editedItem,
          })
            .then((res) => {
              if (res.status) {
                this.products.unshift(this.editedItem);
              }
            })
            .then(() => {
              this.close();
            });
        }
      },
    },

    watch: {
      getProducts(newVal) {
        this.products = newVal;
      },
      options(value) {
        const { itemsPerPage, page } = value;
        this.$store.dispatch("products/fetchProducts", {
          per_page: itemsPerPage,
          page: page,
        });
      },
      dialog(newVal) {
        if (!newVal) {
          this.close();
        }
      },
    },
    mounted() {
      this.loadProducts();
    },
  };
</script>
