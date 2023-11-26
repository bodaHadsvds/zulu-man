<template>
  <v-app id="inspire">
    <component :is="$route.meta.layout || 'div'" />
    <!-- v-if="authenticated" -->
    <!-- <auth-view :is="$route.meta.layout || 'div'" /> -->
  </v-app>
</template>

<script>
import DefaultView from "./View.vue";
import AuthView from "./AuthView.vue";
export default {
  // components: { DefaultView, AuthView },
  computed: {
    authenticated() {
      return this.$store.getters["auth/authenticated"];
    },
  },
  mounted() {},
};
</script>
