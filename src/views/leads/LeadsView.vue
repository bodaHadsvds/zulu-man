<template>
  <leaders-table :report="report" />
</template>

<script>
  import { defineAsyncComponent } from "vue";
  import ThePageHead from "@/layouts/default/ThePageHead.vue";

  const LeadersTable = defineAsyncComponent(() =>
    import("@/components/leads/leaders/LeadersTable.vue")
  );

  export default {
    name: "LeadsView",
    props: ["report"],
    components: { LeadersTable, ThePageHead },
    data: () => ({
      leads: [],
    }),
    computed: {
      pageCrumb() {
        return {
          icon: "fa-solid fa-circle-user",
          pageTitle: this.$vuetify.locale.t("$vuetify.global.lead.plural"),
          items: [
            {
              title: this.$vuetify.locale.t("$vuetify.global.lead.plural"),
              disabled: true,
            },
          ],
        };
      },
    },
  };
</script>
