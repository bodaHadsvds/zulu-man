<template>
  <v-card class="h-100 d-flex flex-column rounded-0">
    <v-card-title class="pa-0">
      <v-toolbar
        color="backgorund"
        :title="$vuetify.locale.t('$vuetify.nav_drawer.schedule.add')"
      >
        <v-btn
          variant="text"
          icon="fa-solid fa-x"
          @click="closeEvent"
          size="small"
        ></v-btn>
      </v-toolbar>
    </v-card-title>
    <v-card-text class="flex-fill overflow-auto pa-6">
      <v-radio-group v-model="type" color="primary">
        <v-radio
          value="appointment"
          class="pa-3 mb-3 rounded border-sm"
          :ripple="false"
        >
          <template v-slot:label>
            <div>
              <h5 class="text-subtitle-1 font-weight-medium mb-1">
                appointment
              </h5>
              <h6 class="text-body-2 font-weight-regular mb-1">
                A one-on-one session that can be booked according to
                availability.
              </h6>
              <p class="text-caption text-gray mb-0">
                E.g. — beauty treatment, private lesson, consultation etc.
              </p>
            </div>
          </template>
        </v-radio>
        <v-radio
          value="session"
          class="pa-3 mb-3 rounded border-sm"
          :ripple="false"
        >
          <template v-slot:label>
            <div>
              <h5 class="text-subtitle-1 font-weight-medium mb-1">
                Group Session
              </h5>
              <h6 class="text-body-2 font-weight-regular mb-1">
                A group session that can recur weekly.
              </h6>
              <p class="text-caption text-gray mb-0">
                E.g. — class, meeting, lecture etc.
              </p>
            </div>
          </template>
        </v-radio>
        <v-radio value="course" class="pa-3 rounded border-sm" :ripple="false">
          <template v-slot:label>
            <div>
              <h5 class="text-subtitle-1 font-weight-medium mb-1">course</h5>
              <h6 class="text-body-2 font-weight-regular mb-1">
                A set of group sessions that are all booked upfront.
              </h6>
              <p class="text-caption text-gray mb-0">
                E.g. — retreat, workshop, educational course etc.
              </p>
            </div>
          </template>
        </v-radio>
      </v-radio-group>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="px-2 py-3">
      <v-spacer></v-spacer>
      <v-btn
        class="text-none text-subtitle-1"
        color="primary"
        variant="flat"
        @click="sendType"
        type="button"
      >
        {{ $vuetify.locale.t("$vuetify.global.next") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    emits: ["sendType"],
    props: ["closeEvent"],
    data: () => ({
      type: "appointment",
    }),
    methods: {
      sendType() {
        this.$emit("sendType", this.type);
      },
    },
  };
</script>

<style lang="scss" scoped>
  :deep() {
    .v-radio {
      align-items: flex-start;
      &.v-selection-control--dirty {
        border-color: rgb(var(--v-theme-primary)) !important;
      }
      .v-selection-control__wrapper {
        height: unset;
        transform: translateY(-8px);
      }
      .v-label {
        opacity: 1;
      }
    }
  }
</style>
