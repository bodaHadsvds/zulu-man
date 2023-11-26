<template>  
<v-toolbar class="bg-background px-0 py-4 pt-0">
    <v-row>
      <v-col cols="6" class="d-flex align-center justify-start">
        <h2>
          {{ $vuetify.locale.t("$vuetify.nav_drawer.member.plural") }}
        </h2>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-end">
        <div class="d-flex align-stretch flex-wrap" style="gap: 10px">
          <v-btn
          variant="flat"
          prepend-icon="fa-solid fa-wand-sparkles"
          color="primary"
          v-if="  !rail"
        >
          <span>
            {{ $vuetify.locale.t("$vuetify.global.actions") }}
          </span>

          <v-menu activator="parent" :location="location">
            <v-list>
              <v-list-item
                @click="newMemberSheet = !newMemberSheet"
                class="d-flex align-center"
              >
                <template v-slot:prepend>
                  <v-icon icon="fa-solid fa-user fa-sm" class="me-3"></v-icon>
                </template>
                <v-list-item-title>
                  {{
                    $vuetify.locale.t(
                      "$vuetify.nav_drawer.quick_access_menu.new_member"
                    )
                  }}
                </v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="d-flex align-center">
                <template v-slot:prepend>
                  <v-icon
                    icon="fa-solid fa-address-card fa-sm"
                    class="me-3"
                  ></v-icon>
                </template>
                <v-list-item-title>
                  {{
                    $vuetify.locale.t(
                      "$vuetify.nav_drawer.quick_access_menu.my_profile"
                    )
                  }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item class="d-flex align-center">
                <template v-slot:prepend>
                  <v-icon icon="fa-solid fa-lock fa-sm" class="me-3"></v-icon>
                </template>
                <v-list-item-title>
                  {{
                    $vuetify.locale.t(
                      "$vuetify.nav_drawer.quick_access_menu.change_password"
                    )
                  }}
                </v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="d-flex align-center" @click="handleLogout">
                <template v-slot:prepend>
                  <v-icon
                    icon="fa-solid fa-arrow-right-from-bracket fa-sm"
                    class="me-3"
                  ></v-icon>
                </template>
                <v-list-item-title>
                  {{
                    $vuetify.locale.t(
                      "$vuetify.nav_drawer.quick_access_menu.log_out"
                    )
                  }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
          <v-responsive width="300">
          <v-text-field
        v-model="search"
        :label="$vuetify.locale.t('$vuetify.global.search')"
        variant="outlined"
        class="bg-surface"
        hide-details
      ></v-text-field>
        </v-responsive>
        </div>
        
        
      </v-col>
    </v-row>
  </v-toolbar>
  <v-data-table-server
    v-model="selected"
    v-model:options="options"
    :headers="headers"
    :loading="this.$store.state.members.loading"
    :items="members"
    item-value="id"
    show-select
    class="elevation-3"
    :search="search"
    @click:row="handleMemberLink"
    :items-length="usersTotal"
  >
    <template v-slot:[`item.gender`]="{ item }">
      <span
        class="d-flex align-center justify-center bg-grey-lighten-5 rounded-xl py-1 px-3"
        :style="
          item.gender == 0
            ? 'color:#1999e3 !important'
            : 'color:#d5169a !important'
        "
        style="gap: 10px"
      >
        {{
          item.gender == 0
            ? $vuetify.locale.t("$vuetify.global.gender.male")
            : $vuetify.locale.t("$vuetify.global.gender.female")
        }}
      </span>
    </template>
    <template
      v-if="this.$store.state.members.dataSuccess == false"
      v-slot:no-data
    >
      <div class="py-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.com/svgjs"
          width="80"
          height="80"
          x="0"
          y="0"
          viewBox="0 0 64 64"
          style="enable-background: new 0 0 80 80"
          xml:space="preserve"
          class="hovered-paths mb-2"
        >
          <g>
            <path
              d="M59.7 17.8 46.2 4.45a1.017 1.017 0 0 0-.7-.28l-27.09-.18a.982.982 0 0 0-.71.3L4.33 17.83a.984.984 0 0 0-.29.7L3.99 45.5a1 1 0 0 0 .3.71l13.5 13.49a.967.967 0 0 0 .7.29h27a.99.99 0 0 0 .71-.29l13.48-13.52a.99.99 0 0 0 .29-.71l.02-26.95a1.013 1.013 0 0 0-.29-.72zm-1.73 27.26L45.08 57.99H18.91L5.99 45.09l.05-26.14L18.82 6l26.26.16 12.91 12.77z"
              fill="rgb(var(--v-theme-primary))"
              data-original="rgb(var(--v-theme-primary))"
              class="hovered-path"
            ></path>
            <path
              d="M44.29 18.32 32 30.58 19.74 18.29a1.004 1.004 0 0 0-1.42 1.42L30.58 32 18.29 44.26a1.004 1.004 0 0 0 1.42 1.42L32 33.42l12.26 12.29a1.004 1.004 0 0 0 1.42-1.42L33.42 32l12.29-12.26a1.004 1.004 0 0 0-1.42-1.42z"
              fill="rgb(var(--v-theme-primary))"
              data-original="rgb(var(--v-theme-primary))"
              class="hovered-path"
            ></path>
          </g>
        </svg>
        <p class="text-subtitle-1 font-weight-bold mb-0">
          {{ $vuetify.locale.t("$vuetify.global.fetch_data.error") }}
        </p>
        <v-btn
          variant="text"
          color="primary"
          prepend-icon="fa-solid fa-rotate-right"
          class="text-caption pa-0"
          @click="loadMembers"
          >{{ $vuetify.locale.t("$vuetify.global.fetch_data.retry") }}</v-btn
        >
      </div>
    </template>
    <template v-slot:loading>
      <p class="text-subtitle-1 font-weight-bold">
        {{ $vuetify.locale.t("$vuetify.global.fetch_data.loading") }}
      </p>
    </template>
  </v-data-table-server>
</template>
<script>
  import router from "@/router";
  import ThePageHead from "@/layouts/default/ThePageHead.vue";
  // import { VDataTableServer} from "vuetify/lib/labs/components.mjs";
  import { VDataTableServer } from "vuetify/lib/labs/components.mjs";
  export default {
    props: ["report"],
    components: { ThePageHead, VDataTableServer },

    data: () => ({
      search: "",
      selected: [],
      options: {},

      members: [],
    }),
    computed: {
      pageCrumb() {
        return {
          icon: "fa-solid fa-users",
          pageTitle: this.$vuetify.locale.t(
            "$vuetify.nav_drawer.member.plural"
          ),
          items: [
            {
              title: this.$vuetify.locale.t(
                "$vuetify.nav_drawer.member.plural"
              ),
              disabled: true,
            },
          ],
        };
      },
      headers() {
        return [
          {
            title: this.$vuetify.locale.t("$vuetify.global.name.this"),
            key: "full_name",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.gender.this"),
            key: "gender",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.profile.age"),
            key: "age",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.phone.this"),
            key: "phone",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.membership.active"),
            key: "memberships",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.membership.future"),
            key: "futureshipfs",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.created_on"),
            key: "created_at",
          },
        ];
      },
      getMembers() {
        const members = this.$store.getters["members/members"].data;
        return members.filter((i) => {
          if (this.search !== "all") {
            return !this.search || i.phone === this.search;
          } else {
            return !this.search || i.phone !== this.search;
          }
        });
      },
      usersTotal() {
        const users = this.$store.state.members.users.total;
        return parseInt(users);
      },
    },
    methods: {
      handleMemberLink(_, item) {
        console.log(item);
        router.push({ name: "Member", params: { id: item.item.id } });
      },
      loadMembers() {
        this.$store.dispatch("members/fetchUsers", {
          report: this.report ? this.report : null,
          per_page: this.options.per_page,
          page: this.options.page,
        });
      },
    },
    watch: {
      getMembers(newVal) {
        this.members = newVal;
      },
      options(value) {
        const { itemsPerPage, page } = value;
        this.$store.dispatch("members/fetchUsers", {
          report: this.report ? this.report : null,
          per_page: itemsPerPage,
          page: page,
        });
      },
      report() {
        this.loadMembers();
        console.log(this.report);
      },
    },
    mounted() {
      this.loadMembers();
    },
  };
</script>
