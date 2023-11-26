<template>
  <v-bottom-sheet scrollable>
    <v-card>
      <!-- <v-toolbar color="primary" :title="$vuetify.locale.t('$vuetify.global.FutureBookings')"> -->
      <v-toolbar color="primary" title="dddddd">

        <!-- <v-stepper :items="['Step 1', 'Step 2', 'Step 3']">
  <template v-slot:item.1>
    <v-card title="Step One" flat>...</v-card>
  </template>

  <template v-slot:item.2>
    <v-card title="Step Two" flat>...</v-card>
  </template>

  <template v-slot:item.3>
    <v-card title="Step Three" flat>...</v-card>
  </template>
</v-stepper> -->









<v-stepper v-model="step" :items="stepsItems" class="elevation-0" hide-actions>
          <template v-slot:[`item.1`]>
            <h3 class="text-h5 mb-4">
              {{
                $vuetify.locale.t("$vuetify.nav_drawer.quick_access_menu.new_member_menu.purchases")
              }}
            </h3>
            <v-sheet>
              <v-row>
                <v-col cols="12" md="2">
                  <v-select
                    v-model="itemsTypes"
                    :rules="step1Rules.typesRules"
                    :label="$vuetify.locale.t('$vuetify.global.type.this')"
                    name="type"
                    :placeholder="$vuetify.locale.t('$vuetify.global.type.placeholder')"
                    :items="typesItems"
                    item-title="text"
                    item-value="value"
                    density="compact"
                    variant="outlined"
                    clearable
                    validate-on="input"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" md="2">
                  <v-select
                    v-model="purchaseItem"
                    :rules="step1Rules.purchaseItemRules"
                    :loading="itemsLoading"
                    :label="
                      itemsTypes
                        ? $vuetify.locale.t('$vuetify.global.item.this')
                        : $vuetify.locale.t('$vuetify.global.select_item_first')
                    "
                    name="item_id"
                    :placeholder="$vuetify.locale.t('$vuetify.global.item.placeholder')"
                    :items="purchaseItemItems"
                    item-title="text"
                    item-value="value"
                    density="compact"
                    variant="outlined"
                    clearable
                    validate-on="input"
                    required
                    :disabled="!itemsTypes"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="itemPrice"
                    :rules="step1Rules.itemPriceRules"
                    type="number"
                    :label="
                      purchaseItem
                        ? $vuetify.locale.t('$vuetify.global.price.this')
                        : $vuetify.locale.t('$vuetify.global.select_item_first')
                    "
                    name="price"
                    min="0"
                    :placeholder="$vuetify.locale.t('$vuetify.global.price.placeholder')"
                    density="compact"
                    variant="outlined"
                    validate-on="input"
                    required
                    :disabled="!purchaseItem"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2" v-if="itemsTypes === 'product'">
                  <v-text-field
                    v-model="quantity"
                    :rules="step1Rules.quantityRules"
                    type="number"
                    :label="$vuetify.locale.t('$vuetify.global.qty.this')"
                    name="quantity"
                    :placeholder="$vuetify.locale.t('$vuetify.global.qty.placeholder')"
                    density="compact"
                    variant="outlined"
                    validate-on="input"
                    required
                    :disabled="!purchaseItem"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="2" v-if="itemsTypes !== 'product'">
                  <v-text-field
                    v-model="startDate"
                    :rules="step1Rules.startDateRules"
                    type="date"
                    :label="$vuetify.locale.t('$vuetify.global.start.this')"
                    name="start"
                    :placeholder="$vuetify.locale.t('$vuetify.global.start.placeholder')"
                    density="compact"
                    variant="outlined"
                    validate-on="input"
                    required
                    :disabled="!purchaseItem"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2" v-if="itemsTypes !== 'product'">
                  <v-text-field
                    v-model="endDate"
                    :rules="step1Rules.endDateRules"
                    type="date"
                    :label="$vuetify.locale.t('$vuetify.global.end.this')"
                    name="end"
                    :placeholder="$vuetify.locale.t('$vuetify.global.end.placeholder')"
                    density="compact"
                    variant="outlined"
                    validate-on="input"
                    required
                    :disabled="!purchaseItem"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" v-if="!itemsTypes">
                  <p class="text-body-1 mb-4 text-error" color="error">
                    {{ $vuetify.locale.t("$vuetify.global.select_item_first_to_continue") }}*
                  </p>
                </v-col>
                <v-col cols="12">
                  <v-radio-group v-model="PaymentMethod" inline>
                    <template v-slot:label>
                      <div>
                        {{
                          $vuetify.locale.t(
                            "$vuetify.nav_drawer.quick_access_menu.new_member_menu.allow_payment_practices"
                          )
                        }}
                      </div>
                    </template>
                    <v-radio
                      :label="
                        $vuetify.locale.t(
                          '$vuetify.nav_drawer.quick_access_menu.new_member_menu.paying_now'
                        )
                      "
                      value="cash"
                      class="me-4"
                    ></v-radio>
                    <div class="d-flex align-center" style="gap: 10px">
                      <v-radio
                        :label="
                          $vuetify.locale.t(
                            '$vuetify.nav_drawer.quick_access_menu.new_member_menu.enter_debt'
                          )
                        "
                        value="debet"
                      ></v-radio>
                      <v-responsive max-width="150" v-if="PaymentMethod === 'debet'">
                        <v-text-field
                          v-model="debtBalance"
                          :rules="step1Rules.debtBalanceRules"
                          type="number"
                          min="0"
                          :max="itemPrice"
                          :label="
                            $vuetify.locale.t(
                              '$vuetify.nav_drawer.quick_access_menu.new_member_menu.balance.this'
                            )
                          "
                          name="balance"
                          :placeholder="
                            $vuetify.locale.t(
                              '$vuetify.nav_drawer.quick_access_menu.new_member_menu.balance.placeholder'
                            )
                          "
                          density="compact"
                          variant="outlined"
                          hide-details
                          single-line
                          validate-on="input"
                          required
                        ></v-text-field>
                      </v-responsive>
                    </div>
                  </v-radio-group>
                </v-col>
              </v-row>

              <v-divider :thickness="1" class="border-opacity-100 mb-4" color="primary"></v-divider>

              <ul>
                <li class="d-flex align-center justify-end mb-5" style="gap: 10px">
                  <p class="text-body-1">
                    {{ $vuetify.locale.t("$vuetify.summary.subtotal.this") }}
                  </p>
                  <v-responsive max-width="100">
                    <v-text-field
                      v-model="subtotal"
                      name="subtotal"
                      type="number"
                      min="0"
                      density="compact"
                      variant="underlined"
                      hide-details
                      single-line=""
                      readonly
                    ></v-text-field>
                  </v-responsive>
                </li>
                <li class="d-flex align-center justify-end mb-5" style="gap: 10px">
                  <p class="text-body-1">
                    {{ $vuetify.locale.t("$vuetify.summary.discount.this") }}(%)
                  </p>
                  <v-responsive max-width="100">
                    <v-text-field
                      v-model="discountPercent"
                      type="number"
                      name="discount_percent"
                      min="0"
                      max="100"
                      density="compact"
                      variant="underlined"
                      @blur="handlePrecentDisc"
                      hide-details
                      single-line
                      suffix="%"
                    ></v-text-field>
                  </v-responsive>
                </li>
                <li class="d-flex align-center justify-end mb-5" style="gap: 10px">
                  <p class="text-body-1">
                    {{ $vuetify.locale.t("$vuetify.summary.discount.this") }}({{
                      $vuetify.locale.t("$vuetify.signs.egp")
                    }})
                  </p>
                  <v-responsive max-width="100">
                    <v-text-field
                      v-model="discountMoney"
                      type="number"
                      name="discount_money"
                      min="0"
                      density="compact"
                      variant="underlined"
                      @blur="handleMoneyDisc"
                      hide-details
                      single-line
                      :suffix="$vuetify.locale.t('$vuetify.signs.egp')"
                    ></v-text-field>
                  </v-responsive>
                </li>
                <li class="d-flex align-center justify-end mb-5" style="gap: 10px">
                  <p class="text-body-1">
                    {{ $vuetify.locale.t("$vuetify.summary.final_charge.this") }}
                  </p>
                  <v-responsive max-width="100">
                    <v-text-field
                      v-model="finalSubtotal"
                      type="number"
                      name="final_charge"
                      min="0"
                      density="compact"
                      variant="solo-filled"
                      hide-details
                      single-line
                      readonly
                    ></v-text-field>
                  </v-responsive>
                </li>
              </ul>
            </v-sheet>
          </template>

          <template v-slot:[`item.2`]>
            <h3 class="text-h6">
              {{
                $vuetify.locale.t("$vuetify.nav_drawer.quick_access_menu.new_member_menu.payment")
              }}
            </h3>
            <div class="d-flex flex-column align-center justify-center h-100">
              <div class="d-flex align-center justify-center flex-wrap mb-4" style="gap: 10px">
                <p class="text-body-1">
                  {{
                    $vuetify.locale.t(
                      "$vuetify.nav_drawer.quick_access_menu.new_member_menu.the_amount_required"
                    )
                  }}:
                </p>
                <v-chip color="primary" class="text-h4 h-auto">
                  {{ finalSubtotal + $vuetify.locale.t("$vuetify.signs.egp") }}
                </v-chip>
              </div>
              <v-checkbox
                v-model="sendEmail"
                :label="
                  $vuetify.locale.t(
                    '$vuetify.nav_drawer.quick_access_menu.new_member_menu.send_via_email'
                  )
                "
                color="primary"
                name="send_email"
              ></v-checkbox>
            </div>
          </template>
        </v-stepper>




















        <v-btn
          icon="fa-solid fa-x"
          variant="text"
          :ripple="false"
          @click="closeSheet"
          size="small"
        ></v-btn>
      </v-toolbar>
      <v-card-text class="pa-0"> </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import { VBottomSheet } from "vuetify/lib/labs/components.mjs";
