<template>
  <v-row justify="center">
    <v-btn
      icon="fa-solid fa-x"
      size="small"
      variant="text"
      color="error"
      @click="dialog = true"
    ></v-btn>
    <v-dialog v-model="dialog" class="main-dialog" max-width="1024" scrollable>
      <form @submit.prevent="handleSubmit">
        <v-card>
          <v-toolbar
            color="primary"
            :title="$vuetify.locale.t('$vuetify.global.membership.cancel.this')"
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
                        '$vuetify.global.membership.cancel.reason.this'
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
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="px-2 py-3">
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
        start: null,
        status: "0",
        end: null,
      };
    },
    computed: {
      reasonItems() {
        return [
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.moving"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.medical"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.another_gym"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.didn't_like"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.expensive"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.other"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.intense"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.membership_change"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.no_time"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.didn't_wait"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.internal_mistake"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.freefit"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.credit_declined"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.credit_canceled"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.family"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.quaratine"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.coronavirus"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.facilities"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.not_enought_time"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.didn't_like_staff"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.pregnancy"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.traffic"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.competition"
          ),
          this.$vuetify.locale.t(
            "$vuetify.global.membership.cancel.reason.items.location_change"
          ),
        ];
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
          this.$emit("cancelMembership");
          this.dialog = false;
        });
      },
    },
    mounted() {},
  };
</script>
