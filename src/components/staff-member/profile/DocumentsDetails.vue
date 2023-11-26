<template>
  <v-sheet
    v-if="member"
    :elevation="0"
    color="surface"
    class="pa-5"
    rounded="lg"
    border
  >
    <form @submit.prevent="handleContactForm" class="d-flex flex-column h-100">
      <div class="d-flex align-center justify-space-between flex-wrap mb-3">
        <h4 class="text-h6">
          {{
            $vuetify.locale.t("$vuetify.global.profile.documents.details.this")
          }}
        </h4>
        <v-btn
          icon="fa-solid fa-pen"
          variant="plain"
          size="x-small"
          color="primary"
          type="button"
          v-if="!edit"
          @click="edit = true"
        ></v-btn>
        <div
          class="d-flex align-center justify-end"
          style="gap: 5px"
          v-if="edit"
        >
          <v-btn
            class="text-none text-subtitle-1"
            color="error"
            size="small"
            variant="flat"
            type="button"
            @click="edit = false"
          >
            {{ $vuetify.locale.t("$vuetify.global.close") }}
          </v-btn>
          <v-btn
            class="text-none text-subtitle-1"
            color="primary"
            size="small"
            variant="flat"
            type="submit"
          >
            {{ $vuetify.locale.t("$vuetify.global.save") }}
          </v-btn>
        </div>
      </div>
      <v-divider class="mb-3"></v-divider>
      <v-responsive class="overflow-auto pe-3" max-height="300">
        <ul>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{
                $vuetify.locale.t(
                  "$vuetify.global.profile.documents.details.types.medical"
                )
              }}:
            </h5>
            <!-- <v-responsive max-width="150" v-if="edit">
              <v-text-field density="compact" variant="outlined" type="tel" name="phone" v-model="form.phone" single-line hide-details></v-text-field>
            </v-responsive> -->
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ $vuetify.locale.t("$vuetify.global.no") }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{
                $vuetify.locale.t(
                  "$vuetify.global.profile.documents.details.types.waiver"
                )
              }}:
            </h5>
            <!-- <v-responsive max-width="150" v-if="edit">
              <v-select density="compact" variant="outlined" name="gender" v-model="form.gender" single-line hide-details :items="['male', 'female']"></v-select>
            </v-responsive> -->
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ $vuetify.locale.t("$vuetify.global.no") }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{
                $vuetify.locale.t(
                  "$vuetify.global.profile.documents.details.types.insurance"
                )
              }}:
            </h5>
            <!-- <v-responsive max-width="150" v-if="edit">
              <v-text-field density="compact" variant="outlined" type="date" name="birthdate" v-model="form.birthdate" single-line hide-details></v-text-field>
            </v-responsive> -->
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ $vuetify.locale.t("$vuetify.global.no") }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{
                $vuetify.locale.t(
                  "$vuetify.global.profile.documents.details.types.basic_sessions"
                )
              }}:
            </h5>
            <!-- <v-responsive max-width="150" v-if="edit">
              <v-text-field density="compact" variant="outlined" type="number" name="id_number" v-model="form.id_number" single-line hide-details></v-text-field>
            </v-responsive> -->
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ $vuetify.locale.t("$vuetify.global.no") }}
            </p>
          </li>
        </ul>
      </v-responsive>
    </form>
  </v-sheet>
</template>
<script>
  import axios from "axios";
  export default {
    props: ["member"],
    data: function () {
      return {
        edit: false,
        form: {
          gender: this.member.gender,
          birthdate: this.member.birthdate,
          id_number: this.member.id_number,
          height: this.member.height,
          weight: this.member.weight,
        },
      };
    },
    methods: {
      handleContactForm() {
        axios
          .post(`user/update_personal_info/${this.member.id}`, this.form)
          .then((response) => {
            console.log(response);
          });
      },
    },
  };
</script>
