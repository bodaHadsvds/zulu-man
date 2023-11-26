<template>
  <v-card class="h-100 d-flex flex-column rounded-0">
    <form @submit.prevent="save" class="d-flex flex-column h-100 w-100">
      <v-card-title class="pa-0">
        <v-toolbar color="backgorund" class="" :title="formTitle">
          <v-btn
            variant="text"
            icon="fa-solid fa-x"
            @click="closeEvent"
            size="small"
          ></v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text class="flex-fill overflow-auto pa-0">
        <v-stepper
          v-model="step"
          :items="stepsItems"
          class="elevation-0"
          hide-actions
        >
          <template v-slot:[`item.1`]>
            <h3 class="text-h5 mb-4">
              {{ $vuetify.locale.t("$vuetify.global.session.steps.details") }}
            </h3>
            <v-sheet>
              <v-row>
                <v-col cols="12">
                  <div class="d-flex align-center" style="gap: 20px">
                    <v-autocomplete
                      v-model="editedItem.session_type_id"
                      :rules="step1Rules.sessionType"
                      :label="$vuetify.locale.t('$vuetify.global.name.this')"
                      :placeholder="
                        $vuetify.locale.t('$vuetify.global.name.placeholder')
                      "
                      item-value="id"
                      item-title="text"
                      :items="sessionsItems"
                      name="session_type_id"
                      density="compact"
                      variant="outlined"
                      :loading="editedItem.sessionTypeLoading"
                    >
                    </v-autocomplete>
                    <v-btn
                      color="primary"
                      size="small"
                      variant="text"
                      prepend-icon="fa-solid fa-plus"
                      style="margin-bottom: 22px; padding: 0"
                      @click="sessionTypeDialog = true"
                    >
                      {{
                        $vuetify.locale.t(
                          "$vuetify.global.session.create_another"
                        )
                      }}
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    v-model="editedItem.staff_id"
                    :rules="step1Rules.coach"
                    :label="
                      $vuetify.locale.t('$vuetify.global.session.coach.this')
                    "
                    :placeholder="
                      $vuetify.locale.t(
                        '$vuetify.global.session.coach.placeholder'
                      )
                    "
                    item-value="id"
                    item-title="text"
                    :items="coachesItems"
                    name="staff_id"
                    density="compact"
                    variant="outlined"
                    :loading="editedItem.coachLoading"
                  >
                    <!-- <template v-slot:selection="{ props, item }">
                                  <v-chip
                                    v-bind="props"
                                    prepend-avatar="@/assets/logo.svg"
                                    :text="item.raw.text"
                                    style="background-color: none"
                                  ></v-chip>
                                </template>
                                <template v-slot:item="{ props, item }">
                                  <v-list-item
                                    v-bind="props"
                                    prepend-avatar="@/assets/logo.svg"
                                    :text="item.raw.text"
                                  ></v-list-item>
                                </template> -->
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" v-if="type === 'session' || type === 'course'">
                  <v-text-field
                    v-model="editedItem.max_participants"
                    :rules="step1Rules.maxParticipants"
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
                    min="1"
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-sheet>
          </template>

          <template v-slot:[`item.2`]>
            <h3 class="text-h5 mb-4">
              {{ $vuetify.locale.t("$vuetify.global.session.steps.timing") }}
            </h3>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.date"
                  :rules="step2Rules.date"
                  :label="$vuetify.locale.t('$vuetify.global.date.this')"
                  :placeholder="$vuetify.locale.t('$vuetify.global.date.this')"
                  type="date"
                  name="date"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.time_from"
                  :rules="step2Rules.timeFrom"
                  :label="$vuetify.locale.t('$vuetify.global.start.this')"
                  :placeholder="
                    $vuetify.locale.t('$vuetify.global.start.placeholder')
                  "
                  type="time"
                  name="time_from"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.time_to"
                  :rules="step2Rules.timeTo"
                  :label="$vuetify.locale.t('$vuetify.global.end.this')"
                  :placeholder="
                    $vuetify.locale.t('$vuetify.global.end.placeholder')
                  "
                  type="time"
                  name="time_to"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-radio-group v-model="editedItem.repeat">
                  <template v-slot:label>
                    <div>
                      {{
                        $vuetify.locale.t("$vuetify.global.session.repeat.this")
                      }}
                    </div>
                  </template>
                  <v-radio value="1" color="primary">
                    <template v-slot:label>
                      <div>
                        {{
                          $vuetify.locale.t(
                            "$vuetify.global.session.repeat.weekly"
                          )
                        }}
                      </div>
                    </template>
                  </v-radio>
                  <v-radio value="0" color="primary">
                    <template v-slot:label>
                      <div>
                        {{
                          $vuetify.locale.t(
                            "$vuetify.global.session.repeat.single"
                          )
                        }}
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" v-if="editedItem.repeat == '1'">
                <p class="text-body-1 mb-2">
                  {{ $vuetify.locale.t("$vuetify.global.session.schedule_on") }}
                </p>
                <v-slide-group
                  v-model="editedItem.schedule_on"
                  selected-class="bg-primary"
                  multiple
                  show-arrows
                >
                  <v-slide-group-item
                    v-for="day in weekDays"
                    :key="day.id"
                    v-slot="{ isSelected, toggle, selectedClass }"
                  >
                    <v-btn
                      color="grey-lighten-1"
                      :class="['me-4', selectedClass]"
                      outline
                      elevation="0"
                      :variant="isSelected ? 'flat' : 'outlined'"
                      @click="toggle"
                    >
                      <div
                        class="d-flex fill-height align-center justify-center"
                      >
                        {{ day.abbr }}
                      </div>
                    </v-btn>
                  </v-slide-group-item>
                </v-slide-group>
              </v-col>
              <v-col cols="12" v-if="editedItem.repeat == '1'">
                <v-text-field
                  v-model="editedItem.end_at"
                  :rules="step2Rules.endAt"
                  :label="$vuetify.locale.t('$vuetify.global.end.this')"
                  :placeholder="
                    $vuetify.locale.t('$vuetify.global.end.placeholder')
                  "
                  type="date"
                  name="end_at"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
        </v-stepper>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="px-2 py-3">
        <v-btn
          variant="text"
          color="error"
          type="button"
          @click="deleteItem"
          v-if="editedIndex > -1"
        >
          {{ $vuetify.locale.t("$vuetify.global.delete") }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="text-none text-subtitle-1 me-3"
          color="secondary"
          variant="flat"
          @click="prev"
          :disabled="step == 1"
          type="button"
        >
          {{ $vuetify.locale.t("$vuetify.global.back") }}
        </v-btn>
        <v-btn
          class="text-none text-subtitle-1"
          color="primary"
          variant="flat"
          @click.prevent="next"
          type="button"
          :disabled="!validStep"
          v-if="step < 2"
        >
          {{ $vuetify.locale.t("$vuetify.global.next") }}
        </v-btn>
        <v-btn
          class="text-none text-subtitle-1"
          color="primary"
          variant="flat"
          type="submit"
          :disabled="!validStep"
          v-if="step >= 2"
        >
          {{ $vuetify.locale.t("$vuetify.global.done") }}
        </v-btn>
        <!-- <v-btn
                    color="primary"
                    variant="flat"
                    type="submit"
                    :disabled="!validStep"
                  >
                    Save
                  </v-btn> -->
      </v-card-actions>
    </form>
  </v-card>
  <delete-dialog
    v-model="dialogDelete"
    @close="closeDelete"
    :editedId="editItemId"
    :close-event="closeEvent"
  />
  <add-type-dialog
    v-model="sessionTypeDialog"
    :type-dialog="sessionTypeDialog"
    :schedule-type="type"
    @closeType="sessionTypeDialog = false"
  />
</template>
<script>
  import { VStepper } from "vuetify/lib/labs/components.mjs";
  import DeleteDialog from "@/components/schedules/dialogs/DeleteDialog.vue";
  import AddTypeDialog from "@/components/schedules/dialogs/AddTypeDialog.vue";
  export default {
    components: { DeleteDialog, VStepper, AddTypeDialog },
    props: ["editedId", "editedIdx", "editedItm", "closeEvent", "type"],
    data: () => ({
      step: 1,
      validStep: false,
      validSessionType: false,
      editItemId: null,
      editedIndex: null,
      sessionsItems: [],
      coachesItems: [],
      countryItems: [],
      cityItems: [],
      weekDays: null,
      dialogDelete: false,
      sessionTypeDialog: false,
      editedItem: {
        session_type_id: null,
        sessionTypeLoading: false,
        staff_id: null,
        coachLoading: false,
        max_participants: null,
        date: null,
        time_from: null,
        time_to: null,
        repeat: "1",
        schedule_on: [],
        end_at: null,
      },
      defaultItem: {
        session_type_id: null,
        sessionTypeLoading: false,
        staff_id: null,
        coachLoading: false,
        max_participants: null,
        date: null,
        time_from: null,
        time_to: null,
        repeat: "1",
        schedule_on: [],
        end_at: null,
      },
      step1Valid: {
        sessionType: false,
        coach: false,
        maxParticipants: false,
      },
      step2Valid: {
        date: false,
        timeFrom: false,
        timeTo: false,
        endAt: false,
      },
    }),
    computed: {
      formTitle() {
        const title = () => {
          if (this.editedIndex === -1) {
            return this.$vuetify.locale.t(`$vuetify.global.${this.type}.add`);
          } else {
            return this.$vuetify.locale.t(`$vuetify.global.${this.type}.edit`);
          }
        };
        return title();
      },
      stepsItems() {
        return [
          this.$vuetify.locale.t("$vuetify.global.session.steps.details"),
          this.$vuetify.locale.t("$vuetify.global.session.steps.timing"),
        ];
      },

      step1Rules() {
        return {
          sessionType: [
            (value) => {
              if (value) {
                this.step1Valid.sessionType = true;
                return true;
              }
              this.step1Valid.sessionType = false;
              return this.$vuetify.locale.t("$vuetify.global.name.validation");
            },
          ],
          coach: [
            (value) => {
              if (value) {
                this.step1Valid.coach = true;
                return true;
              }
              this.step1Valid.coach = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.session.coach.validation"
              );
            },
          ],
          maxParticipants: [
            (value) => {
              if (value) {
                this.step1Valid.maxParticipants = true;
                return true;
              }
              this.step1Valid.maxParticipants = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.session.max_participants.validation"
              );
            },
          ],
        };
      },
      getWeekDays() {
        return this.$store.getters["sessions/weekDays"];
      },
      step2Rules() {
        return {
          date: [
            (value) => {
              if (value) {
                this.step2Valid.date = true;
                return true;
              }
              this.step2Valid.date = false;
              return this.$vuetify.locale.t("$vuetify.global.date.validation");
            },
          ],
          timeFrom: [
            (value) => {
              if (value) {
                this.step2Valid.timeFrom = true;
                return true;
              }
              this.step2Valid.timeFrom = false;
              return this.$vuetify.locale.t("$vuetify.global.start.validation");
            },
          ],
          timeTo: [
            (value) => {
              if (value) {
                this.step2Valid.timeTo = true;
                return true;
              }
              this.step2Valid.timeTo = false;
              return this.$vuetify.locale.t("$vuetify.global.end.validation");
            },
          ],
          endAt: [
            (value) => {
              if (value) {
                this.step2Valid.endAt = true;
                return true;
              }
              this.step2Valid.endAt = false;
              return this.$vuetify.locale.t("$vuetify.global.end.validation");
            },
          ],
        };
      },

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
      getSessionsTypes() {
        return this.$store.getters["sessions/sessionsTypes"];
      },
      getCoaches() {
        return this.$store.getters["staff/staff"].data;
      },
    },
    methods: {
      prev() {
        if (this.step > 1) {
          this.step -= 1;
        }
      },
      next() {
        if (this.step < this.stepsItems.length) {
          this.step += 1;
          this.validStep = false;
        } else if (this.step >= 3) {
          this.validStep = true;
        }
      },
      stepOneCheck() {
        if (Object.values(this.step1Valid).every((value) => !!value)) {
          this.validStep = true;
        } else {
          this.validStep = false;
        }
      },
      stepTwoCheck() {
        if (Object.values(this.step2Valid).every((value) => !!value)) {
          this.validStep = true;
        } else {
          this.validStep = false;
        }
      },
      loadWeekDays() {
        this.$store.dispatch("sessions/fetchWeekDays");
      },
      save() {
        if (this.editedIndex > -1) {
          this.axios({
            url: `session/update/${this.editItemId}`,
            method: "POST",
            data: this.editedItem,
          }).then((res) => {
            console.log(res);
            if (res.status) {
              this.$emit("refresh");
              this.closeEvent();
              this.step = 1;
            }
          });
        } else {
          this.axios({
            url: `session/store`,
            method: "POST",
            data: this.editedItem,
          }).then((res) => {
            console.log(res);
            if (res.status) {
              this.$emit("refresh");
              this.closeEvent();
              this.step = 1;
            }
          });
        }
      },
      // close() {
      //   this.$emit("closeDrawer");
      // },
      deleteItem() {
        this.dialogDelete = true;
      },
      closeDelete() {
        this.dialogDelete = false;
        this.$emit("refresh");
      },
    },
    watch: {
      getSessionsTypes(newVal) {
        this.sessionsItems = newVal;
      },
      getWeekDays(newVal) {
        this.weekDays = newVal;
      },
      step1Valid: {
        handler: function () {
          this.stepOneCheck();
        },
        deep: true,
      },
      step2Valid: {
        handler: function () {
          this.stepTwoCheck();
        },
        deep: true,
      },
      step(newVal) {
        if (newVal == 1) {
          this.stepOneCheck();
        } else if (newVal == 2) {
          this.stepTwoCheck();
        }
      },
      getCoaches(newVal) {
        this.coachesItems = [];
        for (const item of newVal) {
          this.coachesItems.push({
            text: `${item.first_name} ${item.last_name}`,
            id: item.id,
          });
        }
      },
      editedId(newVal) {
        this.editItemId = newVal;
      },
      editedIdx(newVal) {
        this.editedIndex = newVal;
      },
      editedItm(newVal) {
        if (this.editedIdx > -1) {
          const data = {
            id: newVal.id,
            session_type_id: newVal.session_type_id,
            staff_id: newVal.staff_id,
            max_participants: newVal.max_participants,
            date: newVal.date,
            time_from: newVal.time_from,
            time_to: newVal.time_to,
            repeat: newVal.repeat,
            schedule_on: JSON.parse(newVal.schedule_on),
            end_at: newVal.end_at,
          };
          console.log(data);
          this.editedItem = Object.assign({}, data);
        } else {
          this.editedItem = Object.assign({}, this.defaultItem);
        }
      },
      "editedItem.repeat": {
        handler: function (newVal) {
          if (newVal && newVal === "0") {
            this.step2Valid.schedule_on = true;
            this.step2Valid.endAt = true;
          } else {
            this.step2Valid.schedule_on = true;
            this.step2Valid.endAt = true;
          }
        },
        deep: true,
      },
    },
    created() {
      this.$store.dispatch("sessions/fetchSessionsTypes", {
        type: this.type,
      });
      this.$store.dispatch("staff/fetchStaff", {
        per_page: -1,
        page: 1,
      });
      this.loadWeekDays();
      this.editItemId = this.editedId;
      this.editedIndex = this.editedIdx;
      if (this.type !== "session") {
        this.step1Valid.maxParticipants = true;
      }
    },
    updated() {
      this.step = 1;
    },
    emits: ["closeDrawer", "refresh"],
  };
</script>
