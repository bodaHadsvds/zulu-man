<template>
  <v-dialog max-width="550">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar color="transparent ma-0">
          <template v-slot:title>
            <h1 class="text-h6 font-weight-bold">
              {{ $vuetify.locale.t("$vuetify.global.are_you_sure") }}
            </h1>
          </template>
          <v-btn
            variant="text"
            icon="fa-solid fa-x"
            @click="close"
            size="small"
          ></v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text class="pt-0">
        <p class="text-body-1" v-show="action === 'cancel'">
          By doing this, you will cancel this session and notify the clients who
          have booked this session.
        </p>
        <p class="text-body-1" v-show="action === 'delete'">
          By doing this, you will delete this session and notify the clients who
          have booked this session. This session will not be visible on your
          calendar.
        </p>
        <p class="text-body-1" v-show="action === 'restore'">
          By doing this, this session will be restored and clients will be able
          to book a spot once again.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" color="error" @click="close">
          <span v-show="action === 'delete' || action === 'restore'">
            {{ $vuetify.locale.t("$vuetify.global.close") }}
          </span>
          <span v-show="action === 'cancel'"> no, keep it </span>
        </v-btn>
        <v-btn
          color="error"
          variant="flat"
          @click="deleteItemConfirm(editItemId)"
        >
          <span v-show="action === 'cancel'"> yes, cancel please </span>
          <span v-show="action === 'delete'"> delete forever </span>
          <span v-show="action === 'restore'"> confirm </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    emits: ["close"],
    props: {
      editedId: {
        required: true,
      },
      closeEvent: {
        required: true,
      },
      action: {
        required: true,
      },
    },
    data: () => ({
      editItemId: null,
    }),
    methods: {
      close() {
        this.$emit("close");
      },
      deleteItemConfirm() {
        const url = () => {
          if (this.action === "delete")
            return `session/destroy/${this.editItemId}`;
          else return `session/update_status/${this.editItemId}`;
        };
        const method = () => {
          if (this.action === "delete") return "delete";
          else return "post";
        };
        const data = () => {
          if (this.action === "delete") return "";
          else if (this.action === "cancel") return { status: 0 };
          else return { status: 1 };
        };
        this.axios({
          url: url(),
          method: method(),
          data: data(),
        }).then((response) => {
          console.log(response);
          if (response.status) {
            this.close();
            this.closeEvent();
            this.drawer = false;
          }
        });
      },

      // deleteItemConfirm(id) {
      //   this.$emit("closeDelete", id);
      // }
    },
    watch: {
      editedId(newVal) {
        this.editItemId = newVal;
      },
    },
    created() {
      this.editItemId = this.editedId;
    },
  };
</script>
