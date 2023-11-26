<template>
  <v-toolbar class="bg-background px-0 py-4 pt-0">
    <v-row>
      <v-col cols="6" class="d-flex align-center justify-start">
        <h2>
          {{ $vuetify.locale.t("$vuetify.nav_drawer.task.plural") }}
        </h2>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-end">
        <div class="d-flex align-stretch flex-wrap" style="gap: 10px">
          <v-dialog v-model="dialog" class="main-dialog" max-width="768" scrollable>
        <template v-slot:activator="{ props }">
          <div class="d-flex align-stretch flex-wrap" style="gap: 10px">
            <v-btn color="primary" variant="flat" dark v-bind="props">
              {{ $vuetify.locale.t("$vuetify.nav_drawer.task.add") }}
            </v-btn>
          </div>
        </template>
        <form @submit.prevent="save">
          <v-card>
            <v-card-title class="pa-0">
              <v-toolbar
                color="primary"
                :title="$vuetify.locale.t('$vuetify.nav_drawer.task.add')"
              ></v-toolbar>
            </v-card-title>
            <v-card-text style="max-height: 50vh" class="pa-0">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-autocomplete
                      v-model="editedItem.staff_id"
                      :rules="itemRules.staff_id"
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
                  <v-col cols="12" sm="4">
                    <v-select
                      v-model="editedItem.type"
                      :rules="itemRules.type"
                      :label="
                        $vuetify.locale.t('$vuetify.nav_drawer.task.type.this')
                      "
                      :placeholder="
                        $vuetify.locale.t(
                          '$vuetify.nav_drawer.task.type.placeholder'
                        )
                      "
                      :items="typesItems"
                      item-title="text"
                      item-value="value"
                      item-color="primary"
                      name="type"
                      density="compact"
                      variant="outlined"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-select
                      v-model="editedItem.task_for"
                      :rules="itemRules.task_for"
                      :label="
                        $vuetify.locale.t('$vuetify.nav_drawer.task.for.this')
                      "
                      :placeholder="
                        $vuetify.locale.t(
                          '$vuetify.nav_drawer.task.for.placeholder'
                        )
                      "
                      :items="taskForItems"
                      item-title="text"
                      item-value="value"
                      density="compact"
                      variant="outlined"
                    >
                    </v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    v-if="editedItem.task_for == 'members'"
                  >
                    <v-select
                      v-model="editedItem.user_id"
                      :rules="itemRules.user_id"
                      :label="
                        $vuetify.locale.t('$vuetify.nav_drawer.member.this')
                      "
                      :placeholder="
                        $vuetify.locale.t(
                          '$vuetify.nav_drawer.member.placeholder'
                        )
                      "
                      item-title="text"
                      item-value="id"
                      :items="usersItems"
                      name="user_id"
                      density="compact"
                      variant="outlined"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="editedItem.description"
                      :rules="itemRules.description"
                      :label="
                        $vuetify.locale.t('$vuetify.global.description.this')
                      "
                      :placeholder="
                        $vuetify.locale.t(
                          '$vuetify.global.description.placeholder'
                        )
                      "
                      name="description"
                      density="compact"
                      variant="outlined"
                      rows="3"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.date"
                      :rules="itemRules.date"
                      type="date"
                      :label="
                        $vuetify.locale.t('$vuetify.nav_drawer.task.start_date')
                      "
                      :placeholder="
                        $vuetify.locale.t('$vuetify.global.start.placeholder')
                      "
                      name="date"
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.time"
                      :rules="itemRules.time"
                      type="time"
                      :label="
                        $vuetify.locale.t(
                          '$vuetify.nav_drawer.task.start_time.this'
                        )
                      "
                      :placeholder="
                        $vuetify.locale.t(
                          '$vuetify.nav_drawer.task.start_time.placeholder'
                        )
                      "
                      name="time"
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="px-2 py-3">
              <v-spacer></v-spacer>
              <v-btn variant="text" type="button" @click="close">
                {{ $vuetify.locale.t("$vuetify.global.close") }}
              </v-btn>
              <v-btn
                color="primary"
                variant="flat"
                type="submit"
                :disabled="!validForm"
              >
                {{ $vuetify.locale.t("$vuetify.global.save") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-dialog>
        </div>
        
        
      </v-col>
    </v-row>
  </v-toolbar>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-sheet color="surface" class="pa-4" rounded="lg">
          <div class="d-flex align-center pb-4">
            <v-badge color="blue" class="me-2" dot inline></v-badge>
            <h6 class="text-h6 fill-height">
              {{ $vuetify.locale.t("$vuetify.nav_drawer.task.status.pending") }}
            </h6>
          </div>
          <v-divider class="mb-4"></v-divider>
          <v-list lines="three">
            <v-list-item
              v-for="task in tasks"
              v-show="task.status === 0"
              :key="task.id"
              class="pa-0"
            >
              <v-card class="bg-background mb-5" rounded="lg" elevation="0">
                <template v-slot:title>
                  <div class="d-flex mb-3 w-100">
                    <div class="d-flex align-center flex-fill">
                      <v-avatar size="50px" class="me-3">
                        <v-img
                          alt="Staff member"
                          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                        ></v-img>
                      </v-avatar>
                      <div>
                        <h6 class="text-h6 text-pre-wrap" v-if="task.staff">
                          {{ task.staff.first_name }} {{ task.staff.last_name }}
                        </h6>
                        <p
                          class="text-subtitle-2 text-grey-darken-1"
                          v-if="task.staff"
                        >
                          <span
                            v-for="(role, index) in task.staff.roles"
                            :key="role.id"
                          >
                            <span>{{ role.name_en }}</span>
                            <span v-if="index + 1 < task.staff.roles.length">
                              ,
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                    <v-chip class="flex-sm-shrink-0 ma-2" color="primary" label>
                      {{ task.type }}
                    </v-chip>
                  </div>
                </template>
                <template v-slot:text>
                  <v-divider color="primary" class="mb-4"></v-divider>
                  <div
                    class="d-flex align-center text-high-emphasis mb-5"
                    v-if="task.user"
                  >
                    <p class="text-body-2 me-2">
                      {{
                        $vuetify.locale.t("$vuetify.nav_drawer.task.for.this")
                      }}:
                    </p>
                    <div class="d-flex align-center flex-fill">
                      <v-avatar size="30px" class="me-3">
                        <v-img
                          alt="member"
                          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                        ></v-img>
                      </v-avatar>
                      <h6 class="text-body-1 text-pre-wrap">
                        {{ task.user.first_name }} {{ task.user.last_name }}
                      </h6>
                    </div>
                  </div>
                  {{ task.description }}
                </template>
                <v-divider color="primary"></v-divider>
                <template v-slot:actions>
                  <div
                    class="d-flex align-center justify-space-between w-100 px-2"
                  >
                    <p
                      class="d-flex align-center text-body-2 text-grey-darken-1"
                    >
                      <span class="me-2"
                        >{{
                          $vuetify.locale.t(
                            "$vuetify.nav_drawer.task.starts_in"
                          )
                        }}:</span
                      >
                      <v-icon
                        icon="fa-solid fa-calendar"
                        class="me-1"
                        size="small"
                      ></v-icon>
                      <span class="text-primary me-4">
                        {{ task.date }}
                      </span>
                      <span class="me-2"
                        >{{ $vuetify.locale.t("$vuetify.global.at") }}:</span
                      >
                      <v-icon
                        icon="fa-solid fa-clock"
                        class="me-1"
                        size="small"
                      ></v-icon>
                      <span class="text-primary">
                        {{ task.time }}
                      </span>
                    </p>
                    <div class="d-flex align-center">
                      <v-tooltip location="top end" text="Mark as completed">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            icon="fas fa-check"
                            size="small"
                            elevation="0"
                            variant="tonal"
                            v-bind="props"
                            color="success"
                            @click="editTask(task.id, 1)"
                          ></v-btn>
                        </template>
                      </v-tooltip>
                    </div>
                  </div>
                </template>
              </v-card>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
      <v-col cols="6">
        <v-sheet color="surface" class="pa-4" rounded="lg">
          <div class="d-flex align-center pb-4">
            <v-badge color="success" class="me-2" dot inline></v-badge>
            <h6 class="text-h6 fill-height">
              {{
                $vuetify.locale.t("$vuetify.nav_drawer.task.status.completed")
              }}
            </h6>
          </div>
          <v-divider class="mb-4"></v-divider>
          <v-list lines="three">
            <v-list-item
              v-for="task in tasks"
              v-show="task.status === 1"
              :key="task.id"
              class="pa-0"
            >
              <v-card class="bg-background mb-5" rounded="lg" elevation="0">
                <template v-slot:title>
                  <div class="d-flex mb-3 w-100">
                    <div class="d-flex align-center flex-fill">
                      <v-avatar size="50px" class="me-3">
                        <v-img
                          alt="Staff member"
                          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                        ></v-img>
                      </v-avatar>
                      <div>
                        <h6 class="text-h6 text-pre-wrap" v-if="task.staff">
                          {{ task.staff.first_name }} {{ task.staff.last_name }}
                        </h6>
                        <p
                          class="text-subtitle-2 text-grey-darken-1"
                          v-if="task.staff"
                        >
                          <span
                            v-for="(role, index) in task.staff.roles"
                            :key="role.id"
                          >
                            <span>{{ role.name_en }}</span>
                            <span v-if="index + 1 < task.staff.roles.length">
                              ,
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                    <v-chip class="flex-sm-shrink-0 ma-2" color="primary" label>
                      {{ task.type }}
                    </v-chip>
                  </div>
                </template>
                <template v-slot:text>
                  <v-divider color="primary" class="mb-4"></v-divider>
                  <div
                    class="d-flex align-center text-high-emphasis mb-5"
                    v-if="task.user"
                  >
                    <p class="text-body-2 me-2">
                      {{
                        $vuetify.locale.t("$vuetify.nav_drawer.task.for.this")
                      }}:
                    </p>
                    <div class="d-flex align-center flex-fill">
                      <v-avatar size="30px" class="me-3">
                        <v-img
                          alt="member"
                          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                        ></v-img>
                      </v-avatar>
                      <h6 class="text-body-1 text-pre-wrap">
                        {{ task.user.first_name }} {{ task.user.last_name }}
                      </h6>
                    </div>
                  </div>
                  {{ task.description }}
                </template>
                <v-divider color="primary"></v-divider>
                <template v-slot:actions>
                  <div
                    class="d-flex align-center justify-space-between w-100 px-2"
                  >
                    <p
                      class="d-flex align-center text-body-2 text-grey-darken-1"
                    >
                      <span class="me-2"
                        >{{
                          $vuetify.locale.t(
                            "$vuetify.nav_drawer.task.starts_in"
                          )
                        }}:</span
                      >
                      <v-icon
                        icon="fa-solid fa-calendar"
                        class="me-1"
                        size="small"
                      ></v-icon>
                      <span class="text-primary me-4">
                        {{ task.date }}
                      </span>
                      <span class="me-2"
                        >{{ $vuetify.locale.t("$vuetify.global.at") }}:</span
                      >
                      <v-icon
                        icon="fa-solid fa-clock"
                        class="me-1"
                        size="small"
                      ></v-icon>
                      <span class="text-primary">
                        {{ task.time }}
                      </span>
                    </p>
                    <div class="d-flex align-center">
                      <v-tooltip
                        location="top end"
                        text="Remove from completed"
                      >
                        <template v-slot:activator="{ props }">
                          <v-btn
                            icon="fas fa-xmark"
                            size="small"
                            elevation="0"
                            variant="tonal"
                            v-bind="props"
                            color="error"
                            @click="editTask(task.id, 0)"
                          ></v-btn>
                        </template>
                      </v-tooltip>
                    </div>
                  </div>
                </template>
              </v-card>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import ThePageHead from "@/layouts/default/ThePageHead.vue";

  export default {
    components: { ThePageHead },

    data: () => ({
      dialog: false,
      tasks: null,
      coachesItems: [],
      usersItems: [],
      editedItem: {
        staff_id: null,
        type: null,
        description: null,
        user_id: null,
        date: null,
        time: null,
        task_for: null,
      },
      defaultItem: {
        staff_id: null,
        type: null,
        description: null,
        user_id: null,
        date: null,
        time: null,
        task_for: null,
      },
      itemsValid: {
        staff_id: null,
        type: null,
        description: null,
        user_id: null,
        date: null,
        time: null,
        task_for: null,
      },
      validForm: false,
    }),
    computed: {
      pageCrumb() {
        return {
          icon: "fa-solid fa-list-check",
          pageTitle: this.$vuetify.locale.t("$vuetify.nav_drawer.task.plural"),
          items: [
            {
              title: this.$vuetify.locale.t("$vuetify.nav_drawer.task.plural"),
              disabled: true,
            },
          ],
        };
      },
      getTasks() {
        return this.$store.getters["tasks/tasks"];
      },
      coachName(idx) {
        return (
          this.tasks[idx].staff.first_name +
          " " +
          this.tasks[idx].staff.last_name
        );
      },
      typesItems() {
        return [
          {
            text: this.$vuetify.locale.t(
              "$vuetify.nav_drawer.task.type.items.follow_up"
            ),
            value: "Follow up",
          },
          {
            text: this.$vuetify.locale.t(
              "$vuetify.nav_drawer.task.type.items.customer_billing"
            ),
            value: "Customer Billing",
          },
          {
            text: this.$vuetify.locale.t(
              "$vuetify.nav_drawer.task.type.items.membership_renewal"
            ),
            value: "Membership Renewal",
          },
          {
            text: this.$vuetify.locale.t(
              "$vuetify.nav_drawer.task.type.items.sales_call"
            ),
            value: "Sales Call",
          },
          {
            text: this.$vuetify.locale.t(
              "$vuetify.nav_drawer.task.type.items.business_management"
            ),
            value: "Business Management",
          },
        ];
      },
      taskForItems() {
        return [
          {
            text: this.$vuetify.locale.t("$vuetify.global.general"),
            value: "general",
          },
          {
            text: this.$vuetify.locale.t("$vuetify.nav_drawer.member.plural"),
            value: "members",
          },
        ];
      },
      itemRules() {
        return {
          staff_id: [
            (value) => {
              if (value) {
                this.itemsValid.staff_id = true;
                return true;
              }
              this.itemsValid.staff_id = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.session.coach.validation"
              );
            },
          ],
          type: [
            (value) => {
              if (value) {
                this.itemsValid.type = true;
                return true;
              }
              this.itemsValid.type = false;
              return this.$vuetify.locale.t(
                "$vuetify.nav_drawer.task.type.validation"
              );
            },
          ],
          description: [
            (value) => {
              if (value) {
                this.itemsValid.description = true;
                return true;
              }
              this.itemsValid.description = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.description.validation"
              );
            },
          ],
          user_id: [
            (value) => {
              if (value) {
                this.itemsValid.user_id = true;
                return true;
              }
              this.itemsValid.user_id = false;
              return this.$vuetify.locale.t(
                "$vuetify.nav_drawer.member.validation"
              );
            },
          ],
          date: [
            (value) => {
              if (value) {
                this.itemsValid.date = true;
                return true;
              }
              this.itemsValid.date = false;
              return this.$vuetify.locale.t("$vuetify.global.start.validation");
            },
          ],
          time: [
            (value) => {
              if (value) {
                this.itemsValid.time = true;
                return true;
              }
              this.itemsValid.time = false;
              return this.$vuetify.locale.t(
                "$vuetify.nav_drawer.task.start_time.validation"
              );
            },
          ],
          task_for: [
            (value) => {
              if (value) {
                this.itemsValid.task_for = true;
                return true;
              }
              this.itemsValid.task_for = false;
              return this.$vuetify.locale.t(
                "$vuetify.nav_drawer.task.for.validation"
              );
            },
          ],
        };
      },
    },
    methods: {
      editTask(id, val) {
        this.axios({
          url: `task/update/${id}`,
          method: "POST",
          data: { status: val },
        }).then(() => {
          this.$store.dispatch("tasks/fetchTasks");
        });
      },
      loadCoaches() {
        for (const item of this.$store.getters["staff/staff"].data) {
          this.coachesItems.push({
            text: `${item.first_name} ${item.last_name}`,
            id: item.id,
          });
        }
      },
      loadMembers(val) {
        if (val == "members") {
          for (const item of this.$store.getters["members/members"].data) {
            this.usersItems.push({
              text: item.full_name,
              id: item.id,
            });
          }
        }
      },
      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
        });
      },
      save() {
        this.axios({
          url: `task/store`,
          method: "POST",
          data: this.editedItem,
        }).then((res) => {
          if (res.status) {
            this.close();
            this.$store.dispatch("tasks/fetchTasks");
          }
        });
      },
      formCheck() {
        if (Object.values(this.itemsValid).every((value) => !!value)) {
          this.validForm = true;
        } else {
          this.validForm = false;
        }
      },
    },
    watch: {
      getTasks(newVal) {
        if (newVal) this.tasks = newVal;
        else this.tasks = null;
      },
      dialog(newVal) {
        if (newVal === false) {
          this.close();
          this.editedItem = Object.assign({}, this.defaultItem);
          this.coachesItems = [];
        } else {
          this.loadCoaches();
        }
      },
      "editedItem.task_for": {
        handler(newVal) {
          if (newVal == "members") {
            this.loadMembers(newVal);
          } else {
            this.editedItem.user_id = null;
            this.itemsValid.user_id = true;
          }
          this.formCheck();
        },
        deep: true,
      },
      itemsValid: {
        handler: function () {
          this.formCheck();
        },
        deep: true,
      },
    },
    created() {
      this.$store.dispatch("staff/fetchStaff", {
        per_page: -1,
        page: 1,
      });
      this.$store.dispatch("members/fetchUsers", {
        per_page: -1,
        page: 1,
      });
      this.$store.dispatch("tasks/fetchTasks");
    },
  };
</script>
