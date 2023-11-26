<template>
  <v-sheet
    v-if="member"
    :elevation="0"
    color="surface"
    class="pa-5"
    rounded="lg"
    border
  >
    <form @submit.prevent="handleContactForm">
      <div class="d-flex align-center justify-space-between flex-wrap mb-3">
        <h4 class="text-h6">
          {{
            $vuetify.locale.t("$vuetify.global.profile.personal_details.this")
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
                  "$vuetify.global.profile.personal_details.location"
                )
              }}:
            </h5>
            <!-- <v-responsive max-width="150" v-if="edit">
              <v-text-field density="compact" variant="outlined" type="tel" name="phone" v-model="form.phone" single-line hide-details></v-text-field>
            </v-responsive> -->
            <p class="text-subtitle-1 text-grey-darken-1">Unknown</p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{ $vuetify.locale.t("$vuetify.global.gender.this") }}:
            </h5>
            <v-responsive max-width="150" v-if="edit">
              <v-select
                density="compact"
                variant="outlined"
                name="gender"
                v-model="form.gender"
                single-line
                hide-details
                :items="genderItems"
              ></v-select>
            </v-responsive>
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ member.gender }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{ $vuetify.locale.t("$vuetify.global.birthdate.this") }}:
            </h5>
            <v-responsive max-width="150" v-if="edit">
              <v-text-field
                density="compact"
                variant="outlined"
                type="date"
                name="birthdate"
                v-model="form.birthdate"
                single-line
                hide-details
              ></v-text-field>
            </v-responsive>
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ member.birthdate }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{ $vuetify.locale.t("$vuetify.global.id_num.this") }}:
            </h5>
            <v-responsive max-width="150" v-if="edit">
              <v-text-field
                density="compact"
                variant="outlined"
                type="number"
                name="id_number"
                v-model="form.id_number"
                single-line
                hide-details
              ></v-text-field>
            </v-responsive>
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ member.id_number }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{
                $vuetify.locale.t(
                  "$vuetify.global.profile.personal_details.height"
                )
              }}:
            </h5>
            <v-responsive max-width="150" v-if="edit">
              <v-text-field
                density="compact"
                variant="outlined"
                type="number"
                name="height"
                v-model="form.height"
                single-line
                hide-details
              ></v-text-field>
            </v-responsive>
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ member.height }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{
                $vuetify.locale.t(
                  "$vuetify.global.profile.personal_details.weight"
                )
              }}:
            </h5>
            <v-responsive max-width="150" v-if="edit">
              <v-text-field
                density="compact"
                variant="outlined"
                type="number"
                name="weight"
                v-model="form.weight"
                single-line
                hide-details
              ></v-text-field>
            </v-responsive>
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ member.weight }}
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
    computed: {
      genderItems() {
        return [
          {
            text: this.$vuetify.locale.t("$vuetify.global.gender.male"),
            id: 0,
          },
          {
            text: this.$vuetify.locale.t("$vuetify.global.gender.female"),
            id: 1,
          },
        ];
      },
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
