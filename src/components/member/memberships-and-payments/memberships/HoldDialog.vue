<template>
  <v-row justify="center">
    <v-btn
      icon="fa-solid fa-pause"
      size="small"
      variant="text"
      color="grey-darken-1"
      @click="dialog = true"
    ></v-btn>
    <v-dialog v-model="dialog" class="main-dialog" max-width="1024" scrollable>
      <form @submit.prevent="handleSubmit">
        <v-card>
          <v-toolbar
            color="primary"
            :title="$vuetify.locale.t('$vuetify.global.membership.hold.this')"
          ></v-toolbar>
          <v-card-text style="max-height: 50vh" class="pa-0">
            <v-container>
              <v-row>
                <v-col cols="4">
                  <v-select
                    v-model="reason"
                    :items="reasonItems"
                    :label="
                      $vuetify.locale.t(
                        '$vuetify.global.membership.hold.reason.this'
                      )
                    "
                    name="reason"
                    density="compact"
                    variant="outlined"
                    clearable
                    required
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    :label="$vuetify.locale.t('$vuetify.global.start.this')"
                    type="date"
                    name="start"
                    v-model="start"
                    density="compact"
                    variant="outlined"
                    clearable
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    :label="$vuetify.locale.t('$vuetify.global.end.this')"
                    type="date"
                    name="end"
                    v-model="end"
                    density="compact"
                    variant="outlined"
                    clearable
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    :label="$vuetify.locale.t('$vuetify.global.day.plural')"
                    type="number"
                    name="days"
                    v-model="days"
                    density="compact"
                    variant="outlined"
                    readonly=""
                    min="0"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="plain" @click="dialog = false" type="button">
              {{ $vuetify.locale.t("$vuetify.global.close") }}
            </v-btn>
            <v-btn color="primary" elevation="0" variant="flat" type="submit">
              {{ $vuetify.locale.t("$vuetify.global.save") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: {
      userId: {
        required: true,
      },
      id: {
        required: true,
      },
    },
    data() {
      return {
        dialog: false,
        reason: null,
        status: "2",
        start: null,
        end: null,
      };
    },
    computed: {
      reasonItems() {
        return [
          this.$vuetify.locale.t(
            "$vuetify.global.membership.hold.reason.items.medical_reason"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.hold.reason.items.military_duty"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.hold.reason.items.vacation"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.hold.reason.items.studies"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.hold.reason.items.other"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.hold.reason.items.pregnancy"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.hold.reason.items.personal"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.hold.reason.items.grief"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.hold.reason.items.marriage"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.hold.reason.items.coronavirus"
          ),
        ];
      },
      days() {
        var date1 = new Date(this.start);
        var date2 = new Date(this.end);
        if (this.start && this.end) {
          var Difference_In_Time = date2.getTime() - date1.getTime();
          return Difference_In_Time / (1000 * 3600 * 24);
        }
        return 0;
      },
    },
    methods: {
      handleSubmit() {
        this.axios({
          url: `user/delete_membership/${this.id}`,
          method: "POST",
          data: {
            user_id: this.userId,
            status: this.status,
            reason: this.reason,
            start: this.start,
            end: this.end,
          },
        }).then(() => {
          this.$emit("holdMembership");
          this.dialog = false;
        });
      },
    },
  };
</script>
