<template>
  <form @submit.prevent="save">
    <v-navigation-drawer
      v-model="drawer"
      location="end"
      floating
      sticky
      temporary
      width="600"
      scrollable
    >
      <v-card class="h-100 d-flex flex-column rounded-0">
        <v-card-title class="pa-0">
          <v-toolbar color="backgorund" class="" :title="formTitle">
            <v-btn
              variant="text"
              icon="fa-solid fa-x"
              @click="close"
              size="small"
            ></v-btn>
          </v-toolbar>
        </v-card-title>
        <v-card-text class="flex-fill overflow-auto py-8 px-4">
          <v-sheet>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.first_name"
                  :rules="rules.firstName"
                  :label="$vuetify.locale.t('$vuetify.global.first_name.this')"
                  :placeholder="
                    $vuetify.locale.t('$vuetify.global.first_name.placeholder')
                  "
                  type="text"
                  name="first_name"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.last_name"
                  :rules="rules.lastName"
                  :label="$vuetify.locale.t('$vuetify.global.last_name.this')"
                  :placeholder="
                    $vuetify.locale.t('$vuetify.global.last_name.placeholder')
                  "
                  type="text"
                  name="last_name"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.email"
                  :rules="rules.email"
                  :label="$vuetify.locale.t('$vuetify.global.email.this')"
                  :placeholder="
                    $vuetify.locale.t('$vuetify.global.email.placeholder')
                  "
                  type="email"
                  name="email"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="editedItem.phone"
                  :rules="rules.phone"
                  :label="$vuetify.locale.t('$vuetify.global.phone.this')"
                  :placeholder="
                    $vuetify.locale.t('$vuetify.global.phone.placeholder')
                  "
                  type="tel"
                  name="phone"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-radio-group
                  inline
                  :label="$vuetify.locale.t('$vuetify.global.gender.this')"
                  v-model="editedItem.gender"
                  hide-details
                >
                  <v-radio
                    :label="$vuetify.locale.t('$vuetify.global.gender.male')"
                    value="0"
                    class="me-3"
                    color="primary"
                  ></v-radio>
                  <v-radio
                    :label="$vuetify.locale.t('$vuetify.global.gender.female')"
                    value="1"
                    class="me-3"
                    color="primary"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="editedItem.status"
                  :rules="rules.status"
                  :label="
                    $vuetify.locale.t('$vuetify.global.lead.types.status.this')
                  "
                  :placeholder="
                    $vuetify.locale.t(
                      '$vuetify.global.lead.types.status.placeholder'
                    )
                  "
                  item-value="id"
                  item-title="text"
                  :items="statusItems"
                  name="status"
                  density="compact"
                  variant="outlined"
                  :loading="this.$store.state.leadsSettings.statusLoading"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="editedItem.source"
                  :rules="rules.source"
                  :label="
                    $vuetify.locale.t('$vuetify.global.lead.types.source.this')
                  "
                  :placeholder="
                    $vuetify.locale.t(
                      '$vuetify.global.lead.types.source.placeholder'
                    )
                  "
                  item-value="id"
                  item-title="text"
                  :items="sourcesItems"
                  name="source"
                  density="compact"
                  variant="outlined"
                  :loading="this.$store.state.leadsSettings.sourceLoading"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="editedItem.assignee"
                  :rules="rules.assignee"
                  :label="
                    $vuetify.locale.t(
                      '$vuetify.global.lead.table.assignee.this'
                    )
                  "
                  :placeholder="
                    $vuetify.locale.t(
                      '$vuetify.global.lead.table.assignee.placeholder'
                    )
                  "
                  item-value="id"
                  item-title="text"
                  :items="assigneesItems"
                  name="assignee"
                  density="compact"
                  variant="outlined"
                  :loading="this.$store.state.staff.loading"
                >
                  <!-- <template v-slot:selection="{ props, item }">
                            <v-chip
                              v-bind="props"
                              prepend-avatar="@/assets/logo.svg"
                              :text="item.raw.text"
                              style="background-color: none"
                            ></v-chip>
                          </template>
                          <template v-slot:item="{ props, item }">
                            <v-list-item
                              v-bind="props"
                              prepend-avatar="@/assets/logo.svg"
                              :text="item.raw.text"
                            ></v-list-item>
                          </template> -->
                </v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="editedItem.city"
                  :rules="rules.city"
                  :label="$vuetify.locale.t('$vuetify.global.city.this')"
                  :placeholder="
                    $vuetify.locale.t('$vuetify.global.city.placeholder')
                  "
                  item-value="id"
                  item-title="text"
                  :items="cityItems"
                  name="city"
                  density="compact"
                  variant="outlined"
                  :loading="this.$store.state.leadsSettings.loading"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.street"
                  :label="$vuetify.locale.t('$vuetify.global.street.this')"
                  :placeholder="
                    $vuetify.locale.t('$vuetify.global.street.placeholder')
                  "
                  type="text"
                  name="street"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="px-2 py-3">
          <v-btn
            variant="text"
            color="error"
            type="button"
            @click="deleteItem"
            v-if="editedIndex > -1"
          >
            {{ $vuetify.locale.t("$vuetify.global.delete") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="text-none text-subtitle-1 me-3"
            type="button"
            @click="close"
          >
            {{ $vuetify.locale.t("$vuetify.global.close") }}
          </v-btn>
          <v-btn
            class="text-none text-subtitle-1"
            color="primary"
            variant="flat"
            type="submit"
            :disabled="!validForm"
          >
            {{ $vuetify.locale.t("$vuetify.global.done") }}
          </v-btn>
          <!-- <v-btn
              color="primary"
              variant="flat"
              type="submit"
              :disabled="!validStep"
            >
              Save
            </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </form>
</template>

<script>
  export default {
    props: ["drawerStatus"],
    data: () => ({
      drawer: false,
      validForm: false,
      editedIndex: -1,
      assigneesItems: [],
      statusItems: [],
      sourcesItems: [],
      cityItems: [],
      editedItem: {
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        gender: "0",
        assignee: null,
        status: null,
        source: null,
        city: null,
        street: null,
      },
      defaultItem: {
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        gender: "0",
        assignee: null,
        status: null,
        source: null,
        city: null,
        street: null,
      },
      validIputs: {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        assignee: false,
        status: false,
        source: false,
        city: false,
      },
    }),
    computed: {
      formTitle() {
        return this.editedIndex === -1
          ? this.$vuetify.locale.t("$vuetify.global.lead.add")
          : this.$vuetify.locale.t("$vuetify.global.lead.edit");
      },
      rules() {
        return {
          firstName: [
            (value) => {
              if (value) {
                this.validIputs.firstName = true;
                return true;
              }
              this.validIputs.firstName = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.first_name.validation"
              );
            },
          ],
          lastName: [
            (value) => {
              if (value) {
                this.validIputs.lastName = true;
                return true;
              }
              this.validIputs.lastName = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.last_name.validation"
              );
            },
          ],
          email: [
            (value) => {
              if (value) {
                this.validIputs.email = true;
                return true;
              }
              this.validIputs.email = false;
              return this.$vuetify.locale.t("$vuetify.global.email.validation");
            },
            // () => {
            //   if (!this.emailExist) {
            //     this.validIputs.email = true;
            //     return true;
            //   }
            //   this.validIputs.email = false;
            //   return this.$vuetify.locale.t(
            //     "$vuetify.global.email.exist_validation"
            //   );
            // },
            (value) => {
              if (/.+@.+\..+/.test(value)) {
                this.validIputs.email = true;
                return true;
              }
              this.validIputs.email = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.email.exp_validation"
              );
            },
          ],
          phone: [
            (value) => {
              if (value) {
                this.validIputs.phone = true;
                return true;
              }
              this.validIputs.phone = false;
              return this.$vuetify.locale.t("$vuetify.global.phone.validation");
            },
          ],
          assignee: [
            (value) => {
              if (value) {
                this.validIputs.assignee = true;
                return true;
              }
              this.validIputs.assignee = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.lead.table.assignee.validation"
              );
            },
          ],
          status: [
            (value) => {
              if (value) {
                this.validIputs.status = true;
                return true;
              }
              this.validIputs.status = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.lead.types.status.validation"
              );
            },
          ],
          source: [
            (value) => {
              if (value) {
                this.validIputs.source = true;
                return true;
              }
              this.validIputs.source = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.lead.types.source.validation"
              );
            },
          ],
          city: [
            (value) => {
              if (value) {
                this.validIputs.city = true;
                return true;
              }
              this.validIputs.city = false;
              return this.$vuetify.locale.t("$vuetify.global.city.validation");
            },
          ],
        };
      },
    },
    methods: {
      // handleEmailExistance(val) {
      //   this.emailLoading = true;
      //   this.axios({
      //     url: "user/check_email",
      //     method: "post",
      //     data: {
      //       email: val,
      //     },
      //   })
      //     .then((res) => {
      //       if (!res.data.exist) {
      //         this.emailExist = false;
      //       } else {
      //         this.emailExist = true;
      //       }
      //     })
      //     .then(() => {
      //       this.emailLoading = false;
      //     });
      // },
      save() {
        this.axios({
          url: `lead/store`,
          method: "POST",
          data: {
            first_name: this.editedItem.first_name,
            last_name: this.editedItem.last_name,
            gender: this.editedItem.gender,
            phone: this.editedItem.phone,
            email: this.editedItem.email,
            status: this.editedItem.status,
            source: this.editedItem.source,
            staff_id: this.editedItem.assignee,
            city_id: this.editedItem.city,
            street: this.editedItem.street,
          },
        })
          .then((res) => {
            if (res.status) {
              this.$emit("refresh");
            }
          })
          .then(() => {
            this.close();
          });
      },
      close() {
        this.$emit("close");
        this.editedItem = Object.assign({}, this.defaultItem);
      },
      formCheck() {
        if (Object.values(this.validIputs).every((value) => !!value)) {
          this.validForm = true;
        } else {
          this.validForm = false;
        }
      },
    },
    watch: {
      drawerStatus(newVal) {
        this.drawer = newVal;
      },
      // email(newVal) {
      //   this.handleEmailExistance(newVal);
      // },
      validIputs: {
        handler: function () {
          this.formCheck();
        },
        deep: true,
      },
    },
    created() {
      this.drawer = this.drawerStatus;
      this.$nextTick(() => {
        this.$store.dispatch("staff/fetchStaff", {
          per_page: -1,
          page: 1,
        });
        this.$store.dispatch("leadsSettings/fetchLeads", {
          type: "status",
          per_page: -1,
          page: 1,
        });
        this.$store.dispatch("leadsSettings/fetchLeads", {
          type: "source",
          per_page: -1,
          page: 1,
        });
        this.axios({
          method: "get",
          url: `country/show/1`,
        })
          .then((response) => {
            this.cityItems = [];
            let items = response.data.data.city;
            for (const item of items) {
              this.cityItems.push({ text: item.name_en, id: item.id });
            }
          })
          .then(() => {
            this.cityLoading = false;
          });
      });
    },
    updated() {
      this.assigneesItems = [];
      this.statusItems = [];
      this.sourcesItems = [];
      for (const item of this.$store.getters["staff/staff"].data) {
        this.assigneesItems.push({
          id: item.id,
          text: `${item.first_name} ${item.last_name}`,
        });
      }
      for (const item of this.$store.getters["leadsSettings/leadsStatus"]
        .data) {
        this.statusItems.push({
          id: item.id,
          text: item.name,
        });
      }
      for (const item of this.$store.getters["leadsSettings/leadsSources"]
        .data) {
        this.sourcesItems.push({
          id: item.id,
          text: item.name,
        });
      }
    },
  };
</script>
