<template>
  <memberships-table />
  <cards-table />
</template>

<script>
  import { defineAsyncComponent } from "vue";
  const MembershipsTable = defineAsyncComponent(() =>
    import("@/components/memberships/MembershipsTable.vue")
  );
  const CardsTable = defineAsyncComponent(() =>
    import("@/components/memberships/CardsTable.vue")
  );
  export default {
    name: "LeadsView",
    components: { MembershipsTable, CardsTable },
    data: () => ({
      memberships: [],
    }),
  };
</script>
