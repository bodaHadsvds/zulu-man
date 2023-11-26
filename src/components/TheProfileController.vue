<template>
  <v-menu
    location="top start"
    style="position: fixed"
    transition="slide-y-reverse-transition"
    width="max-content"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        color="primary"
        v-bind="props"
        :icon="
          props[`aria-expanded`] == 'false'
            ? 'fa-solid fa-plus'
            : 'fa-solid fa-minus'
        "
      >
      </v-btn>
    </template>

    <v-list>
      <slot></slot>
      <!-- <v-list-item v-for="(item, index) in items" :key="index">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item> -->
    </v-list>
  </v-menu>
</template>
