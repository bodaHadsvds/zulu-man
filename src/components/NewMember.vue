<template>
  <v-bottom-sheet scrollable>
    <v-card>
      <v-toolbar
        color="primary"
        :title="
          $vuetify.locale.t('$vuetify.nav_drawer.quick_access_menu.new_member')
        "
      >
        <v-btn
          icon="fa-solid fa-x"
          variant="text"
          :ripple="false"
          @click="closeSheet"
          size="small"
        ></v-btn>
      </v-toolbar>
      <v-card-text class="pa-0">
        <v-stepper
          v-model="step"
          :items="stepsItems"
          class="elevation-0"
          hide-actions
        >
          <template v-slot:[`item.1`]>
            <h3 class="text-h5 mb-4">
              {{
                $vuetify.locale.t(
                  "$vuetify.nav_drawer.quick_access_menu.new_member_menu.personal_details"
                )
              }}
            </h3>
            <v-sheet>
              <v-row>
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="firstname"
                    :rules="step1Rules.firstNameRules"
                    :label="
                      $vuetify.locale.t('$vuetify.global.first_name.this')
                    "
                    type="text"
                    name="first_name"
                    :placeholder="
                      $vuetify.locale.t(
                        '$vuetify.global.first_name.placeholder'
                      )
                    "
                    density="compact"
                    variant="outlined"
                    validate-on="input"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="lastname"
                    :rules="step1Rules.lastNameRules"
                    :label="$vuetify.locale.t('$vuetify.global.last_name.this')"
                    type="text"
                    name="last_name"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.last_name.placeholder')
                    "
                    density="compact"
                    variant="outlined"
                    validate-on="input"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="email"
                    :rules="step1Rules.emailRules"
                    :label="$vuetify.locale.t('$vuetify.global.email.this')"
                    type="email"
                    name="email"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.email.placeholder')
                    "
                    density="compact"
                    variant="outlined"
                    :loading="emailLoading"
                    validate-on="input"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="phone"
                    :rules="step1Rules.phoneRules"
                    :label="$vuetify.locale.t('$vuetify.global.phone.this')"
                    type="tel"
                    name="phone"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.phone.placeholder')
                    "
                    density="compact"
                    variant="outlined"
                    validate-on="input"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="additional_number"
                    :label="
                      $vuetify.locale.t('$vuetify.global.additional_num.this')
                    "
                    type="tel"
                    name="additional_number"
                    :placeholder="
                      $vuetify.locale.t(
                        '$vuetify.global.additional_num.placeholder'
                      )
                    "
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="id_number"
                    :label="$vuetify.locale.t('$vuetify.global.id_num.this')"
                    type="number"
                    name="id_number"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.id_num.placeholder')
                    "
                    density="compact"
                    variant="outlined"
                    validate-on="input"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="birthdate"
                    :rules="step1Rules.birthdateRules"
                    :label="$vuetify.locale.t('$vuetify.global.birthdate.this')"
                    type="date"
                    name="birthdate"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.birthdate.placeholder')
                    "
                    density="compact"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-select
                    v-model="gender"
                    :rules="step1Rules.genderRules"
                    :label="$vuetify.locale.t('$vuetify.global.gender.this')"
                    name="gender"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.gender.placeholder')
                    "
                    :items="genderOpts"
                    item-title="text"
                    item-value="value"
                    density="compact"
                    variant="outlined"
                    clearable
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" md="2">
                  <v-select
                    v-model="country"
                    :rules="step1Rules.countryRules"
                    :label="$vuetify.locale.t('$vuetify.global.country.this')"
                    name="country"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.country.placeholder')
                    "
                    :items="countryItems"
                    item-title="text"
                    item-value="value"
                    density="compact"
                    variant="outlined"
                    validate-on="input"
                    clearable
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" md="2">
                  <v-select
                    v-model="city"
                    :rules="step1Rules.cityRules"
                    :label="$vuetify.locale.t('$vuetify.global.city.this')"
                    name="city"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.city.placeholder')
                    "
                    :items="cityItems"
                    item-title="text"
                    item-value="value"
                    density="compact"
                    variant="outlined"
                    :disabled="!country"
                    :loading="cityLoading"
                    clearable
                    validate-on="input"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="state"
                    :label="$vuetify.locale.t('$vuetify.global.state.this')"
                    type="text"
                    name="state"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.state.placeholder')
                    "
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="street"
                    :rules="step1Rules.streetRules"
                    :label="$vuetify.locale.t('$vuetify.global.street.this')"
                    type="text"
                    name="street"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.street.placeholder')
                    "
                    density="compact"
                    variant="outlined"
                    validate-on="input"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="post_code"
                    :label="$vuetify.locale.t('$vuetify.global.post_code.this')"
                    type="text"
                    name="post_code"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.post_code.placeholder')
                    "
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-sheet>
          </template>

          <template v-slot:[`item.2`]>
            <h3 class="text-h5 mb-4">
              {{
                $vuetify.locale.t(
                  "$vuetify.nav_drawer.quick_access_menu.new_member_menu.purchases"
                )
              }}
            </h3>
            <v-sheet>
              <v-row>
                <v-col cols="12" md="2">
                  <v-select
                    v-model="itemsTypes"
                    :rules="step2Rules.typesRules"
                    :label="$vuetify.locale.t('$vuetify.global.type.this')"
                    name="type"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.type.placeholder')
                    "
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
                    :rules="step2Rules.purchaseItemRules"
                    :loading="itemsLoading"
                    :label="
                      itemsTypes
                        ? $vuetify.locale.t('$vuetify.global.item.this')
                        : $vuetify.locale.t('$vuetify.global.select_item_first')
                    "
                    name="item_id"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.item.placeholder')
                    "
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
                    :rules="step2Rules.itemPriceRules"
                    type="number"
                    :label="
                      purchaseItem
                        ? $vuetify.locale.t('$vuetify.global.price.this')
                        : $vuetify.locale.t('$vuetify.global.select_item_first')
                    "
                    name="price"
                    min="0"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.price.placeholder')
                    "
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
                    :rules="step2Rules.quantityRules"
                    type="number"
                    :label="$vuetify.locale.t('$vuetify.global.qty.this')"
                    name="quantity"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.qty.placeholder')
                    "
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
                    :rules="step2Rules.startDateRules"
                    type="date"
                    :label="$vuetify.locale.t('$vuetify.global.start.this')"
                    name="start"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.start.placeholder')
                    "
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
                    :rules="step2Rules.endDateRules"
                    type="date"
                    :label="$vuetify.locale.t('$vuetify.global.end.this')"
                    name="end"
                    :placeholder="
                      $vuetify.locale.t('$vuetify.global.end.placeholder')
                    "
                    density="compact"
                    variant="outlined"
                    validate-on="input"
                    required
                    :disabled="!purchaseItem"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" v-if="!itemsTypes">
                  <p class="text-body-1 mb-4 text-error" color="error">
                    {{
                      $vuetify.locale.t(
                        "$vuetify.global.select_item_first_to_continue"
                      )
                    }}*
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
                      <v-responsive
                        max-width="150"
                        v-if="PaymentMethod === 'debet'"
                      >
                        <v-text-field
                          v-model="debtBalance"
                          :rules="step2Rules.debtBalanceRules"
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

              <v-divider
                :thickness="1"
                class="border-opacity-100 mb-4"
                color="primary"
              ></v-divider>

              <ul>
                <li
                  class="d-flex align-center justify-end mb-5"
                  style="gap: 10px"
                >
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
                <li
                  class="d-flex align-center justify-end mb-5"
                  style="gap: 10px"
                >
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
                <li
                  class="d-flex align-center justify-end mb-5"
                  style="gap: 10px"
                >
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
                <li
                  class="d-flex align-center justify-end mb-5"
                  style="gap: 10px"
                >
                  <p class="text-body-1">
                    {{
                      $vuetify.locale.t("$vuetify.summary.final_charge.this")
                    }}
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

          <template v-slot:[`item.3`]>
            <h3 class="text-h6">
              {{
                $vuetify.locale.t(
                  "$vuetify.nav_drawer.quick_access_menu.new_member_menu.payment"
                )
              }}
            </h3>
            <div class="d-flex flex-column align-center justify-center h-100">
              <div
                class="d-flex align-center justify-center flex-wrap mb-4"
                style="gap: 10px"
              >
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
          <!-- <template v-slot:item.4>
            <h3 class="text-h6">Summary</h3>
            <v-sheet>
              <v-table>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th class="text-end">Quantity</th>
                    <th class="text-end">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, index) in products" :key="index">
                    <td v-text="product.name"></td>
                    <td class="text-end" v-text="product.quantity"></td>
                    <td
                      class="text-end"
                      v-text="product.quantity * product.price"
                    ></td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td></td>
                    <td class="text-end" v-text="shipping"></td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <th></th>
                    <th class="text-end">${{ total }}</th>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>
          </template> -->
        </v-stepper>
        <form @submit.prevent="handleSubmit(this)">
          <div class="d-flex justify-end">
            <v-sheet class="ma-2 pa-2">
              <v-btn
                class="text-none text-subtitle-1 me-3"
                color="secondary"
                variant="flat"
                @click="prev"
                :disabled="step == 1"
                type="button"
              >
                {{ $vuetify.locale.t("$vuetify.global.back") }}
              </v-btn>
              <v-btn
                class="text-none text-subtitle-1"
                color="primary"
                variant="flat"
                @click.prevent="next"
                type="button"
                :disabled="!validStep"
                v-if="step < 3"
              >
                {{ $vuetify.locale.t("$vuetify.global.next") }}
              </v-btn>
              <v-btn
                class="text-none text-subtitle-1"
                color="primary"
                variant="flat"
                type="submit"
                v-if="step >= 3"
              >
                {{ $vuetify.locale.t("$vuetify.global.done") }}
              </v-btn>
            </v-sheet>
          </div>
        </form>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>
