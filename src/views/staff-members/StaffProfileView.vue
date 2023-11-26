<template>
  <v-sheet color="surface" class="d-flex pa-7">
    <div class="d-flex align-start flex-fill mb-4">
      <div class="avatar d-flex align-center me-5">
        <v-avatar
          color="info"
          size="150"
          v-if="member.first_name && member.last_name"
        >
          <span class="text-h4">
            {{ AvatarLetters }}
          </span>
        </v-avatar>
      </div>
      <div class="d-flex justify-center flex-column flex-fill me-5">
        <h2 class="text-h5 font-weight-bold mb-3">{{ fullName }}</h2>
        <p class="text-body-2 mb-2">
          {{
            `${this.$vuetify.locale.t(
              "$vuetify.global.profile.client_since"
            )}: ${date}`
          }}
        </p>
        <p class="text-body-2 mb-2">
          <span class="font-weight-medium"
            >{{ this.$vuetify.locale.t("$vuetify.global.profile.age") }}: </span
          >{{ age }} years
        </p>
        <p class="text-body-2 mb-2">
          <span class="font-weight-medium"
            >{{ this.$vuetify.locale.t("$vuetify.global.email.this") }}: </span
          >{{ member.email }}
        </p>
        <p class="text-body-2 mb-2">
          <span class="font-weight-medium"
            >{{ this.$vuetify.locale.t("$vuetify.global.phone.this") }}:
          </span>
          {{ member.phone }}
        </p>
        <p class="text-body-2 mb-2" v-if="member.additional_number">
          <span class="font-weight-medium"
            >{{
              this.$vuetify.locale.t("$vuetify.global.additional_num.this")
            }}:
          </span>
          {{ member.additional_number }}
        </p>
      </div>
    </div>
    <v-btn
      icon="fa-solid fa-pen"
      variant="plain"
      size="small"
      color="primary"
      type="button"
      v-if="!edit"
      @click="loadUserInputs"
    ></v-btn>
  </v-sheet>

  <v-tabs v-model="tab" fixed-tabs border-bottom color="primary">
    <v-tab v-for="item in tabsItems" :key="item.key" :value="item.key">
      {{ item.value }}
    </v-tab>
  </v-tabs>
  <v-divider class="mb-6"></v-divider>

  <v-window v-model="tab">
    <v-window-item v-for="item in tabsItems" :key="item.key" :value="item.key">
      <div v-if="tabsItems.indexOf(item) === 0">
        <v-row>
          <v-col cols="4" class="mb-7">
            <contact-details :memberDetails="member" />
          </v-col>
          <v-col cols="4" class="mb-7">
            <documents-details :member="member" />
          </v-col>
        </v-row>
      </div>
      <div v-if="tabsItems.indexOf(item) === 1"></div>
      <div v-if="tabsItems.indexOf(item) === 2"></div>
    </v-window-item>
  </v-window>
</template>

<script>
  import { defineAsyncComponent } from "vue";

  const DocumentsDetails = defineAsyncComponent(() =>
    import("@/components/staff-member/profile/DocumentsDetails.vue")
  );
  import ContactDetails from "@/components/staff-member/profile/ContactDetails.vue";
  export default {
    props: ["id"],
    components: {
      ContactDetails,
      DocumentsDetails,
    },
    data() {
      return {
        tab: null,
        edit: false,
      };
    },
    computed: {
      tabsItems() {
        return [
          {
            key: "profile",
            value: this.$vuetify.locale.t("$vuetify.global.profile.this"),
          },
          {
            key: "activity_log",
            value: this.$vuetify.locale.t(
              "$vuetify.global.profile.tabs.activity_log"
            ),
          },
          {
            key: "tasks",
            value: this.$vuetify.locale.t("$vuetify.nav_drawer.task.plural"),
          },
          {
            key: "communication",
            value: this.$vuetify.locale.t(
              "$vuetify.global.profile.tabs.communication"
            ),
          },
          {
            key: "bookings",
            value: this.$vuetify.locale.t(
              "$vuetify.global.profile.tabs.bookings"
            ),
          },
        ];
      },
      member() {
        return this.$store.getters["staff/staffMember"];
      },
      fullName() {
        return `${this.member.first_name} ${this.member.last_name}`;
      },
      AvatarLetters() {
        let first = this.member.first_name;
        let last = this.member.last_name;
        let letters = `${first.charAt(0)} ${last.charAt(0)}`;
        return letters.toUpperCase();
      },
      date() {
        const newDate = new Date(Date.parse(this.member.created_at));
        return `${newDate.toLocaleString("default", {
          month: "short",
        })}  ${newDate.getFullYear()}`;
      },
      age() {
        const getAge = (birthDate) =>
          Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);
        return getAge(this.member.birthdate);
      },
    },
    methods: {
      loadMember() {
        this.$store.dispatch("staff/fetchStaffMember", this.id);
      },
    },
    mounted() {
      this.loadMember();
    },
  };
</script>
