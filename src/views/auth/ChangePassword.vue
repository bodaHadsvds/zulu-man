<template>
  <the-page-head :items="pageCrumb" />
  <v-sheet color="surface" class="px-0 py-8 elevation-0 rounded" border="sm">
    <v-container fluid>
      <form @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="oldPassword"
              :append-inner-icon="
                oldVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
              "
              :type="oldVisible ? 'text' : 'password'"
              density="compact"
              :label="$vuetify.locale.t('$vuetify.global.old_password.this')"
              :placeholder="
                $vuetify.locale.t('$vuetify.global.old_password.placeholder')
              "
              :rules="rules.oldPassword"
              prepend-inner-icon="fa-solid fa-lock"
              variant="outlined"
              @click:append-inner="oldVisible = !oldVisible"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="newPassword"
              :append-inner-icon="
                newVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
              "
              :type="newVisible ? 'text' : 'password'"
              density="compact"
              :label="$vuetify.locale.t('$vuetify.global.new_password.this')"
              :placeholder="
                $vuetify.locale.t('$vuetify.global.new_password.placeholder')
              "
              :rules="rules.newPassword"
              prepend-inner-icon="fa-solid fa-lock"
              variant="outlined"
              @click:append-inner="newVisible = !newVisible"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="confirmPassword"
              :append-inner-icon="
                confirmVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
              "
              :type="confirmVisible ? 'text' : 'password'"
              density="compact"
              :label="
                $vuetify.locale.t('$vuetify.global.confirm_password.this')
              "
              :placeholder="
                $vuetify.locale.t(
                  '$vuetify.global.confirm_password.placeholder'
                )
              "
              :rules="rules.confirmPassword"
              prepend-inner-icon="fa-solid fa-lock"
              variant="outlined"
              @click:append-inner="confirmVisible = !confirmVisible"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn
          class="text-none text-subtitle-1 d-block ms-auto"
          color="primary"
          variant="flat"
          type="submit"
          :disabled="!validForm"
        >
          {{
            $vuetify.locale.t(
              "$vuetify.nav_drawer.quick_access_menu.change_password"
            )
          }}
        </v-btn>
      </form>
    </v-container>
  </v-sheet>

  <v-snackbar
    v-model="errorSnack"
    color="error"
    location="top end"
    location-strategy="connected"
  >
    {{ $vuetify.locale.t("$vuetify.global.old_password.incorrect") }}
    <template v-slot:actions>
      <v-btn variant="outlined" @click="errorSnack = false">
        {{ $vuetify.locale.t("$vuetify.global.close") }}
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
  import ThePageHead from "@/layouts/default/ThePageHead.vue";
  export default {
    components: { ThePageHead },
    data: () => ({
      oldPassword: null,
      newPassword: null,
      confirmPassword: null,
      oldVisible: false,
      newVisible: false,
      confirmVisible: false,
      validForm: false,
      formValid: {
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
      },
      errorSnack: false,
    }),
    computed: {
      pageCrumb() {
        return {
          icon: "fa-solid fa-lock",
          pageTitle: this.$vuetify.locale.t(
            "$vuetify.nav_drawer.quick_access_menu.change_password"
          ),
          items: [
            {
              title: this.$vuetify.locale.t(
                "$vuetify.nav_drawer.quick_access_menu.change_password"
              ),
              disabled: true,
            },
          ],
        };
      },
      rules() {
        return {
          oldPassword: [
            (value) => {
              if (value) {
                this.formValid.oldPassword = true;
                return true;
              }
              this.formValid.oldPassword = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.old_password.validation"
              );
            },
          ],
          newPassword: [
            (value) => {
              if (value) {
                this.formValid.newPassword = true;
                return true;
              }
              this.formValid.newPassword = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.new_password.validation"
              );
            },
          ],
          confirmPassword: [
            (value) => {
              if (value) {
                this.formValid.confirmPassword = true;
                return true;
              }
              this.formValid.confirmPassword = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.confirm_password.validation"
              );
            },
            (value) => {
              if (value === this.newPassword) {
                this.formValid.confirmPassword = true;
                return true;
              }
              this.formValid.confirmPassword = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.confirm_password.match"
              );
            },
          ],
        };
      },
    },
    methods: {
      formCheck() {
        if (Object.values(this.formValid).every((value) => !!value)) {
          this.validForm = true;
        } else {
          this.validForm = false;
        }
      },
      handleSubmit() {
        this.axios({
          url: "change-password-admin",
          method: "post",
          data: {
            old_password: this.oldPassword,
            password: this.newPassword,
          },
        }).then((res) => {
          if (res.data.status) {
            this.$router.push({
              name: "StaffProfile",
              params: { id: this.$store.getters["auth/authInfo"].auth.id },
            });
          } else {
            this.errorSnack = true;
          }
        });
      },
    },
    watch: {
      formValid: {
        handler: function () {
          this.formCheck();
        },
        deep: true,
      },
    },
  };
</script>
