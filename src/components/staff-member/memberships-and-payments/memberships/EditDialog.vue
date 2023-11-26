<template>
  <v-row justify="center">
    <v-btn
      icon="fa-solid fa-pen"
      size="x-small"
      variant="text"
      color="primary"
      @click="dialog = true"
    ></v-btn>
    <v-dialog v-model="dialog" class="main-dialog" width="1024">
      <v-card>
        <v-toolbar
          color="primary"
          :title="$vuetify.locale.t('$vuetify.global.membership.edit')"
        ></v-toolbar>
        <form action="">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-select
                    :items="['membership']"
                    :label="
                      $vuetify.locale.t('$vuetify.global.membership.types')
                    "
                    name="type"
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
                    density="compact"
                    variant="outlined"
                    clearable
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    :items="['Staff Member', 'Ahmed Assaf']"
                    :label="
                      $vuetify.locale.t('$vuetify.global.staff_member.this')
                    "
                    name="staff"
                    density="compact"
                    variant="outlined"
                    clearable
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              variant="plain"
              @click="dialog = false"
              type="button"
            >
              {{ $vuetify.locale.t("$vuetify.global.close") }}
            </v-btn>
            <v-btn color="primary" elevation="0" variant="flat" type="submit">
              {{ $vuetify.locale.t("$vuetify.global.save") }}
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
      };
    },
  };
</script>
