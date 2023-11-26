<template>
    <v-toolbar class="bg-background px-0 py-4 pt-0">
    <v-row>
      <v-col cols="6" class="d-flex align-center justify-start">
        <h2>
          {{ $vuetify.locale.t("$vuetify.global.membership.plans") }}
        </h2>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-end">

        <v-dialog v-model="dialog" class="main-dialog" max-width="1024" scrollable>
        <template v-slot:activator="{ props }">
          <div class="d-flex align-stretch flex-wrap" style="gap: 10px">
            <v-responsive width="200">
              <v-select
                v-model="search"
                :label="this.$vuetify.locale.t('$vuetify.global.search')"
                density="compact"
                variant="outlined"
                hide-details
                :items="filterItems"
                item-title="text"
                item-value="value"
                class="bg-surface"
                single-line
                clearable
              ></v-select>
            </v-responsive>
            <v-btn
              color="primary"
              variant="flat"
              class="h-auto"
              dark
              v-bind="props"
            >
              {{ this.$vuetify.locale.t("$vuetify.global.membership.add") }}
            </v-btn>
            
          </div>
        </template>
        <form @submit.prevent="save">
          <v-card>
            <v-card-title class="pa-0">
              <v-toolbar color="primary" :title="formTitle"></v-toolbar>
            </v-card-title>
            <v-card-text style="max-height: 50vh" class="pa-0">
              <v-container>
                <v-row class="mb-4">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      type="text"
                      v-model="editedItem.name"
                      :rules="validationRules.nameRules"
                      :label="$vuetify.locale.t('$vuetify.global.name.this')"
                      :placeholder="
                        $vuetify.locale.t('$vuetify.global.name.placeholder')
                      "
                      name="name"
                      density="compact"
                      variant="outlined"
                      clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field
                      type="text"
                      v-model="editedItem.price"
                      :rules="validationRules.priceRules"
                      :label="$vuetify.locale.t('$vuetify.global.price.this')"
                      :placeholder="
                        $vuetify.locale.t('$vuetify.global.price.placeholder')
                      "
                      name="price"
                      density="compact"
                      variant="outlined"
                      clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field
                      type="text"
                      v-model="editedItem.sku"
                      :rules="validationRules.skuRules"
                      :label="$vuetify.locale.t('$vuetify.global.sku.this')"
                      :placeholder="
                        $vuetify.locale.t('$vuetify.global.sku.placeholder')
                      "
                      name="sku"
                      density="compact"
                      variant="outlined"
                      clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-switch
                      v-model="editedItem.expiration"
                      color="primary"
                      :label="
                        $vuetify.locale.t(
                          '$vuetify.global.membership.expiration_period'
                        )
                      "
                    ></v-switch>
                  </v-col>
                  <v-col cols="3" v-if="editedItem.expiration">
                    <v-text-field
                      type="number"
                      v-model="editedItem.expired_time"
                      :rules="validationRules.expiredTimeRules"
                      :label="
                        $vuetify.locale.t(
                          '$vuetify.global.membership.time_per.this'
                        )
                      "
                      :placeholder="
                        $vuetify.locale.t(
                          '$vuetify.global.membership.time_per.placeholder'
                        )
                      "
                      name="expired_time"
                      density="compact"
                      variant="outlined"
                      min="1"
                      clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" v-if="editedItem.expiration">
                    <v-select
                      v-model="editedItem.expiration_type"
                      :rules="validationRules.expirationTypeRules"
                      :label="
                        $vuetify.locale.t(
                          '$vuetify.global.membership.time_per.type.this'
                        )
                      "
                      name="expiration_type"
                      density="compact"
                      variant="outlined"
                      :items="typesItems"
                      item-title="text"
                      item-value="value"
                      clearable
                    ></v-select>
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
              <v-btn
                color="primary"
                variant="flat"
                type="submit"
                :disabled="!validForm"
              >
                {{ $vuetify.locale.t("$vuetify.global.save") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-dialog>
      <v-dialog v-model="dialogDelete" width="fit-content">
        <v-card class="px-3 py-8 text-center rounded-lg">
          <v-card-title class="text-h5 mb-4">
            <p class="text-h5">
              {{
                `${
                  editItemStatus === "active"
                    ? $vuetify.locale.t("$vuetify.global.sure_want_to_deactivate")
                    : $vuetify.locale.t("$vuetify.global.sure_want_to_activate")
                } ${$vuetify.locale.t(
                  "$vuetify.global.this"
                )} ${$vuetify.locale.t("$vuetify.global.membership.this")}?`
              }}
            </p>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="closeDelete">
              {{ $vuetify.locale.t("$vuetify.global.close") }}
            </v-btn>
            <v-btn
              :color="editItemStatus === 'active' ? 'error' : 'success'"
              variant="flat"
              @click="deleteItemConfirm(editItemId, editItemStatus)"
            >
              {{ $vuetify.locale.t("$vuetify.global.confirm") }}
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-col>
    </v-row>
  </v-toolbar>
    <v-data-table-server
      v-model="selected"
      v-model:options="options"
      :headers="headers"
      :loading="this.$store.state.memberships.membershipsLoading"
      :items="memberships"
      :items-per-page="10"
      item-value="id"
      class="rounded-lg elevation-0"
      :search="search"
      :items-length="membershipsTotal"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getStatusColor(item.status)">
          {{
            item.status === "active"
              ? $vuetify.locale.t("$vuetify.global.active")
              : $vuetify.locale.t("$vuetify.global.inactive")
          }}
        </v-chip>
      </template>
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
          v-if="item.status === 'active'"
        ></v-btn>
        <v-btn
          icon="fa-solid fa-check-double"
          size="small"
          variant="text"
          color="success"
          @click="deleteItem(item)"
          v-else
        ></v-btn>
      </template>
      <template
        v-if="this.$store.state.memberships.membershipsDataSuccess == false"
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
            @click="loadMemberships"
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
        type: 'membership',
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        editItemId: null,
        editItemStatus: null,
        countryItems: [],
        cityItems: [],
        editedItem: {
        type: 'membership',
          name: null,
          price: null,
          sku: null,
          expiration: true,
          expired_time: null,
          expiration_type: "Days",
        },
        defaultItem: {
          name: null,
          price: null,
          sku: null,
          expiration: true,
          expired_time: null,
          expiration_type: "Days",
        },
        validInputs: {
          name: false,
          price: false,
          sku: false,
          expired_time: false,
          expiration_type: false,
        },
        validForm: false,
        memberships: [],
      }),
      computed: {
        pageCrumb() {
          return {
            icon: "fa-solid fa-users-between-lines",
            pageTitle: this.$vuetify.locale.t("$vuetify.global.membership.types"),
            items: [
              {
                title: this.$vuetify.locale.t("$vuetify.global.membership.types"),
                disabled: true,
              },
            ],
          };
        },
        typesItems() {
          return [
            {
              text: this.$vuetify.locale.t(
                "$vuetify.global.membership.time_per.type.items.days"
              ),
              value: "days",
            },
            {
              text: this.$vuetify.locale.t(
                "$vuetify.global.membership.time_per.type.items.weeks"
              ),
              value: "weeks",
            },
            {
              text: this.$vuetify.locale.t(
                "$vuetify.global.membership.time_per.type.items.months"
              ),
              value: "months",
            },
            {
              text: this.$vuetify.locale.t(
                "$vuetify.global.membership.time_per.type.items.years"
              ),
              value: "years",
            },
          ];
        },
        headers() {
          return [
            {
              title: this.$vuetify.locale.t("$vuetify.global.name.this"),
              key: "name",
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
              title: this.$vuetify.locale.t(
                "$vuetify.global.membership.time_period"
              ),
              key: "time_period",
            },
            {
              title: this.$vuetify.locale.t("$vuetify.global.actions"),
              align: "end",
              key: "actions",
              sortable: false,
              width: "150px",
            },
          ];
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
        getMemberships() {
          const memberships = this.$store.getters["memberships/memberships"].data;
          return memberships.filter((i) => {
            if (this.search !== "all") {
              return !this.search || i.status === this.search;
            } else {
              return !this.search || i.status !== this.search;
            }
          });
        },
        membershipsTotal() {
          const memberships =
            this.$store.getters["memberships/memberships"].total;
          return parseInt(memberships);
        },
        formTitle() {
          return this.editedIndex === -1
            ? this.$vuetify.locale.t("$vuetify.global.membership.add")
            : this.$vuetify.locale.t("$vuetify.global.membership.edit");
        },
        validationRules() {
          return {
            nameRules: [
              (value) => {
                if (value) {
                  this.validInputs.name = true;
                  return true;
                }
                this.validInputs.name = false;
                return this.$vuetify.locale.t("$vuetify.global.name.validation");
              },
            ],
  
            priceRules: [
              (value) => {
                if (value) {
                  this.validInputs.price = true;
                  return true;
                }
                this.validInputs.price = false;
                return this.$vuetify.locale.t("$vuetify.global.price.validation");
              },
            ],
            skuRules: [
              (value) => {
                if (value) {
                  this.validInputs.sku = true;
                  return true;
                }
                this.validInputs.sku = false;
                return this.$vuetify.locale.t("$vuetify.global.sku.validation");
              },
            ],
            expiredTimeRules: [
              (value) => {
                if (value) {
                  this.validInputs.expired_time = true;
                  return true;
                }
                this.validInputs.expired_time = false;
                return this.$vuetify.locale.t(
                  "$vuetify.global.membership.time_per.validation"
                );
              },
            ],
            expirationTypeRules: [
              (value) => {
                if (value) {
                  this.validInputs.expiration_type = true;
                  return true;
                }
                this.validInputs.expiration_type = false;
                return this.$vuetify.locale.t(
                  "$vuetify.global.membership.time_per.type.validation"
                );
              },
            ],
          };
        },
      },
      methods: {
        loadMemberships() {
          this.$store.dispatch("memberships/fetchMemberships", {
            type: this.type,
            report: this.report ? this.report : null,
            per_page: this.options.per_page,
            page: this.options.page,
          });
        },
        getStatusColor(status) {
          if (status === "active") {
            return "success";
          } else {
            return "error";
          }
        },
  
        editItem(item) {
          const membershipId = item.id;
          this.editedIndex = this.memberships.indexOf(item);
          this.dialog = true;
          axios({
            method: "get",
            url: `membership/show/${membershipId}`,
          }).then((res) => {
            const dataObj = res.data.data;
            this.editedItem = Object.assign({}, dataObj);
            this.editItemId = item.id;
          });
        },
        formCheck() {
          if (Object.values(this.validInputs).every((value) => !!value)) {
            this.validForm = true;
          } else {
            this.validForm = false;
          }
        },
        deleteItem(item) {
          this.editedIndex = this.memberships.indexOf(item);
          this.editedItem = Object.assign({}, item);
          this.dialogDelete = true;
          this.editItemId = item.id;
          this.editItemStatus = item.status;
          console.log(item);
        },
        deleteItemConfirm(id, status) {
          const itmeStatus = status === "active" ? "inactive" : "active";
          axios({
            url: `membership/destroy/${id}`,
            method: "post",
            data: { status: itmeStatus },
          }).then((response) => {
            if (response.status) {
              this.memberships.splice(this.editedIndex, 1);
              this.closeDelete();
              this.loadMemberships();
            }
          });
        },
        close() {
          this.dialog = false;
          this.$nextTick(() => {
            Object.fromEntries(
              Object.keys(this.validInputs).map((key) => [key, false])
            );
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
              url: `membership/update/${this.editItemId}`,
              method: "POST",
              data: this.editedItem,
            })
              .then((res) => {
                if (res.status) {
                  Object.assign(
                    this.memberships[this.editedIndex],
                    this.editedItem
                  );
                  this.loadMemberships();
                }
              })
              .then(() => {
                this.close();
              });
          } else {
            axios({
              url: `membership/store`,
              method: "POST",
              data: this.editedItem,
            })
              .then((res) => {
                if (res.status) {
                  this.memberships.unshift(this.editedItem);
                  this.loadMemberships();
                }
              })
              .then(() => {
                this.close();
              });
          }
        },
      },
      watch: {
        getMemberships(newVal) {
          this.memberships = newVal;
        },
        options(value) {
          const { itemsPerPage, page } = value;
          this.$store.dispatch("memberships/fetchMemberships", {
            type: this.type,
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
        validInputs: {
          handler: function () {
            this.formCheck();
          },
          deep: true,
        },
        "editedItem.expiration": {
          handler: function (newVal) {
            if (!newVal) {
              this.editedItem.expired_time = null;
              this.editedItem.expiration_type = null;
              this.validInputs.expired_time = true;
              this.validInputs.expiration_type = true;
            }
            this.formCheck();
          },
          deep: true,
        },
        report() {
          this.loadMemberships();
        },
      },
      mounted() {
        this.loadMemberships();
      },
    };
  </script>
  