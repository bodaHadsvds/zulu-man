<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="item in items"
      :key="item"
      :title="item.title"
      elevation="0"
    >
      <v-expansion-panel-text>
        <booking-table :booking-type="item.type" />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
  import BookingTable from "./BookingTable.vue";
  export default {
    props: ["bookingsItems"],
    components: { BookingTable },
    data: () => ({
      items: null,
    }),
    created() {
      this.items = this.bookingsItems;
    },
  };
</script>

<style lang="scss" scoped>
  :deep() {
    .v-expansion-panel-text__wrapper {
      padding: 0 !important;
    }
  }
</style>
