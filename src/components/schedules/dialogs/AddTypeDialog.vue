<template>
  <v-dialog max-width="550" scrollable>
    <form @submit.prevent="saveSessionType">
      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar
            color="primary"
            :title="
              $vuetify.locale.t(`$vuetify.global.${scheduleType}.type.add`)
            "
          ></v-toolbar>
        </v-card-title>
        <v-card-text style="max-height: 70vh" class="pa-0">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.name"
                  :rules="sessionTypeRules.name"
                  :label="$vuetify.locale.t('$vuetify.global.name.this')"
                  :placeholder="
                    $vuetify.locale.t('$vuetify.global.name.placeholder')
                  "
                  type="text"
                  name="name"
                  density="compact"
                  :counter="20"
                  maxlength="20"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editedItem.description"
                  :rules="sessionTypeRules.description"
                  :label="$vuetify.locale.t('$vuetify.global.description.this')"
                  :placeholder="
                    $vuetify.locale.t('$vuetify.global.description.placeholder')
                  "
                  name="description"
                  density="compact"
                  variant="outlined"
                  auto-grow
                  rows="3"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <p class="text-body-1 mb-3">
                  {{ $vuetify.locale.t("$vuetify.global.session.type.length") }}
                </p>
                <div class="d-flex align-center">
                  <v-btn-toggle
                    v-model="editedItem.length"
                    rounded="0"
                    color="primary"
                    class="me-4"
                    mandatory
                    divided
                  >
                    <v-btn value="30" variant="outlined"
                      >30
                      {{
                        $vuetify.locale.t("$vuetify.global.minute.appr")
                      }}</v-btn
                    >
                    <v-btn value="45" variant="outlined"
                      >45
                      {{
                        $vuetify.locale.t("$vuetify.global.minute.appr")
                      }}</v-btn
                    >
                    <v-btn value="60" variant="outlined"
                      >60
                      {{
                        $vuetify.locale.t("$vuetify.global.minute.appr")
                      }}</v-btn
                    >
                    <v-btn value="90" variant="outlined"
                      >90
                      {{
                        $vuetify.locale.t("$vuetify.global.minute.appr")
                      }}</v-btn
                    >
                  </v-btn-toggle>
                  <v-responsive max-width="100px">
                    <v-text-field
                      v-model="editedItem.length"
                      :rules="sessionTypeRules.length"
                      type="number"
                      name="name"
                      label="Custom"
                      density="compact"
                      variant="outlined"
                      min="1"
                      hide-details
                      single-line
                    ></v-text-field>
                  </v-responsive>
                </div>
              </v-col>
              <v-col cols="12" v-if="!editedItem.length">
                <p class="text-body-1 mb-4 text-error" color="error">
                  {{
                    $vuetify.locale.t(
                      "$vuetify.global.session.type.select_length"
                    )
                  }}
                </p>
              </v-col>
              <v-col cols="12">
                <p class="text-body-1 mb-3">
                  {{
                    $vuetify.locale.t("$vuetify.global.session.type.color.this")
                  }}
                </p>

                <v-btn-toggle
                  v-model="editedItem.color"
                  rounded="0"
                  color="transparent"
                  class="colors-palettes flex-wrap h-auto"
                  style="gap: 15px"
                  mandatory
                  divided
                >
                  <v-btn
                    v-for="color in colors"
                    :key="color.id"
                    variant="outlined"
                    :icon="''"
                    :value="color.code"
                    width="25"
                    height="25"
                    class="pa-0"
                    elevation="0"
                    :style="`background-color: ${color.code}`"
                    rounded="circle"
                  ></v-btn>
                </v-btn-toggle>
              </v-col>

              <v-col cols="5">
                <v-text-field
                  v-model="editedItem.max_participants"
                  :rules="sessionTypeRules.max_participants"
                  :label="
                    $vuetify.locale.t(
                      '$vuetify.global.session.max_participants.this'
                    )
                  "
                  :placeholder="
                    $vuetify.locale.t(
                      '$vuetify.global.session.max_participants.placeholder'
                    )
                  "
                  type="number"
                  name="max_participants"
                  density="compact"
                  variant="outlined"
                  min="1"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.staff_salary"
                  :rules="sessionTypeRules.staff_salary"
                  :label="
                    $vuetify.locale.t(
                      '$vuetify.global.session.coach.salary.this'
                    )
                  "
                  :placeholder="
                    $vuetify.locale.t(
                      '$vuetify.global.session.coach.salary.placeholder'
                    )
                  "
                  type="number"
                  name="staff_salary"
                  density="compact"
                  variant="outlined"
                  :suffix="`/ ${$vuetify.locale.t(
                    '$vuetify.global.session.this'
                  )}`"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="close">
            {{ $vuetify.locale.t("$vuetify.global.close") }}
          </v-btn>
          <v-btn
            variant="flat"
            color="primary"
            type="submit"
            :disabled="!validSessionType"
          >
            {{ $vuetify.locale.t("$vuetify.global.save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>
<script>
  export default {
    props: ["typeDialog", "scheduleType"],
    emits: ["closeType"],
    data: () => ({
      dialog: false,
      validSessionType: false,
      editedItem: {
        name: null,
        description: null,
        length: null,
        max_participants: null,
        staff_salary: null,
        type: null,
        color: "#D0FFF9",
      },
      defaultItem: {
        name: null,
        description: null,
        length: null,
        max_participants: null,
        staff_salary: null,
        type: null,
        color: "#D0FFF9",
      },
      sessionTypeValid: {
        name: false,
        description: false,
        length: false,
        max_participants: false,
        staff_salary: false,
      },

      colors: [
        { id: "#D0FFF9", code: "#D0FFF9" },
        { id: "#C0DCFE", code: "#C0DCFE" },
        { id: "#C0EBFE", code: "#C0EBFE" },
        { id: "#C8F5D2", code: "#C8F5D2" },
        { id: "#E4FCB5", code: "#E4FCB5" },
        { id: "#FFF6B8", code: "#FFF6B8" },
        { id: "#FFE0B2", code: "#FFE0B2" },
        { id: "#FBD0E8", code: "#FBD0E8" },
        { id: "#FEC8C8", code: "#FEC8C8" },
        { id: "#E5D0FB", code: "#E5D0FB" },
        { id: "#D7DEE2", code: "#D7DEE2" },
        { id: "#E5CCC9", code: "#E5CCC9" },
      ],
    }),
    computed: {
      sessionTypeRules() {
        return {
          name: [
            (value) => {
              if (value) {
                this.sessionTypeValid.name = true;
                return true;
              }
              this.sessionTypeValid.name = false;
              return this.$vuetify.locale.t("$vuetify.global.name.validation");
            },
          ],
          description: [
            (value) => {
              if (value) {
                this.sessionTypeValid.description = true;
                return true;
              }
              this.sessionTypeValid.description = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.description.validation"
              );
            },
          ],
          length: [
            (value) => {
              if (value) {
                this.sessionTypeValid.length = true;
                return true;
              }
              this.sessionTypeValid.length = false;
              return false;
            },
          ],
          max_participants: [
            (value) => {
              if (value) {
                this.sessionTypeValid.max_participants = true;
                return true;
              }
              this.sessionTypeValid.max_participants = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.session.max_participants.validation"
              );
            },
          ],
          staff_salary: [
            (value) => {
              if (value) {
                this.sessionTypeValid.staff_salary = true;
                return true;
              }
              this.sessionTypeValid.staff_salary = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.session.coach.salary.validation"
              );
            },
          ],
        };
      },
    },
    methods: {
      close() {
        this.$emit("closeType");
        this.$nextTick(() => {
          Object.fromEntries(
            Object.keys(this.sessionTypeValid).map((key) => [key, false])
          );
          this.editedItem = Object.assign({}, this.defaultItem);
        });
      },
      passColor(code) {
        this.editedItem.color = code;
      },
      saveSessionType() {
        this.axios({
          url: `session_type/store`,
          method: "POST",
          data: this.editedItem,
        }).then((res) => {
          if (res.status) {
            this.close();
            this.$store.dispatch("sessions/fetchSessionsTypes", {
              type: this.scheduleType,
            });
          }
        });
      },
      sessionTypeCheck() {
        if (Object.values(this.sessionTypeValid).every((value) => !!value)) {
          this.validSessionType = true;
        } else {
          this.validSessionType = false;
        }
      },
    },
    watch: {
      typeDialog(newVal) {
        this.dialog = newVal;
        if (!newVal) {
          this.close();
          this.editedItem = Object.assign({}, this.defaultItem);
        } else {
          this.sessionsItems = this.$store.getters["sessions/sessionsTypes"];
        }
      },
      "editedItem.length": {
        handler: function (newVal) {
          if (newVal && newVal !== null) {
            this.sessionTypeValid.length = true;
          }
        },
        deep: true,
      },
      sessionTypeValid: {
        handler: function () {
          this.sessionTypeCheck();
        },
        deep: true,
      },
    },
    created() {
      this.dialog = this.typeDialog;
      this.editedItem.type = this.scheduleType;
      this.defaultItem.type = this.scheduleType;
    },
  };
</script>

<style lang="scss" scoped>
  .colors-palettes {
    .v-btn--active {
      border: 1px solid rgb(var(--v-theme-primary)) !important;
    }
  }
</style>
