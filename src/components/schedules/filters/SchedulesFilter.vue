<template>
  <v-menu v-model="menu" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn
        variant="text"
        size="small"
        v-bind="props"
        icon="fa-solid fa-filter fa-lg"
      ></v-btn>
    </template>
    <v-card max-width="300" min-width="280">
      <v-card-title>Filters</v-card-title>
      <v-card-text style="max-height: 70vh; overflow: auto">
        <v-container class="px-0">
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="form.staff_id"
                :label="$vuetify.locale.t('$vuetify.global.session.coach.this')"
                :placeholder="
                  $vuetify.locale.t('$vuetify.global.session.coach.placeholder')
                "
                item-value="id"
                item-title="text"
                :items="coachesItems"
                name="staff_id"
                density="compact"
                variant="outlined"
                :loading="coachLoading"
                multiple
                chips
                closable-chips
                hide-details
                clearable
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
              <p class="text-body-2 mb-1">Event Type</p>
              <v-checkbox
                v-model="form.event_type"
                hide-details
                color="primary"
                :label="$vuetify.locale.t(`$vuetify.global.session.this`)"
                value="session"
              ></v-checkbox>
              <v-checkbox
                v-model="form.event_type"
                hide-details
                color="primary"
                :label="$vuetify.locale.t(`$vuetify.global.appointment.this`)"
                value="appointment"
                class="pa-0"
              ></v-checkbox>
              <v-checkbox
                v-model="form.event_type"
                hide-details
                color="primary"
                :label="$vuetify.locale.t(`$vuetify.global.course.this`)"
                value="course"
              ></v-checkbox>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 mb-1">Event status</p>
              <v-checkbox
                v-model="form.event_status"
                hide-details
                color="primary"
                :label="$vuetify.locale.t(`$vuetify.global.active`)"
                :value="1"
              ></v-checkbox>
              <v-checkbox
                v-model="form.event_status"
                hide-details
                color="primary"
                label="cancelled"
                :value="0"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          variant="outlined"
          @click="handleSubmit('clear')"
        >
          clear
        </v-btn>
        <v-btn color="primary" variant="flat" @click="handleSubmit('filter')">
          filter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
  export default {
    data: () => ({
      menu: false,
      form: {
        staff_id: [],
        event_type: [],
        event_status: [],
      },
      defaultForm: {
        staff_id: [],
        event_type: [],
        event_status: [],
      },
      coachesItems: [],
      coachLoading: false,
    }),
    computed: {
      getCoaches() {
        return this.$store.getters["staff/staff"].data;
      },
    },
    methods: {
      loadCoaches() {
        this.$store.dispatch("staff/fetchStaff", {
          per_page: -1,
          page: 1,
        });
      },
      handleSubmit(action) {
        if (action === "clear") {
          this.form = Object.assign({}, this.defaultForm);
          this.$nextTick(() => {
            this.$emit("filter", this.defaultForm);
          });
        } else {
          this.$emit("filter", this.form);
        }
        this.menu = !this.menu;
      },
    },
    watch: {
      getCoaches(newVal) {
        this.coachesItems = [];
        for (const item of newVal) {
          this.coachesItems.push({
            text: `${item.first_name} ${item.last_name}`,
            id: item.id,
          });
        }
      },
    },
    created() {
      this.loadCoaches();
    },
  };
</script>
