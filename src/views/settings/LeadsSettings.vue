<template>
  <status-table />
  <sources-table />
  <reasons-table />
</template>

<script>
  import { defineAsyncComponent } from "vue";
  const StatusTable = defineAsyncComponent(() =>
    import("@/components/leads/settings/tables/StatusTable.vue")
  );
  const SourcesTable = defineAsyncComponent(() =>
    import("@/components/leads/settings/tables/SourcesTable.vue")
  );
  const ReasonsTable = defineAsyncComponent(() =>
    import("@/components/leads/settings/tables/ReasonsTable.vue")
  );
  export default {
    name: "LeadsView",
    components: { StatusTable, SourcesTable, ReasonsTable },
    data: () => ({
      leads: [],
    }),
  };
</script>
