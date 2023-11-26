<template>
  <v-dialog v-model="dialogDelete" width="fit-content">
    <v-card class="px-3 py-8 text-center rounded-lg">
      <v-card-title class="text-h5 mb-4">
        <p class="text-h5">
          {{
            $vuetify.locale.t("$vuetify.global.sure_delete") +
            " " +
            $vuetify.locale.t("$vuetify.global.lead.this")
          }}?
        </p>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="closeDelete">
          {{ $vuetify.locale.t("$vuetify.global.close") }}
        </v-btn>
        <v-btn color="error" variant="flat" @click="deleteItemConfirm()">
          {{ $vuetify.locale.t("$vuetify.global.delete") }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ["editedItemId", "dialogDel"],
    data: () => ({
      dialogDelete: false,
    }),
    methods: {
      deleteItemConfirm() {
        this.axios({
          url: `lead_setting/destroy/${this.editedItemId}`,
          method: "delete",
        }).then((response) => {
          if (response.status) {
            this.closeDelete();
            this.$emit("refresh");
          }
        });
      },
      closeDelete() {
        this.$emit("closeDelete");
      },
    },
    watch: {
      dialogDel(newVal) {
        this.dialogDelete = newVal;
      },
      close() {
        this.$emit("closeDel");
      },
    },
  };
</script>
