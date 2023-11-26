<template>
  <v-sheet class="d-flex px-4 py-3 mb-5" :color="headColor" rounded>
    <h6 class="text-subtitle-1 font-weight-medium">{{ title }}</h6>
  </v-sheet>

  <div class="report-cards">
    <report-card
      v-for="report in reports"
      :key="report.slogan"
      :report="report"
      :border-color="headColor"
      @click="reportRoute(report.route)"
    />
  </div>
</template>
<script>
  import ReportCard from "./ReportCard.vue";
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      reports: {
        required: true,
      },
    },
    components: { ReportCard },
    data: () => ({}),
    computed: {
      headColor() {
        const color = () => {
          if (this.type == "favourites") {
            return "amber-darken-1";
          } else if (this.type == "essentials") {
            return "primary";
          } else if (this.type == "growth") {
            return "success";
          } else {
            return "error";
          }
        };
        return color();
      },
    },
    methods: {
      reportRoute(route) {
        this.$router.push(route);
      },
    },
  };
</script>
