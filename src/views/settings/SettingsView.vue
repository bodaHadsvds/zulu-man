<template>
  <v-tabs fixed-tabs border-bottom color="primary">
    <v-tab
      v-for="item in tabsItems"
      :key="item.route"
      :value="item.route"
      :to="item.route"
    >
      {{ item.value }}
    </v-tab>
  </v-tabs>
  <v-divider class="mb-6"></v-divider>

  <router-view />
</template>
<script>
  export default {
    data: () => ({}),
    computed: {
      tabsItems() {
        return [
          {
            key: "BusinessSettings",
            value: this.$vuetify.locale.t(
              "$vuetify.nav_drawer.settings.business_settings"
            ),
            route: { name: "BusinessSettings" },
          },
          {
            key: "StaffMembers",
            value: this.$vuetify.locale.t(
              "$vuetify.nav_drawer.settings.staff_members"
            ),
            route: { name: "StaffMembers" },
          },
          {
            key: "Memberships",
            value: this.$vuetify.locale.t(
              "$vuetify.nav_drawer.settings.membership_types"
            ),
            route: { name: "Memberships" },
          },
          {
            key: "products",
            value: this.$vuetify.locale.t(
              "$vuetify.nav_drawer.settings.products"
            ),
            route: { name: "products" },
          },
          {
            key: "LeadsSettings",
            value: this.$vuetify.locale.t("$vuetify.global.lead.plural"),
            route: { name: "LeadsSettings" },
          },
        ];
      },
    },
    methods: {
      changeTab() {
        if (this.$route.name === "BusinessSettings") {
          this.tab = 0;
        } else if (this.$route.name === "StaffMembers") {
          this.tab = 1;
        } else if (this.$route.name === "Memberships") {
          this.tab = 2;
        } else if (this.$route.name === "products") {
          this.tab = 3;
        } else if (this.$route.name === "LeadsSettings") {
          this.tab = 4;
        }
      },
    },
    updated() {
      this.changeTab();
    },
    created() {
      this.changeTab();
    },
  };
</script>
