<template>
  <v-toolbar class="bg-background px-0 py-4 pt-0">
    <v-row>
      <v-col cols="6" class="d-flex align-center justify-start">
        <h2>
          {{ $vuetify.locale.t("$vuetify.nav_drawer.settings.staff_members") }}
        </h2>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-end">
        <div class="d-flex align-stretch flex-wrap" style="gap: 10px">
          <v-dialog v-model="dialog" class="main-dialog" max-width="1024" scrollable>
      <template v-slot:activator="{ props }">
        <div class="d-flex align-stretch flex-wrap" style="gap: 10px">
          <v-btn
            color="primary"
            variant="flat"
            class="h-auto"
            dark
            v-bind="props"
            >{{ $vuetify.locale.t("$vuetify.global.staff_member.new") }}</v-btn
          >
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
              class="bg-surface"
              single-line
              clearable
            ></v-select>
          </v-responsive>
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
                <v-col cols="12" sm="3">
                  <v-text-field
                    type="text"
                    v-model="editedItem.first_name"
                    :rules="validationRules.firstNameRules"
                    :label="
                      $vuetify.locale.t('$vuetify.global.first_name.this')
                    "
                    :placeholder="
                      $vuetify.locale.t(
                        '$vuetify.global.first_name.placeholder'
                      )
                    "
                    name="first_name"
                    density="compact"
                    variant="outlined"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    type="text"
                    v-model="editedItem.last_name"
                    :rules="validationRules.lastNameRules"
                    :label="$vuetify.locale.t('$vuetify.global.last_name.this')"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.last_name.placeholder')
                    "
                    name="last_name"
                    density="compact"
                    variant="outlined"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    type="email"
                    v-model="editedItem.email"
                    :rules="validationRules.emailRules"
                    :label="$vuetify.locale.t('$vuetify.global.email.this')"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.email.placeholder')
                    "
                    name="email"
                    density="compact"
                    variant="outlined"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    type="tel"
                    v-model="editedItem.phone_number"
                    :rules="validationRules.phoneNumberRules"
                    :label="$vuetify.locale.t('$vuetify.global.phone.this')"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.phone.placeholder')
                    "
                    name="phone_number"
                    density="compact"
                    variant="outlined"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    type="date"
                    v-model="editedItem.birthdate"
                    :rules="validationRules.birthdateRules"
                    :label="$vuetify.locale.t('$vuetify.global.birthdate.this')"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.birthdate.placeholder')
                    "
                    name="birthdate"
                    density="compact"
                    variant="outlined"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-select
                    v-model="editedItem.gender"
                    :rules="validationRules.genderRules"
                    :label="$vuetify.locale.t('$vuetify.global.gender.this')"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.gender.placeholder')
                    "
                    name="gender"
                    density="compact"
                    variant="outlined"
                    :items="genderItems"
                    item-title="text"
                    item-value="value"
                    clearable
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    type="number"
                    v-model="editedItem.id_number"
                    :rules="validationRules.idNumberRules"
                    :label="$vuetify.locale.t('$vuetify.global.id_num.this')"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.id_num.placeholder')
                    "
                    name="id_number"
                    density="compact"
                    variant="outlined"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    type="number"
                    v-model="editedItem.employee_id"
                    :rules="validationRules.employeeIdRules"
                    :label="
                      $vuetify.locale.t('$vuetify.global.employee_id.this')
                    "
                    :placeholder="
                      $vuetify.locale.t(
                        '$vuetify.global.employee_id.placeholder'
                      )
                    "
                    name="employee_id"
                    density="compact"
                    variant="outlined"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select
                    v-model="editedItem.country_id"
                    :rules="validationRules.countryRules"
                    :label="$vuetify.locale.t('$vuetify.global.country.this')"
                    name="country_id"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.country.placeholder')
                    "
                    :items="countryItems"
                    item-title="text"
                    item-value="value"
                    density="compact"
                    variant="outlined"
                    clearable
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select
                    v-model="editedItem.city_id"
                    :rules="validationRules.cityRules"
                    :label="$vuetify.locale.t('$vuetify.global.city.this')"
                    name="city"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.city.placeholder')
                    "
                    :items="cityItems"
                    item-title="text"
                    item-value="value"
                    density="compact"
                    variant="outlined"
                    :disabled="!editedItem.country_id"
                    :loading="editedItem.cityLoading"
                    clearable
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="editedItem.state"
                    :label="$vuetify.locale.t('$vuetify.global.state.this')"
                    type="text"
                    name="state"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.state.placeholder')
                    "
                    density="compact"
                    variant="outlined"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="editedItem.street"
                    :rules="validationRules.streetRules"
                    :label="$vuetify.locale.t('$vuetify.global.street.this')"
                    type="text"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.street.placeholder')
                    "
                    name="street"
                    density="compact"
                    variant="outlined"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="editedItem.post_code"
                    :label="$vuetify.locale.t('$vuetify.global.post_code.this')"
                    type="text"
                    name="post_code"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.post_code.placeholder')
                    "
                    density="compact"
                    variant="outlined"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-switch
                    v-model="editedItem.status"
                    true-value="active"
                    false-value="inactive"
                    :label="`${$vuetify.locale.t(
                      '$vuetify.global.staff_member.status'
                    )}: ${editedItem.status}`"
                    color="primary"
                    name="status"
                    clearable
                  ></v-switch>
                </v-col>
              </v-row>
              <v-divider
                :thickness="2"
                class="border-opacity-100"
                color="primary"
              ></v-divider>
              <!-- <ul style="list-style: none">
                <li v-for="role in staffRoles" :key="role.id">
                  <v-card>
                    <v-checkbox
                      v-model="editedItem.role"
                      :label="role.name"
                      :value="role.id"
                      hide-details
                      style="height: fit-content !important"
                    ></v-checkbox>
                  </v-card>
                </li>
              </ul> -->
              <v-list lines="three" select-strategy="classic">
                <v-list-subheader>{{
                  $vuetify.locale.t("$vuetify.global.staff_member.roles")
                }}</v-list-subheader>
                <v-list-item
                  v-for="item in staffRoles"
                  :key="item.id"
                  :title="item.name"
                  :subtitle="item.description"
                  class="align-start"
                >
                  <template v-slot:prepend>
                    <v-checkbox
                      v-model="editedItem.role_id"
                      :value="item.id"
                      hide-details
                      class="pt-0"
                    ></v-checkbox>
                  </template>
                </v-list-item>
              </v-list>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="px-2 py-3">
            <v-spacer></v-spacer>
            <v-btn variant="text" type="button" @click="close">{{
              $vuetify.locale.t("$vuetify.global.close")
            }}</v-btn>
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
              $vuetify.locale.t("$vuetify.global.sure_delete") +
              " " +
              $vuetify.locale.t("$vuetify.global.staff_member.this")
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
        </div>
        
        
      </v-col>
    </v-row>
  </v-toolbar>
  <v-data-table-server
    v-model="selected"
    v-model:options="options"
    :headers="headers"
    :loading="this.$store.state.staff.loading"
    :items="staffMembers"
    item-value="id"
    class="elevation-3"
    :search="search"
    :items-length="staffTotal"
    @click:row="handleStaffLink"
  >
    <template v-slot:[`item.gender`]="{ item }">
      <span
        class="d-flex align-center justify-center bg-grey-lighten-5 rounded-xl py-1 px-3"
        :style="
          item.gender == 0
            ? 'color:#1999e3 !important'
            : 'color:#d5169a !important'
        "
        style="gap: 10px"
      >
        {{
          item.gender == 0
            ? $vuetify.locale.t("$vuetify.global.gender.male")
            : $vuetify.locale.t("$vuetify.global.gender.female")
        }}
      </span>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip :color="getStatusColor(item.status)">
        {{ item.status }}
      </v-chip>
    </template>
    <template v-slot:[`item.roles`]="{ item }">
      <p class="text-truncate" style="max-width: 200px">
        {{ item.roles }}
      </p>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        icon="fa-solid fa-pen"
        size="small"
        variant="text"
        color="primary"
        class="me-2"
        @click.stop="editItem(item)"
      >
      </v-btn>
      <v-btn
        icon="fa-solid fa-trash"
        size="small"
        variant="text"
        color="error"
        @click.stop="deleteItem(item)"
      ></v-btn>
    </template>
    <template
      v-if="this.$store.state.staff.dataSuccess == false"
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
          @click="loadStaff"
        >
          {{ $vuetify.locale.t("$vuetify.global.fetch_date.retry") }}
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
  import router from "@/router";
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
      countryItems: [],
      cityItems: [],
      editedItem: {
        first_name: null,
        last_name: null,
        gender: null,
        email: null,
        emailExist: false,
        emailLoading: false,
        role_id: [],
        status: "active",
        phone_number: null,
        id_number: null,
        idNumberExist: false,
        idNumberLoading: false,
        employee_id: null,
        employeeIdExist: false,
        employeeIdLoading: false,
        country_id: null,
        city_id: null,
        cityLoading: false,
        state: null,
        street: null,
        post_code: null,
      },
      defaultItem: {
        first_name: null,
        last_name: null,
        gender: null,
        email: null,
        emailExist: false,
        emailLoading: false,
        role_id: [],
        status: "active",
        phone_number: null,
        id_number: null,
        idNumberExist: false,
        idNumberLoading: false,
        employee_id: null,
        employeeIdExist: false,
        employeeIdLoading: false,
        country_id: null,
        city_id: null,
        cityLoading: false,
        state: null,
        street: null,
        post_code: null,
      },

      validInputs: {
        first_name: false,
        last_name: false,
        email: false,
        phone_number: false,
        id_number: false,
        employee_id: false,
        birthdate: false,
        gender: false,
        street: false,
        city: false,
        country: false,
      },

      validForm: false,

      staffMembers: [],
    }),
    computed: {
      pageCrumb() {
        return {
          icon: "fa-solid fa-users-between-lines",
          pageTitle: this.$vuetify.locale.t(
            "$vuetify.nav_drawer.settings.staff_members"
          ),
          items: [
            {
              title: this.$vuetify.locale.t(
                "$vuetify.nav_drawer.settings.staff_members"
              ),
              disabled: true,
              href: "/staff-members",
            },
          ],
        };
      },
      headers() {
        return [
          {
            title: this.$vuetify.locale.t("$vuetify.global.first_name.this"),
            key: "first_name",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.last_name.this"),
            key: "last_name",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.gender.this"),
            key: "gender",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.email.this"),
            key: "email",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.status"),
            key: "status",
          },
          {
            title: this.$vuetify.locale.t(
              "$vuetify.global.staff_member.permissions"
            ),
            key: "roles",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.created_on"),
            key: "created_at",
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
      getStaff() {
        const staff = this.$store.getters["staff/staff"].data;
        return staff.filter((i) => {
          if (this.search !== "all") {
            return !this.search || i.status === this.search;
          } else {
            return !this.search || i.status !== this.search;
          }
        });
      },
      genderItems() {
        return [
          {
            text: this.$vuetify.locale.t("$vuetify.global.gender.male"),
            value: 0,
          },
          {
            text: this.$vuetify.locale.t("$vuetify.global.gender.female"),
            value: 1,
          },
        ];
      },
      staffRoles() {
        const roles = this.$store.getters["staff/roles"];
        return roles;
      },
      staffTotal() {
        const staffMembers = this.$store.getters["staff/staff"].total;
        return parseInt(staffMembers);
      },
      formTitle() {
        return this.editedIndex === -1
          ? this.$vuetify.locale.t("$vuetify.global.staff_member.new")
          : this.$vuetify.locale.t("$vuetify.global.staff_member.edit");
      },
      validationRules() {
        return {
          firstNameRules: [
            (value) => {
              if (value) {
                this.validInputs.first_name = true;
                return true;
              }
              this.validInputs.first_name = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.first_name.validation"
              );
            },
          ],
          lastNameRules: [
            (value) => {
              if (value) {
                this.validInputs.last_name = true;
                return true;
              }
              this.validInputs.last_name = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.last_name.validation"
              );
            },
          ],
          emailRules: [
            (value) => {
              if (value) {
                this.validInputs.email = true;
                return true;
              }
              this.validInputs.email = false;
              return this.$vuetify.locale.t("$vuetify.global.email.validation");
            },
            () => {
              if (!this.editedItem.emailExist) {
                this.validInputs.email = true;
                return true;
              }
              this.validInputs.email = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.email.exist_validation"
              );
            },
            (value) => {
              if (/.+@.+\..+/.test(value)) {
                this.validInputs.email = true;
                return true;
              }
              this.validInputs.email = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.email.exp_validation"
              );
            },
          ],
          phoneNumberRules: [
            (value) => {
              if (value) {
                this.validInputs.phone_number = true;
                return true;
              }
              this.validInputs.phone_number = false;
              return this.$vuetify.locale.t("$vuetify.global.phone.validation");
            },
          ],
          idNumberRules: [
            (value) => {
              if (value) {
                this.validInputs.id_number = true;
                return true;
              }
              this.validInputs.id_number = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.id_num.validation"
              );
            },
            () => {
              if (!this.editedItem.idNumberExist) {
                this.validInputs.id_number = true;
                return true;
              }
              this.validInputs.id_number = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.id_num.exist_validation"
              );
            },
          ],
          employeeIdRules: [
            (value) => {
              if (value) {
                this.validInputs.employee_id = true;
                return true;
              }
              this.validInputs.employee_id = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.employee_id.validation"
              );
            },
            () => {
              if (!this.editedItem.employeeIdExist) {
                this.validInputs.employee_id = true;
                return true;
              }
              this.validInputs.employee_id = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.employee_id.exist_validation"
              );
            },
          ],
          birthdateRules: [
            (value) => {
              if (value) {
                this.validInputs.birthdate = true;
                return true;
              }
              this.validInputs.birthdate = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.birthdate.validation"
              );
            },
          ],
          genderRules: [
            (value) => {
              if (value != null || value != undefined) {
                this.validInputs.gender = true;
                return true;
              }
              this.validInputs.gender = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.gender.validation"
              );
            },
          ],
          streetRules: [
            (value) => {
              if (value) {
                this.validInputs.street = true;
                return true;
              }
              this.validInputs.street = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.street.validation"
              );
            },
          ],
          cityRules: [
            (value) => {
              if (value) {
                this.validInputs.city = true;
                return true;
              }
              this.validInputs.city = false;
              return this.$vuetify.locale.t("$vuetify.global.city.validation");
            },
          ],
          countryRules: [
            (value) => {
              if (value) {
                this.validInputs.country = true;
                return true;
              }
              this.validInputs.country = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.country.validation"
              );
            },
          ],
        };
      },
    },
    methods: {
      loadStaff() {
        this.$store.dispatch("staff/fetchStaff", {
          per_page: this.options.per_page,
          page: this.options.page,
        });
      },
      getStatusColor(status) {
        if (status === this.$vuetify.locale.t("$vuetify.global.active")) {
          return "success";
        } else {
          return "error";
        }
      },
      handleEmailExistance(val) {
        this.editedItem.emailLoading = true;
        axios({
          url: "staff/check_email",
          method: "post",
          data: {
            email: val,
          },
        })
          .then((res) => {
            if (!res.data.exist) {
              this.editedItem.emailExist = false;
            } else {
              this.editedItem.emailExist = true;
            }
          })
          .then(() => {
            this.editedItem.emailLoading = false;
          });
      },
      handleIdNumberExistance(val) {
        this.editedItem.idNumberLoading = true;
        axios({
          url: "staff/check_id_number",
          method: "post",
          data: {
            id_number: val,
          },
        })
          .then((res) => {
            if (!res.data.exist) {
              this.editedItem.idNumberExist = false;
            } else {
              this.editedItem.idNumberExist = true;
            }
          })
          .then(() => {
            this.editedItem.idNumberLoading = false;
          });
      },
      handleEmployeeIdExistance(val) {
        this.editedItem.employeeIdLoading = true;
        axios({
          url: "staff/check_employee_id",
          method: "post",
          data: {
            employee_id: val,
          },
        })
          .then((res) => {
            if (!res.data.exist) {
              this.editedItem.employeeIdExist = false;
            } else {
              this.editedItem.employeeIdExist = true;
            }
          })
          .then(() => {
            this.editedItem.employeeIdLoading = false;
          });
      },
      handleCountries() {
        axios({
          method: "get",
          url: "countries",
        }).then((response) => {
          const items = response.data.data;
          this.countryItems = [];
          for (const item of items) {
            this.countryItems.push({
              text: item.name_en,
              value: item.id,
            });
          }
        });
      },
      loadRoles() {
        this.$store.dispatch("staff/fetchRoles");
      },
      editItem(item) {
        console.log(item);
        const memberId = item.id;
        this.editedIndex = this.staffMembers.indexOf(item);
        this.dialog = true;
        axios({
          method: "get",
          url: `staff/show/${memberId}`,
        }).then((res) => {
          const dataObj = res.data.data;
          this.editedItem = Object.assign({}, dataObj);
          this.editedItem.role_id = res.data.role_id;
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
        this.editedIndex = this.staffMembers.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
        this.editItemId = item.id;
      },
      deleteItemConfirm(id) {
        axios({
          url: `staff/destroy/${id}`,
          method: "delete",
        }).then((response) => {
          if (response.status) {
            this.staffMembers.splice(this.editedIndex, 1);
            this.closeDelete();
            this.loadStaff();
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
            url: `staff/update/${this.editItemId}`,
            method: "POST",
            data: this.editedItem,
          })
            .then((res) => {
              if (res.status) {
                console.log(res);
                Object.assign(
                  this.staffMembers[this.editedIndex],
                  this.editedItem
                );
                this.loadStaff();
              }
            })
            .then(() => {
              this.close();
            });
        } else {
          axios({
            url: `staff/store`,
            method: "POST",
            data: this.editedItem,
          })
            .then((res) => {
              if (res.status) {
                this.staffMembers.unshift(this.editedItem);
                this.loadStaff();
              }
            })
            .then(() => {
              this.close();
            });
        }
      },
      handleStaffLink(_, item) {
        router.push({ name: "StaffProfile", params: { id: item.item.id } });
      },
    },
    watch: {
      "editedItem.email": {
        handler: function (newVal) {
          this.handleEmailExistance(newVal);
        },
        deep: true,
      },
      "editedItem.employee_id": {
        handler: function (newVal) {
          this.handleEmployeeIdExistance(newVal);
        },
        deep: true,
      },
      "editedItem.id_number": {
        handler: function (newVal) {
          this.handleIdNumberExistance(newVal);
        },
        deep: true,
      },
      "editedItem.country_id": {
        handler: function (newVal) {
          this.editedItem.cityLoading = true;
          if (newVal) {
            this.cityItems = [];
            this.editedItem.city_id = null;
            axios({
              method: "get",
              url: `country/show/${newVal}`,
            })
              .then((response) => {
                let items = response.data.data.city;
                for (const item of items) {
                  this.cityItems.push({ text: item.name_en, value: item.id });
                }
              })
              .then(() => {
                this.editedItem.cityLoading = false;
              });
          } else {
            this.editedItem.city_id = null;
            this.editedItem.cityLoading = false;
          }
        },
        deep: true,
      },
      getStaff(newVal) {
        this.staffMembers = newVal;
      },
      options(value) {
        const { itemsPerPage, page } = value;
        this.$store.dispatch("staff/fetchStaff", {
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
    },
    mounted() {
      this.loadStaff();
      this.handleCountries();
      this.loadRoles();
    },
  };
</script>
