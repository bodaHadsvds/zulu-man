<template>
  <v-dialog v-model="dialogShow" max-width="1024" scrollable>
    <form @submit.prevent="handleSubmit()">
      <v-card>
        <v-toolbar color="primary" :title="`add new lead ${type}`"></v-toolbar>
        <v-card-text style="max-height: 50vh" class="pa-0">
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  :label="$vuetify.locale.t('$vuetify.global.name.this')"
                  variant="outlined"
                  type="text"
                  name="name"
                  v-model="name"
                  counter
                  :maxlength="maxLength"
                  clearable
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="plain" @click="close" type="button">
            {{ $vuetify.locale.t("$vuetify.global.close") }}
          </v-btn>
          <v-btn color="primary" elevation="0" variant="flat" type="submit">
            {{ $vuetify.locale.t("$vuetify.global.save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script>
  export default {
    props: [
      "dialog",
      "editedIndex",
      "editedItemId",
      "leadType",
      "leadName",
      "maxInputLength",
    ],
    data: () => ({
      dialogShow: false,
      name: null,
      type: null,
      maxLength: null,
    }),
    watch: {
      dialog(newVal) {
        this.dialogShow = newVal;

        if (newVal) {
          this.name = this.leadName;
          this.type = this.leadType;
        }
      },
      leadName(newVal) {
        this.name = newVal;
      },
      leadType(newVal) {
        this.type = newVal;
      },
    },
    methods: {
      handleSubmit() {
        if (this.editedIndex === -1) {
          this.axios({
            url: "lead_setting/store",
            method: "POST",
            data: {
              type: this.type,
              name: this.name,
            },
          }).then(() => {
            this.close();
            this.$emit("refresh");
          });
        } else {
          this.axios({
            url: `lead_setting/update/${this.editedItemId}`,
            method: "POST",
            data: {
              type: this.type,
              name: this.name,
            },
          }).then(() => {
            this.close();
            this.$emit("refresh");
          });
        }
      },
      close() {
        this.name = null;
        this.type = null;
        this.$emit("close");
      },
    },
    created() {
      this.dialogShow = this.dialog;
      this.type = this.leadType;
      this.name = this.leadName;
      this.maxLength = this.maxInputLength;
    },
  };
</script>
