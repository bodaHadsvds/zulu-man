<template>
  <the-page-head :items="pageCrumb" />
  <div class="py-4">
    <v-btn color="primary" variant="flat" dark @click="drawer = !drawer">
      {{ $vuetify.locale.t("$vuetify.global.session.add") }}
    </v-btn>
  </div>
  <form @submit.prevent="save">
    <v-navigation-drawer
      v-model="drawer"
      location="end"
      floating
      sticky
      temporary
      width="400"
      scrollable
    >
      <v-card class="h-100 d-flex flex-column rounded-0">
        <v-card-title class="pa-0">
          <v-toolbar color="backgorund" class="" :title="formTitle">
            <v-btn
              variant="text"
              icon="fa-solid fa-x"
              @click="close"
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
                        @click="dialog2 = true"
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
                  <v-col cols="12">
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
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.date.this')
                    "
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
                          $vuetify.locale.t(
                            "$vuetify.global.session.repeat.this"
                          )
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
                <div v-if="editedItem.repeat == '1'">
                  <v-col cols="12">
                    <p class="text-body-1 mb-2">
                      {{
                        $vuetify.locale.t("$vuetify.global.session.schedule_on")
                      }}
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
                  <v-col cols="12">
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
                </div>
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
      </v-card>
    </v-navigation-drawer>
  </form>
  <v-dialog v-model="dialog2" max-width="550" scrollable>
    <form @submit.prevent="saveSessionType">
      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar
            color="primary"
            :title="$vuetify.locale.t('$vuetify.global.session.type.add')"
          ></v-toolbar>
        </v-card-title>
        <v-card-text style="max-height: 70vh" class="pa-0">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem2.name"
                  :rules="sessionTypeRules.name"
                  :label="$vuetify.locale.t('$vuetify.global.name.this')"
                  :placeholder="
                    $vuetify.locale.t('$vuetify.global.name.placeholder')
                  "
                  type="text"
                  name="name"
                  density="compact"
                  :counter="10"
                  maxlength="10"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editedItem2.description"
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
                    v-model="editedItem2.length"
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
                      v-model="editedItem2.length"
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
              <v-col cols="12" v-if="!editedItem2.length">
                <p class="text-body-1 mb-4 text-error" color="error">
                  {{
                    $vuetify.locale.t(
                      "$vuetify.global.session.type.select_length"
                    )
                  }}
                </p>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  v-model="editedItem2.max_participants"
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
                  v-model="editedItem2.staff_salary"
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
          <v-btn variant="text" @click="dialog2 = false">
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
  import ThePageHead from "@/layouts/default/ThePageHead.vue";
  import { VStepper } from "vuetify/lib/labs/components.mjs";
  export default {
    components: {
      ThePageHead,
      VStepper,
    },
    data() {
      return {
        step: 1,
        validStep: false,
        validSessionType: false,
        search: null,
        selected: [],
        options: {},
        dialog2: false,
        dialogDelete: false,
        editedIndex: -1,
        editItemId: null,
        sessionsItems: [],
        coachesItems: [],
        countryItems: [],
        cityItems: [],
        weekDays: null,
        drawer: false,

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
        editedItem2: {
          name: null,
          description: null,
          length: null,
          max_participants: null,
          staff_salary: null,
        },
        defaultItem2: {
          name: null,
          description: null,
          length: null,
          max_participants: null,
          staff_salary: null,
        },
        sessionTypeValid: {
          name: false,
          description: false,
          length: false,
          max_participants: false,
          staff_salary: false,
        },
      };
    },
    computed: {
      pageCrumb() {
        return {
          icon: "fa-solid fa-calendar",
          pageTitle: this.$vuetify.locale.t(
            "$vuetify.nav_drawer.schedule.plural"
          ),
          items: [
            {
              title: this.$vuetify.locale.t(
                "$vuetify.nav_drawer.schedule.plural"
              ),
              disabled: true,
            },
          ],
        };
      },
      getSessions() {
        const sessions = this.$store.getters["sessions/sessions"].data;
        return sessions;
      },
      stepsItems() {
        return [
          this.$vuetify.locale.t("$vuetify.global.session.steps.details"),
          this.$vuetify.locale.t("$vuetify.global.session.steps.timing"),
        ];
      },
      formTitle() {
        return this.editedIndex === -1
          ? this.$vuetify.locale.t("$vuetify.global.session.add")
          : this.$vuetify.locale.t("$vuetify.global.session.edit");
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
    },
    methods: {
      editItem(item) {
        const sessionId = item.event._def.publicId;
        console.log(sessionId);
        this.editedIndex = this.calendarOptions.events.findIndex((object) => {
          return object.id == sessionId;
        });
        console.log(
          this.calendarOptions.events.findIndex((object) => {
            return object.id == sessionId;
          })
        );
        this.drawer = !this.drawer;
        this.axios({
          method: "get",
          url: `session/show/${sessionId}`,
        })
          .then((res) => {
            const dataObj = res.data.data;
            const data = {
              id: dataObj.id,
              session_type_id: dataObj.session_type_id,
              staff_id: dataObj.staff_id,
              max_participants: dataObj.max_participants,
              date: dataObj.date,
              time_from: dataObj.time_from,
              time_to: dataObj.time_to,
              repeat: dataObj.repeat,
              schedule_on: JSON.parse(dataObj.schedule_on),
              end_at: dataObj.end_at,
            };
            this.editedItem = Object.assign({}, data);
            this.editItemId = sessionId;
          })
          .finally(() => {});
      },
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

      close() {
        this.drawer = false;
        this.$nextTick(() => {
          Object.fromEntries(
            Object.keys(this.step1Valid).map((key) => [key, false])
          );
          Object.fromEntries(
            Object.keys(this.step2Valid).map((key) => [key, false])
          );
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
          this.step = 1;
        });
      },
      closeSessionType() {
        this.dialog2 = false;
        this.$nextTick(() => {
          Object.fromEntries(
            Object.keys(this.sessionTypeValid).map((key) => [key, false])
          );
          this.editedItem2 = Object.assign({}, this.defaultItem2);
        });
      },

      save() {
        if (this.editedIndex > -1) {
          this.axios({
            url: `session/update/${this.editItemId}`,
            method: "POST",
            data: this.editedItem,
          })
            .then((res) => {
              if (res.status) {
                Object.assign(
                  this.calendarOptions.events[this.editedIndex],
                  this.editedItem
                );
                this.loadSessions();
              }
            })
            .then(() => {
              this.close();
            });
        } else {
          this.axios({
            url: `session/store`,
            method: "POST",
            data: this.editedItem,
          })
            .then((res) => {
              if (res.status) {
                console.log("done");
                this.calendarOptions.events.unshift(this.editedItem);
                this.loadSessions();
              }
              console.log("not done");
            })
            .then(() => {
              this.close();
            });
        }
      },
      saveSessionType() {
        this.axios({
          url: `session_type/store`,
          method: "POST",
          data: this.editedItem2,
        }).then((res) => {
          if (res.status) {
            this.closeSessionType();
            this.$store.dispatch("sessions/fetchSessionsTypes");
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
      getSessionsTypes(newVal) {
        this.sessionsItems = newVal;
      },

      // ------------missing
      drawer(newVal) {
        if (!newVal) {
          this.close();
          this.editedItem = Object.assign({}, this.defaultItem);
          this.sessionsItems = [];
          this.coachesItems = [];
        } else {
          this.sessionsItems = this.$store.getters["sessions/sessionsTypes"];
          for (const item of this.$store.getters["staff/staff"].data) {
            this.coachesItems.push({
              text: `${item.first_name} ${item.last_name}`,
              id: item.id,
            });
          }
        }
      },

      // ------------missing

      // ------------missing
      dialog2(newVal) {
        if (!newVal) {
          this.closeSessionType();
          this.editedItem2 = Object.assign({}, this.defaultItem2);
        } else {
          this.sessionsItems = this.$store.getters["sessions/sessionsTypes"];
        }
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

      // ------------missing

      // ------------missing
      sessionTypeValid: {
        handler: function () {
          this.sessionTypeCheck();
        },
        deep: true,
      },
    },
    created() {
      this.$store.dispatch("sessions/fetchSessionsTypes");
      this.$store.dispatch("staff/fetchStaff", {
        per_page: -1,
        page: 1,
      });
      this.loadWeekDays();
    },
  };
</script>

<style lang="scss">
  .fc-prev-button,
  .fc-next-button,
  .fc-today-button,
  .fc-button-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(var(--v-theme-primary)) !important;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
  }
  .fc-button-active {
    background-color: rgb(var(--v-theme-primary), 0.8) !important;
  }
  .fc .fc-button .fc-icon {
    all: unset;
  }
</style>
<style lang="scss" scoped>
  :deep() {
    .v-slide-group__content {
      flex-wrap: wrap;
    }
    .v-slide-group__next {
      flex: 0 1 22px;
      justify-content: flex-end;
      min-width: 22px;
    }
    .v-slide-group__prev {
      flex: 0 1 22px;
      justify-content: flex-start;
      min-width: 22px;
    }
  }
</style>
