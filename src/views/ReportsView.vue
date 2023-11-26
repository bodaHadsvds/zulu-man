<template>
  <v-toolbar class="bg-background px-0 py-4 pt-0">
    <v-row>
      <v-col cols="6" class="d-flex align-center justify-start">
        <h2>
          {{ $vuetify.locale.t("$vuetify.global.reports.plural") }}
        </h2>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-end">
      </v-col>
    </v-row>
  </v-toolbar>
  <v-row>
    <v-col cols="3">
      <report-column
        title="favourites"
        type="favourites"
        :reports="this.$store.getters['reports/favourites']"
      />
    </v-col>
    <v-col cols="3">
      <report-column
        title="essentials"
        type="essentials"
        :reports="$store.getters['reports/essentials']"
      />
    </v-col>
    <v-col cols="3">
      <report-column
        title="growth"
        type="growth"
        :reports="this.$store.getters['reports/growth']"
      />
    </v-col>
    <v-col cols="3">
      <report-column
        title="retention"
        type="retention"
        :reports="this.$store.getters['reports/retention']"
      />
    </v-col>
  </v-row>
</template>

<script>
  import ThePageHead from "@/layouts/default/ThePageHead.vue";
  import ReportColumn from "@/components/reports/ReportColumn.vue";
  export default {
    components: { ThePageHead, ReportColumn },
    computed: {
      pageCrumb() {
        return {
          icon: "fa-solid fa-grip",
          pageTitle: this.$vuetify.locale.t("$vuetify.global.reports.plural"),
          items: [
            {
              title: this.$vuetify.locale.t("$vuetify.global.reports.plural"),
              disabled: true,
              href: "/reports",
            },
          ],
        };
      },
    }
  };
</script>