<script>
  import axios from "axios";
  import { VBottomSheet } from "vuetify/lib/labs/components.mjs";
  import { VStepper } from "vuetify/lib/labs/components.mjs";
  export default {
    components: { VBottomSheet, VStepper },
    data() {
      return {
        shipping: 0,
        step: 1,
        validStep: false,
        // Step 1
        firstname: null,
        lastname: null,
        email: null,
        emailExist: false,
        emailLoading: false,
        phone: null,
        additional_number: null,
        id_number: null,
        idNumberExist: false,
        idNumberLoading: false,
        birthdate: null,
        gender: null,
        street: null,
        city: null,
        state: null,
        post_code: null,
        country: null,
        cityLoading: false,
        countryItems: [],
        cityItems: [],

        step1Valid: {
          firstname: false,
          lastname: false,
          email: false,
          phone: false,
          birthdate: false,
          gender: false,
          street: false,
          city: false,
          country: false,
        },

        // Step 2
        itemsTypes: null,
        purchaseItem: null,
        itemPrice: null,
        startDate: null,
        endDate: null,
        debt: false,
        debtBalance: null,
        PaymentMethod: "cash",
        subtotal: 0,
        discountPercent: 0,
        discountMoney: 0,
        finalSubtotal: 0,
        purchaseItemItems: [],
        quantity: null,

        itemsLoading: false,

        step2Valid: {
          purchaseItem: false,
          itemPrice: false,
          startDate: false,
          endDate: false,
          quantity: false,
        },

        // Step 3
        sendEmail: true,
        step3Valid: {
          payment: true,
        },
      };
    },
    computed: {
      stepsItems() {
        return [
          this.$vuetify.locale.t(
            "$vuetify.nav_drawer.quick_access_menu.new_member_menu.personal_details"
          ),
          this.$vuetify.locale.t(
            "$vuetify.nav_drawer.quick_access_menu.new_member_menu.purchases"
          ),
          this.$vuetify.locale.t(
            "$vuetify.nav_drawer.quick_access_menu.new_member_menu.payment"
          ),
          // this.$vuetify.locale.t(
          //   "$vuetify.nav_drawer.quick_access_menu.new_member_menu.summary"
          // ),
        ];
      },
      genderOpts() {
        return [
          {
            text: this.$vuetify.locale.t("$vuetify.global.gender.male"),
            value: 0,
          },
          {
            text: this.$vuetify.locale.t("$vuetify.global.gender.female"),
            value: 1,
          },
        ];
      },

      typesItems() {
        return [
          {
            text: this.$vuetify.locale.t("$vuetify.global.membership.this"),
            value: "membership",
          },
          {
            text: this.$vuetify.locale.t("$vuetify.global.product.this"),
            value: "product",
          },
        ];
      },

      step1Rules() {
        return {
          firstNameRules: [
            (value) => {
              if (value) {
                this.step1Valid.firstname = true;
                return true;
              }
              this.step1Valid.firstname = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.first_name.validation"
              );
            },
          ],
          lastNameRules: [
            (value) => {
              if (value) {
                this.step1Valid.lastname = true;
                return true;
              }
              this.step1Valid.lastname = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.last_name.validation"
              );
            },
          ],
          emailRules: [
            (value) => {
              if (value) {
                this.step1Valid.email = true;
                return true;
              }
              this.step1Valid.email = false;
              return this.$vuetify.locale.t("$vuetify.global.email.validation");
            },
            () => {
              if (!this.emailExist) {
                this.step1Valid.email = true;
                return true;
              }
              this.step1Valid.email = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.email.exist_validation"
              );
            },
            (value) => {
              if (/.+@.+\..+/.test(value)) {
                this.step1Valid.email = true;
                return true;
              }
              this.step1Valid.email = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.email.exp_validation"
              );
            },
          ],
          phoneRules: [
            (value) => {
              if (value) {
                this.step1Valid.phone = true;
                return true;
              }
              this.step1Valid.phone = false;
              return this.$vuetify.locale.t("$vuetify.global.phone.validation");
            },
          ],

          birthdateRules: [
            (value) => {
              if (value) {
                this.step1Valid.birthdate = true;
                return true;
              }
              this.step1Valid.birthdate = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.birthdate.validation"
              );
            },
          ],
          genderRules: [
            (value) => {
              if (value != null || value != undefined) {
                this.step1Valid.gender = true;
                return true;
              }
              this.step1Valid.gender = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.gender.validation"
              );
            },
          ],
          streetRules: [
            (value) => {
              if (value) {
                this.step1Valid.street = true;
                return true;
              }
              this.step1Valid.street = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.street.validation"
              );
            },
          ],
          cityRules: [
            (value) => {
              if (value) {
                this.step1Valid.city = true;
                return true;
              }
              this.step1Valid.city = false;
              return this.$vuetify.locale.t("$vuetify.global.city.validation");
            },
          ],
          countryRules: [
            (value) => {
              if (value) {
                this.step1Valid.country = true;
                return true;
              }
              this.step1Valid.country = false;
              return this.$vuetify.locale.t(
                "$vuetify.global.country.validation"
              );
            },
          ],
        };
      },

      step2Rules() {
        return {
          typesRules: [
            (value) => {
              if (value) {
                this.step2Valid.itemsTypes = true;
                return true;
              }
              this.step2Valid.itemsTypes = false;
              return this.$vuetify.locale.t("$vuetify.global.type.validation");
            },
          ],
          purchaseItemRules: [
            (value) => {
              if (value) {
                this.step2Valid.purchaseItem = true;
                return true;
              }
              this.step2Valid.purchaseItem = false;
              return this.$vuetify.locale.t("$vuetify.global.item.validation");
            },
          ],
          itemPriceRules: [
            (value) => {
              if (value) {
                this.step2Valid.itemPrice = true;
                return true;
              }
              this.step2Valid.itemPrice = false;
              return this.$vuetify.locale.t("$vuetify.global.price.validation");
            },
          ],
          startDateRules: [
            (value) => {
              if (value) {
                this.step2Valid.startDate = true;
                return true;
              }
              this.step2Valid.startDate = false;
              return this.$vuetify.locale.t("$vuetify.global.start.validation");
            },
          ],
          endDateRules: [
            (value) => {
              if (value) {
                this.step2Valid.endDate = true;
                return true;
              }
              this.step2Valid.endDate = false;
              return this.$vuetify.locale.t("$vuetify.global.end.validation");
            },
          ],
          quantityRules: [
            (value) => {
              if (value) {
                this.step2Valid.quantity = true;
                return true;
              }
              this.step2Valid.quantity = false;
              return this.$vuetify.locale.t("$vuetify.global.qty.validation");
            },
          ],
          debtBalanceRules: [
            (value) => {
              if (this.debt) {
                if (value && value > 0) {
                  this.step2Valid.debtBalance = true;
                  return true;
                }
                this.step2Valid.debtBalance = false;
                return this.$vuetify.locale.t(
                  "$vuetify.nav_drawer.quick_access_menu.new_member_menu.balance.validation"
                );
              }
              this.step2Valid.debtBalance = true;
              return true;
            },
          ],
        };
      },
    },
    methods: {
      closeSheet() {
        this.$emit("close");
      },
      prev() {
        if (this.step > 1) {
          this.step -= 1;
        }
      },
      next() {
        if (this.step < this.stepsItems.length) {
          this.step += 1;
          this.validStep = false;
        } else if (this.step >= 3) {
          this.validStep = true;
        }
      },
      stepOneCheck() {
        if (Object.values(this.step1Valid).every((value) => !!value)) {
          this.validStep = true;
        } else {
          this.validStep = false;
        }
      },
      stepTwoCheck() {
        if (Object.values(this.step2Valid).every((value) => !!value)) {
          this.validStep = true;
        } else {
          this.validStep = false;
        }
      },
      stepThreeCheck() {
        if (Object.values(this.step3Valid).every((value) => !!value)) {
          this.validStep = true;
        } else {
          this.validStep = false;
        }
      },
      // stepFourCheck() {
      //   if (Object.values(this.step4Valid).every((value) => !!value)) {
      //     this.validStep = true;
      //   } else {
      //     this.validStep = false;
      //   }
      // },
      handleEmailExistance(val) {
        this.emailLoading = true;
        axios({
          url: "user/check_email",
          method: "post",
          data: {
            email: val,
          },
        })
          .then((res) => {
            if (!res.data.exist) {
              this.emailExist = false;
            } else {
              this.emailExist = true;
            }
          })
          .then(() => {
            this.emailLoading = false;
          });
      },
      // handleIdNumberExistance(val) {
      //   this.idNumberLoading = true;
      //   axios({
      //     url: "user/check_id_number",
      //     method: "post",
      //     data: {
      //       id_number: val,
      //     },
      //   })
      //     .then((res) => {
      //       if (!res.data.exist) {
      //         this.idNumberExist = false;
      //       } else {
      //         this.idNumberExist = true;
      //       }
      //     })
      //     .then(() => {
      //       this.idNumberLoading = false;
      //     });
      // },
      handleCountries() {
        axios({
          method: "get",
          url: "countries",
        }).then((response) => {
          const items = response.data.data;
          this.countryItems = [];
          for (const item of items) {
            this.countryItems.push({
              text: item.name_en,
              value: item.id,
            });
          }
        });
      },
      handlePrecentDisc() {
        const discountVal = this.subtotal * (this.discountPercent / 100);
        this.discountMoney = discountVal.toFixed(2);
        this.finalSubtotal = (this.subtotal - discountVal).toFixed(2);
      },
      handleMoneyDisc() {
        this.discountPercent = (
          (this.discountMoney / this.subtotal) *
          100
        ).toFixed(2);
        this.finalSubtotal = (this.subtotal - this.discountMoney).toFixed(2);
      },
      handleSubmit() {
        axios({
          url: "user/store",
          method: "post",
          data: {
            first_name: this.firstname,
            last_name: this.lastname,
            gender: this.gender,
            email: this.email,
            phone: this.phone,
            additional_number: this.additional_number,
            id_number: this.id_number,
            birthdate: this.birthdate,
            street: this.street,
            city_id: this.city,
            country_id: this.country,
            price: this.finalSubtotal,
            status: this.PaymentMethod,
            paid: this.finalSubtotal,
            debet: this.debtBalance,
            item_id: [this.purchaseItem],
            item_price: [`${this.itemPrice}`],
            start_date: [`${this.startDate}`],
            end_date: [`${this.endDate}`],
            quantity: [this.quantity],
            type: [`${this.itemsTypes}`],
          },
        }).then((res) => {
          this.$nextTick(() => {
            window.open(
              `https://back.zulufitness.co/api/pdf/${res.data.id}`,
              "blank"
            );
          });
          this.shipping= 0;
          this.step= 1;
          this.firstname= null,
        this.lastname= null,
        this.email= null,
        this.emailExist= false,
        this.emailLoading= false,
        this.phone= null,
        this.additional_number= null,
        this.id_number= null,
        this.idNumberExist= false,
        this.idNumberLoading= false,
        this.birthdate= null,
        this.gender= null,
        this.street= null,
        this.city = null,
        this.state =  null,
        this.post_code = null,
        this.country = null,
        this.cityLoading = false,
        this.countryItems = [],
        this.cityItems = [],
        // Step 2
        this.itemsTypes = null,
        this.purchaseItem = null,
        this.itemPrice = null,
        this.startDate = null,
        this.endDate = null,
        this.debt = false,
        this.debtBalance = null,
        this.PaymentMethod = "cash",
        this.subtotal = 0,
        this.discountPercent = 0,
        this.discountMoney = 0,
        this.finalSubtotal = 0,
        this.purchaseItemItems = [],
        this.quantity = null,
          this.closeSheet();
          
          this.handleCountries();
          
          
        });
      },
    },
    watch: {
      step1Valid: {
        handler: function () {
          this.stepOneCheck();
        },
        deep: true,
      },
      step2Valid: {
        handler: function () {
          this.stepTwoCheck();
        },
        deep: true,
      },
      step3Valid: {
        handler: function () {
          this.stepThreeCheck();
        },
        deep: true,
      },
      step(newVal) {
        if (newVal == 1) {
          this.stepOneCheck();
        } else if (newVal == 2) {
          this.stepTwoCheck();
        } else if (newVal == 3) {
          this.stepThreeCheck();
          // this.validStep = true;
        }
        // else if (newVal == 3) {
        //   this.stepThreeCheck();
        // } else if (newVal == 4) {
        //   this.stepFourCheck();
        // }
      },
      email(newVal) {
        this.handleEmailExistance(newVal);
      },
      // id_number(newVal) {
      //   this.handleIdNumberExistance(newVal);
      // },
      country(newVal) {
        this.cityLoading = true;
        if (newVal) {
          this.cityItems = [];
          this.city = null;
          axios({
            method: "get",
            url: `country/show/${newVal}`,
          })
            .then((response) => {
              let items = response.data.data.city;
              for (const item of items) {
                this.cityItems.push({ text: item.name_en, value: item.id });
              }
            })
            .then(() => {
              this.cityLoading = false;
            });
        } else {
          this.city = null;
        }
      },
      itemsTypes(newVal) {
        if (newVal) {
          this.itemsLoading = true;
          this.purchaseItemItems = [];
          this.purchaseItem = null;
          axios({
            url: `item_type/${newVal}`,
            method: "GET",
          })
            .then((res) => {
              for (const item of res.data.data) {
                const itemObj = {
                  text: `${item.name}`,
                  value: item.id,
                  price: item.price,
                };
                this.purchaseItemItems.push(itemObj);
              }
            })
            .then(() => {
              this.itemsLoading = false;
              if (newVal === "product") {
                this.step2Valid.startDate = true;
                this.step2Valid.endDate = true;
                this.step2Valid.quantity = false;
              } else {
                this.step2Valid.startDate = false;
                this.step2Valid.endDate = false;
                this.step2Valid.quantity = true;
              }
            });
        } else {
          this.purchaseItem = null;
        }
      },
      purchaseItem(newVal) {
        if (newVal) {
          let selectedItem = this.purchaseItemItems.find(
            (item) => item.value === newVal
          );
          this.itemPrice = selectedItem.price;
        } else {
          this.itemPrice = null;
        }
      },
      itemPrice(newVal) {
        if (this.PaymentMethod === "cash") {
          this.subtotal = newVal;
        } else {
          this.debtBalance = newVal;
          this.subtotal = this.itemPrice - this.debtBalance;
        }
        this.handleMoneyDisc();
        this.finalSubtotal = (this.subtotal - this.discountMoney).toFixed(2);
      },
      debtBalance(newVal) {
        this.subtotal = this.itemPrice - newVal;
        this.finalSubtotal = (this.subtotal - this.discountMoney).toFixed(2);
      },
      // discountMoney(newVal) {
      //
      // },
      // discountPercent(newVal) {
      //
      // },
      PaymentMethod(newVal) {
        if (newVal === "debet") {
          this.debt = true;
          this.debtBalance = this.itemPrice;
        } else {
          this.debt = false;
          this.step2Valid.debtBalance = true;
          this.debtBalance = null;
        }
      },
    },
    mounted: function () {
      this.handleCountries();
    },
  };
</script>
