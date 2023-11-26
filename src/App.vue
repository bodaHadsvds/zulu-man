<template>
  <v-theme-provider>
    <v-locale-provider>
      <default />
    </v-locale-provider>
  </v-theme-provider>
</template>

<script>
  import Default from "./layouts/default/Default.vue";
  export default {
    components: { Default },
  };
</script>
