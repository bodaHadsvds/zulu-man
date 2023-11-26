<template>
  <v-row justify="center">
    <v-btn
      icon="fa-solid fa-pen"
      size="small"
      variant="text"
      color="primary"
      @click="dialog = true"
    ></v-btn>
    <v-dialog v-model="dialog" class="main-dialog" max-width="1024" scrollable>
      <form @submit.prevent="handleSubmit">
        <v-card>
          <v-toolbar
            color="primary"
            :title="$vuetify.locale.t('$vuetify.global.membership.edit')"
          ></v-toolbar>
          <v-card-text style="max-height: 50vh" class="pa-0">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-select
                    v-model="membership"
                    :items="typesItems"
                    item-title="text"
                    item-value="id"
                    :label="
                      $vuetify.locale.t('$vuetify.global.membership.types')
                    "
                    variant="outlined"
                    name="type"
                    :loading="membershipLoading"
                    clearable
                    required
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    :label="$vuetify.locale.t('$vuetify.global.start.this')"
                    variant="outlined"
                    type="date"
                    name="start"
                    v-model="start"
                    clearable
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    :label="$vuetify.locale.t('$vuetify.global.end.this')"
                    variant="outlined"
                    type="date"
                    name="end"
                    v-model="end"
                    clearable
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="staff"
                    :items="staffItems"
                    item-title="text"
                    item-value="id"
                    :loading="staffLoading"
                    :label="
                      $vuetify.locale.t('$vuetify.global.staff_member.this')
                    "
                    variant="outlined"
                    name="staff"
                    clearable
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
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
        typesItems: [],
        membershipLoading: true,
        membership: null,
        staff: null,
        staffItems: [],
        staffLoading: true,
        start: null,
        end: null,
      };
    },
    methods: {
      handleSubmit() {
        this.axios({
          url: `user/update_user_membership/${this.id}`,
          method: "POST",
          data: {
            user_id: this.userId,
            membership_id: this.membership,
            staff_id: this.staff,
            start: this.start,
            end: this.end,
          },
        }).then(() => {
          this.$emit("editMembership");
          this.dialog = false;
        });
      },
    },
    mounted() {
      this.axios({
        url: `item_type/membership`,
        method: "GET",
      })
        .then((res) => {
          this.typesItems = [];
          for (const item of res.data.data) {
            const itemObj = {
              text: `${item.name}`,
              id: item.id,
            };
            this.typesItems.push(itemObj);
          }
        })
        .then(() => {
          this.membershipLoading = false;
        });

      this.axios({
        url: `staffs`,
        method: "GET",
        params: {
          per_page: -1,
          page: 1,
        },
      })
        .then((res) => {
          this.staffItems = [];
          for (const item of res.data.data) {
            const itemObj = {
              text: `${item.first_name} ${item.last_name}`,
              id: item.id,
            };
            this.staffItems.push(itemObj);
          }
        })
        .then(() => {
          this.staffLoading = false;
        });
    },
  };
</script>
