<template>
  <drawer-content />

  <v-app-bar color="background" :elevation="0" class="border-b">
    <bar-content />
  </v-app-bar>

  <v-main>
    <v-container fluid="">
      <div class="py-2">
        <page-content />
      </div>
    </v-container>
  </v-main>
</template>

<script>
  import drawerContent from "./NavigationDrawer.vue";
  import barContent from "./AppBar.vue";
  import PageContent from "./PageContent.vue";
  export default {
    components: {
      drawerContent,
      barContent,
      PageContent,
    },
    // data: () => ({ drawer: null, rail: false }),
  };
</script>
