<template>
  <v-navigation-drawer
    location="end"
    floating
    sticky
    temporary
    width="500"
    scrollable
  >
    <schedule-type @sendType="handleType" v-if="!type" :close-event="close" />

    <schedule-steps
      :type="scheduleType"
      :editedId="editedId"
      :editedIdx="editedIdx"
      :editedItm="editedItm"
      :close-event="close"
      @refresh="refresh"
      v-if="scheduleType"
    />
  </v-navigation-drawer>
</template>

<script>
  import ScheduleSteps from "@/components/schedules/drawers/schedules-drawer/drawer-content/ScheduleSteps.vue";
  import ScheduleType from "@/components/schedules/drawers/schedules-drawer/drawer-content/ScheduleType.vue";

  export default {
    components: { ScheduleSteps, ScheduleType },
    props: {
      editedId: {
        required: true,
      },
      editedIdx: {
        required: true,
      },
      editedItm: {
        required: true,
      },
      scheduleType: {},
    },
    data: () => ({
      type: null,
    }),
    computed: {},
    methods: {
      handleType(type) {
        this.$emit("handleType", type);
      },
      close() {
        this.$emit("closeDrawer");
        console.log("closed schedules");
      },
      refresh() {
        this.$emit("refresh");
      },
    },
    watch: {
      "editedItem.repeat": {
        handler: function (newVal) {
          if (newVal && newVal === "0") {
            this.step2Valid.schedule_on = true;
            this.step2Valid.endAt = true;
          } else {
            this.step2Valid.schedule_on = true;
            this.step2Valid.endAt = true;
          }
        },
        deep: true,
      },
      scheduleType(newVal) {
        this.type = newVal;
      },
    },
    emits: ["closeDrawer", "refresh", "handleType"],
  };
</script>
