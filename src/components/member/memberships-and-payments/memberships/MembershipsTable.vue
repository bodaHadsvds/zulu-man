<template>
  <h2 class="text-h6 text-primary mb-2">
    {{ $vuetify.locale.t("$vuetify.global.membership.plural") }}
  </h2>
  <v-data-table-server
    v-model:options="options"
    :headers="headers"
    :loading="loading"
    :items="memberships.data"
    item-value="id"
    class="elevation-0 mb-6"
    :items-length="membershipsTotal"
  >
    <template v-slot:[`item.status`]="{ item }">
      <span v-if="item.status == 0" class="text-error">
        {{ $vuetify.locale.t("$vuetify.global.inactive") }}
      </span>
      <span v-else-if="item.status == 2" class="text-grey">
        {{ $vuetify.locale.t("$vuetify.global.inactive") }}
      </span>
      <span v-else-if="item.status == 3" class="text-error">
        {{ $vuetify.locale.t("$vuetify.global.expired") }}
      </span>
      <span v-else class="text-success">
        {{ $vuetify.locale.t("$vuetify.global.active") }}
      </span>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="d-flex align-center justify-end" style="gap: 5px">
        <edit-dialog
          style="display: contents"
          :userId="userId"
          :id="item.id"
          @editMembership="loadMemberships"
        />
        <v-btn
          icon="fa-solid fa-calendar-days"
          size="small"
          variant="text"
          color="success"
        ></v-btn>
        <hold-dialog
          style="display: contents"
          :userId="userId"
          :id="item.id"
          v-if="item.status != 3"
          @holdMembership="loadMemberships"
        />
        <cancel-dialog
          style="display: contents"
          :userId="userId"
          :id="item.id"
          v-if="item.status == 2"
          @cancelMembership="loadMemberships"
        />
      </div>
    </template>

    <template v-if="dataSuccess == false" v-slot:no-data>
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
          @click="loadMemberships"
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
  import { VDataTableServer } from "vuetify/lib/labs/components.mjs";
  import axios from "axios";
  import { defineAsyncComponent } from "vue";
  const EditDialog = defineAsyncComponent(() => import("./EditDialog.vue"));
  const HoldDialog = defineAsyncComponent(() => import("./HoldDialog.vue"));
  const CancelDialog = defineAsyncComponent(() => import("./CancelDialog.vue"));
  export default {
    props: {
      userId: {
        required: true,
      },
    },
    components: { VDataTableServer, EditDialog, HoldDialog, CancelDialog },
    data() {
      return {
        memberships: [],
        options: {},
        dialogDelete: false,
        editedIndex: -1,
        editItemId: null,
        loading: true,
        dataSuccess: true,
      };
    },
    computed: {
      headers() {
        return [
          {
            title: this.$vuetify.locale.t(
              "$vuetify.global.membership.table.purchase_date"
            ),
            key: "purchase_date",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.membership.this"),
            key: "name",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.status"),
            key: "status",
          },
          {
            title: this.$vuetify.locale.t(
              "$vuetify.global.membership.table.value"
            ),
            key: "value",
          },
          {
            title: this.$vuetify.locale.t(
              "$vuetify.global.membership.table.balance"
            ),
            key: "balance",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.start.this"),
            key: "start",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.end.this"),
            key: "end",
          },
          {
            title: this.$vuetify.locale.t(
              "$vuetify.global.membership.table.sessions_left"
            ),
            key: "sessions_left",
          },
          {
            title: this.$vuetify.locale.t("$vuetify.global.actions"),
            align: "end",
            key: "actions",
            sortable: false,
          },
        ];
      },
      membershipsTotal() {
        const memberships = this.memberships.total;
        return parseInt(memberships);
      },
    },
    methods: {
      loadMemberships() {
        this.loading = true;
        axios
          .get(`user/get_membership/${parseInt(this.$route.params.id)}`, {
            params: {},
          })
          .then((response) => {
            this.loading = false;
            const dataArr = {
              data: [],
              per_page: response.data.per_page,
              page: response.data.page,
              total: response.data.total,
            };
            for (const item of response.data.data) {
              const itemObj = {
                id: item.id,
                purchase_date: item.purchase_date,
                name: item.name,
                status: item.status,
                value: item.value,
                balance: item.balance,
                start: item.start,
                end: item.end,
                sessions_left: item.entrances != null ? item.entrances +'/'+ item.sessions_left : '',
              };
              dataArr.data.push(itemObj);
            }
            this.memberships = dataArr;
          })
          .catch(() => {
            this.dataSuccess = false;
            this.loading = false;
          });
      },
    },
    mounted() {
      this.loadMemberships();
    },
  };
</script>