export default {
  components: { VBottomSheet },
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
        pageTitle: this.$vuetify.locale.t("$vuetify.nav_drawer.schedule.plural"),
        items: [
          {
            title: this.$vuetify.locale.t("$vuetify.nav_drawer.schedule.plural"),
            disabled: true,
          },
        ],
      };
    },
    getFutureSessions() {
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
            return this.$vuetify.locale.t("$vuetify.global.session.coach.validation");
          },
        ],
        maxParticipants: [
          (value) => {
            if (value) {
              this.step1Valid.maxParticipants = true;
              return true;
            }
            this.step1Valid.maxParticipants = false;
            return this.$vuetify.locale.t("$vuetify.global.session.max_participants.validation");
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
            return this.$vuetify.locale.t("$vuetify.global.description.validation");
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
            return this.$vuetify.locale.t("$vuetify.global.session.max_participants.validation");
          },
        ],
        staff_salary: [
          (value) => {
            if (value) {
              this.sessionTypeValid.staff_salary = true;
              return true;
            }
            this.sessionTypeValid.staff_salary = false;
            return this.$vuetify.locale.t("$vuetify.global.session.coach.salary.validation");
          },
        ],
      };
    },
    getSessionsTypes() {
      return this.$store.getters["sessions/sessionsTypes"];
    },
  },
  methods: {
    closeSheet() {
      this.$emit("close");
    },
    loadSessions() {
      this.$store.dispatch("sessions/fetchFutureSessions", {
        per_page: -1,
        page: 1,
      });
    },
    loadMember() {
      console.log("aaaa");
      this.dataseesions = [];
      this.$store.dispatch("sessions/fetchFutureSessions", {
        per_page: -1,
        page: 1,
      });
    },
    created() {
      this.loadSessions();
      this.loadMember();
      this.calendarOptions.now = this.currentDate;
      this.calendarOptions.dateClick = this.handleDateClick;
      this.calendarOptions.eventClick = this.getScheduleInfo;
      this.filters = this.$store.getters["sessions/filterOpts"];
    },
  },
  // watch: {
  //   getFutureSessions(newVal) {
  //     this.calendarOptions.events = [];
  //     for (const item of newVal) {
  //       if (item.schedule_on.length > 0) {
  //         this.calendarOptions.events.push({
  //           id: item.id,
  //           title: item.name,
  //           coach: item.coach,
  //           max_participants: item.max_participants,
  //           startTime: item.time_from,
  //           endTime: item.time_to,
  //           allDay: false,
  //           daysOfWeek: item.schedule_on,
  //           startRecur: item.date,
  //           endRecur: item.end_at,
  //           backgroundColor: item.color,
  //           borderColor: item.color,
  //           className: item.className,
  //         });
  //       } else {
  //         this.calendarOptions.events.push({
  //           id: item.id,
  //           title: item.name,
  //           coach: item.coach,
  //           max_participants: item.max_participants,
  //           start: `${item.date}T${item.time_from}`,
  //           endTime: `${item.date}T${item.time_to}`,
  //           allDay: false,
  //           backgroundColor: item.color,
  //           borderColor: item.color,
  //           className: item.className,
  //         });
  //       }
  //     }
  //   },
  // },
};
</script>
