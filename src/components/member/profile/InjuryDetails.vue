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
          {{ $vuetify.locale.t("$vuetify.global.profile.injury_details.this") }}
        </h4>
        <v-btn
          icon="fa-solid fa-pen"
          variant="plain"
          size="small"
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
      <v-responsive class="overflow-auto pe-3">
        <ul>
          <li>
            <v-textarea
              variant="outlined"
              name="injuery"
              v-model="form.injuery"
              v-if="edit"
              rows="3"
            ></v-textarea>
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ member.injuery }}
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
    props: ["memberDetails"],
    data: function () {
      return {
        edit: false,
        member: {
          injuery: null,
        },
        form: {
          injuery: this.memberDetails.injuery,
        },
      };
    },
    methods: {
      handleContactForm() {
        axios
          .post(`user/update_injuery/${this.memberDetails.id}`, this.form)
          .then((response) => {
            console.log("updated");
            this.member.injuery = response.data.data.injuery;
          })
          .then(() => {
            this.edit = false;
          });
      },
    },
    mounted() {
      this.member.injuery = this.memberDetails.injuery;
    },
  };
</script>
