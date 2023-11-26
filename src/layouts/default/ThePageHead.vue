<template>
  <div class="page-head mb-6">
    <v-breadcrumbs
      :items="items.items"
      style="width: fit-content; padding: 0"
      class="mb-1"
    >
      <template v-slot:prepend>
        <v-icon
          size="x-small"
          :icon="items.icon"
          style="color: rgb(var(--v-theme-primary))"
          class="me-2"
        ></v-icon>
      </template>
    </v-breadcrumbs>
    <h1 class="mb-5">{{ items.pageTitle }}</h1>
  </div>
</template>

<script>
  export default {
    props: ["items"],
  };
</script>
