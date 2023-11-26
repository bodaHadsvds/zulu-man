<template>
  <v-toolbar class="bg-background px-0 py-4 pt-0">
    <v-row>
      <v-col cols="6" class="d-flex align-center justify-start">
        <h2>
          {{ $vuetify.locale.t("$vuetify.nav_drawer.settings.business_settings") }}
        </h2>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-end">
        <div class="d-flex align-stretch flex-wrap" style="gap: 10px">
        </div>
        
        
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script>
  import ThePageHead from "@/layouts/default/ThePageHead.vue";
  export default {
    components: { ThePageHead },
    computed: {
      pageCrumb() {
        return {
          icon: "fa-solid fa-grip",
          pageTitle: this.$vuetify.locale.t(
            "$vuetify.nav_drawer.settings.business_settings"
          ),
          items: [
            {
              title: this.$vuetify.locale.t(
                "$vuetify.nav_drawer.settings.business_settings"
              ),
              disabled: true,
            },
          ],
        };
      },
    },
  };
</script>
