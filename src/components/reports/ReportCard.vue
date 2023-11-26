<template>
  <v-card class="d-flex align-stretch mb-3 pa-0" elevation="0" rounded="sm">
    <v-divider
      vertical
      :thickness="4"
      class="border-opacity-100"
      :color="borderColor"
    ></v-divider>
    <v-card-text class="d-flex align-center flex-fill py-7 pe-0">
      <v-icon
        :icon="`fa-solid fa-${report.icon} fa-lg me-3`"
        style="width: 25px; color:grey"
      ></v-icon>
      <h5 class="text-body-2 font-weight-medium">{{ report.title }}</h5>
    </v-card-text>
    <v-card-actions
      class="d-flex align-start flex-shrink-0 justify-end pa-1 ps-0"
    >
      <v-menu
        v-model="menu"
        open-on-hover
        location="top center"
        open-delay="0"
        close-delay="100"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            icon="fa-solid fa-circle-question fa-lg"
            variant="text"
            size="x-small"
            class="ma-0"
            v-bind="props"
            style="color:grey"
          >
          </v-btn>
        </template>
        <v-card min-width="200" max-width="320" class="pa-4">
          <v-list>
            <v-list-item>
              <h5 class="text-body-1 font-weight-medium mb-5">
                {{ report.title }}
              </h5>
              <p class="text-body-2">
                {{ report.description }}
              </p>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <v-btn
        icon="fa-solid fa-star fa-lg"
        variant="text"
        size="x-small"
        class="ma-0"
        style="color:grey"
      >
      </v-btn>
      <v-btn
        icon="fa-solid fa-lock fa-lg"
        variant="text"
        size="x-small"
        class="ma-0"
        style="color:grey"
      >
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    props: {
      report: {
        type: Object,
        required: true,
      },
      borderColor: {
        type: String,
        required: true,
      },
    },
    data: () => ({
      menu: false,
    }),
    computed: {},
    mounted() {},
  };
</script>
<style scoped>
  .v-theme--lightTheme * {
    color: #3b3b3b;
  }
</style>
