<template>
  <branches-table />
</template>

<script>
  import { defineAsyncComponent } from "vue";
  import ThePageHead from "@/layouts/default/ThePageHead.vue";

  const BranchesTable = defineAsyncComponent(() =>
    import("@/components/branches/BranchesTable.vue")
  );

  export default {
    name: "BranchesView",
    components: { BranchesTable, ThePageHead },
    data: () => ({
      branches: [],
    }),
    computed: {
      pageCrumb() {
        return {
          icon: "fa-solid fa-thumbtack",
          pageTitle: this.$vuetify.locale.t("$vuetify.global.branch.plural"),
          items: [
            {
              title: this.$vuetify.locale.t("$vuetify.global.branch.plural"),
              disabled: true,
            },
          ],
        };
      },
    },
  };
</script>
