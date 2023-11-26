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
            $vuetify.locale.t("$vuetify.global.profile.contact_details.this")
          }}
        </h4>
        <v-btn
          icon="fa-solid fa-pen"
          variant="plain"
          size="small"
          color="primary"
          type="button"
          v-if="!edit"
          @click="loadUserInputs"
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
              {{ $vuetify.locale.t("$vuetify.global.phone.this") }}:
            </h5>
            <v-responsive max-width="150" v-if="edit">
              <v-text-field
                density="compact"
                variant="outlined"
                type="tel"
                name="phone"
                v-model="form.phone"
                hide-details
              ></v-text-field>
            </v-responsive>
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ memberInfo.phone }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{ $vuetify.locale.t("$vuetify.global.additional_num.this") }}:
            </h5>
            <v-responsive max-width="150" v-if="edit">
              <v-text-field
                density="compact"
                variant="outlined"
                type="tel"
                name="additional_number"
                v-model="form.additional_number"
                hide-details
              ></v-text-field>
            </v-responsive>
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ member.additional_number }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{ $vuetify.locale.t("$vuetify.global.email.this") }}:
            </h5>
            <v-responsive max-width="150" v-if="edit">
              <v-text-field
                density="compact"
                variant="outlined"
                type="email"
                name="email"
                v-model="form.email"
                hide-details
              ></v-text-field>
            </v-responsive>
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ member.email }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{
                $vuetify.locale.t(
                  "$vuetify.global.profile.contact_details.email_list"
                )
              }}:
            </h5>
            <v-responsive max-width="40" class="overflow-visible" v-if="edit">
              <v-switch
                v-model="form.subscribe"
                hide-details
                :true-value="1"
                :false-value="0"
                color="primary"
              ></v-switch>
            </v-responsive>

            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{
                member.subscribe == 0
                  ? $vuetify.locale.t("$vuetify.global.no")
                  : $vuetify.locale.t("$vuetify.global.yes")
              }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{ $vuetify.locale.t("$vuetify.global.country.this") }}:
            </h5>
            <v-responsive max-width="150" v-if="edit">
              <v-select
                density="compact"
                variant="outlined"
                name="country_id"
                item-title="text"
                item-value="id"
                v-model="form.country_id"
                hide-details
                :items="countryItems"
              ></v-select>
            </v-responsive>
            <p
              class="text-subtitle-1 text-grey-darken-1"
              v-if="member.country && !edit"
            >
              {{ member.country.name_en }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
            v-if="member.city"
          >
            <h5 class="text-subtitle-1">
              {{ $vuetify.locale.t("$vuetify.global.city.this") }}:
            </h5>
            <v-responsive max-width="150" v-if="edit">
              <v-select
                density="compact"
                variant="outlined"
                name="city_id"
                item-title="text"
                item-value="id"
                v-model="form.city_id"
                hide-details
                :items="cityItems"
              ></v-select>
            </v-responsive>
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ member.city.name_en }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{ $vuetify.locale.t("$vuetify.global.street.this") }}:
            </h5>
            <v-responsive max-width="150" v-if="edit">
              <v-text-field
                density="compact"
                variant="outlined"
                type="text"
                name="street"
                v-model="form.street"
                hide-details
              ></v-text-field>
            </v-responsive>
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ member.street }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{ $vuetify.locale.t("$vuetify.global.state.this") }}:
            </h5>
            <v-responsive max-width="150" v-if="edit">
              <v-text-field
                density="compact"
                variant="outlined"
                type="text"
                name="state"
                v-model="form.state"
                hide-details
              ></v-text-field>
            </v-responsive>
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ member.state }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{ $vuetify.locale.t("$vuetify.global.post_code.this") }}:
            </h5>
            <v-responsive max-width="150" v-if="edit">
              <v-text-field
                density="compact"
                variant="outlined"
                type="text"
                name="post_code"
                v-model="form.post_code"
                hide-details
              ></v-text-field>
            </v-responsive>
            <p class="text-subtitle-1 text-grey-darken-1" v-if="!edit">
              {{ member.post_code }}
            </p>
          </li>
          <li
            class="d-flex align-center justify-space-between flex-wrap mb-4"
            style="gap: 10px"
          >
            <h5 class="text-subtitle-1">
              {{ $vuetify.locale.t("$vuetify.global.currency.this") }}:
            </h5>
            <p class="text-subtitle-1 text-grey-darken-1" v-if="member.country">
              {{ member.country.currency }}
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
        countryItems: [],
        cityItems: [],
        member: null,
        form: null,
        // memberInfo: {},
      };
    },
    computed: {
      memberInfo() {
        const memberProp = this.member;
        return memberProp;
      },
      formObj: function () {
        if (this.member) {
          const form = {
            country_id: this.member.country.id,
            city_id: this.member.city.id,
            phone: this.member.phone,
            additional_number: this.member.additional_number,
            email: this.member.email,
            street: this.member.street,
            state: this.member.state,
            post_code: this.member.post_code,
            subscribe: this.member.subscribe,
          };
          return form;
        }
        return {};
      },
    },
    methods: {
      loadCountries() {
        this.countryItems = [];
        axios.get(`countries`).then((response) => {
          for (const country of response.data.data) {
            this.countryItems.push({
              text: `${country.name_en}`,
              id: country.id,
            });
          }
        });
      },
      loadCities(id) {
        this.cityItems = [];
        axios.get(`country/show/${id}`).then((response) => {
          if (response.data.status == true) {
            let cities = response.data.data.city;
            for (const city of cities) {
              this.cityItems.push({ text: `${city.name_en}`, id: city.id });
            }
            console.log(this.cityItems);
          }
        });
      },
      loadUserInputs() {
        // this.form = {
        //   country_id: this.member.country.id,
        //   city_id: this.member.city.id,
        //   phone: this.member.phone,
        //   additional_number: this.member.additional_number,
        //   email: this.member.email,
        //   street: this.member.street,
        //   state: this.member.state,
        //   post_code: this.member.post_code,
        // };
        this.loadCountries();
        this.loadCities(this.formObj.country_id);
        this.edit = true;
      },
      handleContactForm() {
        axios
          .post(`user/update_contact_details/${this.member.id}`, this.form)
          .then((response) => {
            this.member = response.data.data;
          })
          .then(() => {
            this.edit = false;
          });
      },
    },
    watch: {
      "form.country_id": {
        handler: function (newVal, oldVal) {
          if (newVal && oldVal) {
            this.form.city_id = null;
            this.loadCities(newVal);
          }
        },
        deep: true,
      },
    },
    mounted() {
      this.member = this.memberDetails;
      this.form = this.formObj;
    },
  };
</script>
