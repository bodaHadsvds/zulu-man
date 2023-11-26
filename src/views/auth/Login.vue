<template>
  <div class="d-flex flex-column align-stretch" style="min-height: 100vh">
    <v-img class="mx-auto my-6" width="228" src="@/assets/logo.svg"></v-img>
    <div class="flex-fill">
      <v-card
        class="mx-auto my-auto pa-12 d-block"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <v-form @submit.prevent="handleLoginSubmit">
          <div class="text-subtitle-1 text-medium-emphasis">
            {{ $vuetify.locale.t("$vuetify.global.email.this") }}
          </div>
          <v-text-field
            v-model="email"
            type="email"
            density="compact"
            :placeholder="
              $vuetify.locale.t('$vuetify.global.email.placeholder')
            "
            prepend-inner-icon="fa-solid fa-envelope"
            variant="outlined"
          ></v-text-field>

          <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
          >
            {{ $vuetify.locale.t("$vuetify.global.password.this") }}

            <!-- <a
              class="text-caption text-decoration-none text-blue"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              Forgot login password?</a
            > -->
          </div>

          <v-text-field
            v-model="password"
            :append-inner-icon="
              visible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
            "
            :type="visible ? 'text' : 'password'"
            density="compact"
            :placeholder="
              $vuetify.locale.t('$vuetify.global.password.placeholder')
            "
            prepend-inner-icon="fa-solid fa-lock"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>

          <v-checkbox
            :label="$vuetify.locale.t('$vuetify.global.remember_me')"
            v-model="remember"
          ></v-checkbox>

          <v-btn block color="blue" size="large" variant="tonal" type="submit">
            {{ $vuetify.locale.t("$vuetify.global.login") }}
          </v-btn>
        </v-form>
      </v-card>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      visible: false,
      email: null,
      password: null,
      remember: false,
    }),
    methods: {
      async handleLoginSubmit() {
        const data = {
          email: this.email,
          password: this.password,
        };
        await this.axios({
          url: "login-admin",
          method: "POST",
          data: data,
        }).then((res) => {
          if (res.status === 200) {
            const data = {
              resData: res.data,
              remember: this.remember,
            };
            this.$store.commit("auth/updateLogin", data);
          } else {
            this.$store.commit("auth/updateLogout");
          }
        });
      },
    },
  };
</script>
