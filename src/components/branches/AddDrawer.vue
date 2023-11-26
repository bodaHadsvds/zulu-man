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
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.name"
                  :rules="rules.name"
                  :label="$vuetify.locale.t('$vuetify.global.name.this')"
                  :placeholder="
                    $vuetify.locale.t('$vuetify.global.name.placeholder')
                  "
                  type="text"
                  name="name"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.location"
                  :rules="rules.location"
                  :label="$vuetify.locale.t('$vuetify.global.location.this')"
                  :placeholder="
                    $vuetify.locale.t('$vuetify.global.location.placeholder')
                  "
                  type="text"
                  name="location"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
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
      editedItem: {
        name: null,
        location: null,
        phone: null,
      },
      defaultItem: {
        name: null,
        location: null,
        phone: null,
      },
      validIputs: {
        name: false,
        location: false,
        phone: false,
      },
    }),
    computed: {
      formTitle() {
        return this.editedIndex === -1
          ? this.$vuetify.locale.t("$vuetify.global.branch.add")
          : this.$vuetify.locale.t("$vuetify.global.branch.edit");
      },
      rules() {
        return {
          name: [
            (value) => {
              if (value) {
                this.validIputs.name = true;
                return true;
              }
              this.validIputs.name = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.name.validation"
              );
            },
          ],
          location: [
            (value) => {
              if (value) {
                this.validIputs.location = true;
                return true;
              }
              this.validIputs.location = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.location.validation"
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
          url: `branch/store`,
          method: "POST",
          data: {
            name: this.editedItem.name,
            location: this.editedItem.location,
            phone: this.editedItem.phone,
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
  };
</script>
