<template>
  <v-row>
    <v-col class="mb-4" style="width: 20%">
      <v-divider
        :thickness="2"
        class="border-opacity-100"
        color="primary"
      ></v-divider>
      <v-card elevation="0" rounded="0" class="h-100">
        <template v-slot:title>
          <div class="d-flex align-center justify-space-between flex-wrap">
            <h5 class="text-subtitle-1 text-grey">revenue</h5>
            <v-icon style="color:grey" icon="fa-solid fa-money-bills fa-lg"></v-icon>
          </div>
        </template>
        <v-card-text>
          <p class="text-h4 mb-3">{{ salesStats }} KWD</p>
          <v-select
            v-model="sales"
            density="compact"
            variant="outlined"
            class="elevation-0 bg-background p-2"
            :items="['Today', 'Month', 'Year']"
            single-line
            hide-details
          ></v-select>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col class="mb-4" style="width: 20%">
      <v-divider
        :thickness="2"
        class="border-opacity-100"
        color="primary"
      ></v-divider>
      <v-card elevation="0" rounded="0" class="h-100">
        <template v-slot:title>
          <div class="d-flex align-center justify-space-between flex-wrap">
            <h5 class="text-subtitle-1 text-grey">Debts</h5>
            <v-icon style="color:grey" icon="fa-solid fa-money-bill-transfer fa-lg"></v-icon>
          </div>
        </template>
        <v-card-text>
          <p class="text-h4 mb-3">{{this.statistics.debets}} KWD</p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col class="mb-4" style="width: 20%">
      <v-divider
        :thickness="2"
        class="border-opacity-100"
        color="primary"
      ></v-divider>
      <v-card elevation="0" rounded="0" class="h-100">
        <template v-slot:title>
          <div class="d-flex align-center justify-space-between flex-wrap">
            <h5 class="text-subtitle-1 text-grey">Today's Visits</h5>
            <v-icon style="color:grey" icon="fa-solid fa-calendar-check fa-lg"></v-icon>
          </div>
        </template>
        <v-card-text>
          <p class="text-h4 mb-3">0</p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col class="mb-4" style="width: 20%">
      <v-divider
        :thickness="2"
        class="border-opacity-100"
        color="error"
      ></v-divider>
      <v-card elevation="0" rounded="0" class="h-100">
        <template v-slot:title>
          <div class="d-flex align-center justify-space-between flex-wrap">
            <h5 class="text-subtitle-1 text-grey">About to Expire</h5>
            <v-icon style="color:grey" icon="fa-solid fa-triangle-exclamation fa-lg"></v-icon>
          </div>
        </template>
        <v-card-text class="d-flex">
          <span>
            <p class="text-h4 mb-1">0</p>
            <span class="text-caption text-grey">Plans</span>
          </span>
          <v-divider class="mx-2" vertical></v-divider>
          <span>
            <p class="text-h4 mb-1">{{this.statistics.expire_memberships}}</p>
            <span class="text-caption text-grey">Session Punch Cards</span>
          </span>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col class="mb-4" style="width: 20%">
      <v-divider
        :thickness="2"
        class="border-opacity-100"
        color="error"
      ></v-divider>
      <v-card elevation="0" rounded="0" class="h-100">
        <template v-slot:title>
          <div class="d-flex align-center justify-space-between flex-wrap">
            <h5 class="text-subtitle-1 text-grey">No Shows</h5>
            <v-icon style="color:grey" icon="fa-solid fa-ghost fa-lg"></v-icon>
          </div>
        </template>
        <v-card-text>
          <p class="text-h4 mb-3">0</p>
          <v-select
            density="compact"
            variant="outlined"
            class="elevation-0 bg-background p-2"
            :items="['Last 7 Days', 'Last 14 Days', 'Last 30 Days']"
            model-value="Last 7 Days"
            single-line
            hide-details
          ></v-select>
        </v-card-text>
      </v-card>
    </v-col>
</v-row>
<v-row>    
    <v-col class="mb-4" cols="8">
      <v-divider
        :thickness="2"
        class="border-opacity-100"
        color="primary"
      ></v-divider>
      <v-card elevation="0" rounded="0" class="h-100">
        <template v-slot:title>
          <div class="d-flex align-center justify-space-between flex-wrap">
            <h5 class="text-subtitle-1 text-grey">Members Overview</h5>
            <v-icon style="color:grey" icon="fa-solid fa-users fa-lg"></v-icon>
          </div>
        </template>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
          <v-tabs
            v-model="tab"
            fixed-tabs
            border-bottom
            color="primary"
            class="h-auto"
          >
            <v-tab
              v-for="item in tabsItems"
              :key="item.key"
              :value="item.key"
              class="justify-start h-auto pa-3"
            >
              <span class="text-start">
                <h5 class="text-subtitle-1 text-grey">{{ item.value }}</h5>
                <p class="text-h4 mt-3" v-if="tabsItems.indexOf(item) === 0 && this.statistics.active_members != null">{{this.statistics.active_members.length}}</p>
                <p class="text-h4 mt-3" v-if="tabsItems.indexOf(item) === 1">0</p>
                <p class="text-h4 mt-3" v-if="tabsItems.indexOf(item) === 2">0</p>
              </span>
            </v-tab>
          </v-tabs>
          <v-divider class="mb-6"></v-divider>

          <v-window v-model="tab">
            <v-responsive :aspect-ratio="16 / 7">
              <v-window-item
                v-for="item in tabsItems"
                :key="item.key"
                :value="item.key"
              >
                <div v-if="tabsItems.indexOf(item) === 0"><Line v-if="loaded" :data="chartData" /></div>
                <div v-if="tabsItems.indexOf(item) === 1"><Line v-if="loaded"  :data="chartData2" /></div>
                <div v-if="tabsItems.indexOf(item) === 2"></div>
              </v-window-item>
            </v-responsive>
          </v-window>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col class="mb-4" cols="4">
      <v-divider
        :thickness="2"
        class="border-opacity-100"
        color="success"
      ></v-divider>
      <v-card elevation="0" rounded="0" class="h-100">
        <template v-slot:title>
          <div class="d-flex align-center justify-space-between flex-wrap">
            <h5 class="text-subtitle-1 text-grey">Leads Overview</h5>
            <v-icon style="color:grey" icon="fa-solid fa-circle-user fa-lg"></v-icon>
          </div>
        </template>
        <v-divider></v-divider>
        <v-card-text class=""></v-card-text>
      </v-card>
    </v-col>
  </v-row>
      <v-row>
    <v-col class="mb-4" cols="4">
      <v-divider
        :thickness="2"
        class="border-opacity-100"
        color="primary"
      ></v-divider>
      <v-responsive :aspect-ratio="16 / 20">
        <v-card elevation="0" rounded="0" class="h-100">
          <template v-slot:title>
            <div class="d-flex align-center justify-space-between flex-wrap">
              <h5 class="text-subtitle-1">Revenue Overview</h5>
            </div>
          </template>
          <v-divider></v-divider>
          <v-card-text class=""> </v-card-text>
        </v-card>
      </v-responsive>
    </v-col>

    <v-col class="mb-4" cols="4">
      <v-divider
        :thickness="2"
        class="border-opacity-100"
        color="primary"
      ></v-divider>
      <v-responsive :aspect-ratio="16 / 20">
        <v-card elevation="0" rounded="0" class="h-100">
          <template v-slot:title>
            <div class="d-flex align-center justify-space-between flex-wrap">
              <h5 class="text-subtitle-1">Upcoming Tasks</h5>
            </div>
          </template>
          <v-divider></v-divider>
          <v-card-text class=""></v-card-text>
        </v-card>
      </v-responsive>
    </v-col>

    <v-col class="mb-4" cols="4">
      <v-divider
        :thickness="2"
        class="border-opacity-100"
        color="primary"
      ></v-divider>
      <v-responsive :aspect-ratio="16 / 20">
        <v-card elevation="0" rounded="0" class="h-100">
          <template v-slot:title>
            <h5 class="text-subtitle-1 mb-3">Upcoming group sessions</h5>
            <v-responsive width="150">
              <v-select
                density="compact"
                variant="outlined"
                class="elevation-0 bg-background p-2"
                :items="['Today', 'Tomorrow', 'The day after tomorrow']"
                model-value="Today"
                single-line
                hide-details
              ></v-select>
            </v-responsive>
          </template>
          <v-divider></v-divider>
          <v-card-text class=""> </v-card-text>
        </v-card>
      </v-responsive>
    </v-col>
  </v-row>
</template>
<script>
import statistics from '@/store/modules/statistics';
import { interactionSettingsStore } from '@fullcalendar/core/internal';
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

  export default {
    name: 'BarChart',
    components: { Line },
    data: () => ({
      search: null,
      statistics: [],
      bookings: "Today",
      sales: "Today",
      label: ['jan','fab','ac'],
      tab: null,
      loaded: false,
      chartData: null,
      chartData2: null,
      tabsItems: [
        { key: "activeMembers", value: "Active Members", num:  0 },
        { key: "ActiveMemberships", value: "Active memberships", num: 5 },
        { key: "SessionPunch", value: "Session Punch Cards", num: 3 },
      ],
    }),
    computed: {
      getStatistics() {
        return this.$store.getters["statistics/statistics"];
      },
      bookingsStats() {
        const booking = () => {
          if (this.bookings === "Today") {
            return this.statistics.today_bookings;
          } else if (this.bookings === "Month") {
            return this.statistics.month_bookings;
          } else {
            return this.statistics.year_bookings;
          }
        };
        return booking();
      },
      salesStats() {
        const sale = () => {
          if (this.sales === "Today") {
            return this.statistics.today_sales;
          } else if (this.sales === "Month") {
            return this.statistics.month_sales;
          } else {
            return this.statistics.year_sales;
          }
        };
        return sale();
      },
      member() {
        return this.$store.getters.member;
      },
      getLabels() {
        const label = () => {
            return this.statistics.label;
        };
        return label();
      },
      
    },
    methods: {
      loadStatistics() {
        this.$store.dispatch("statistics/fetchStatistics");
      },
      
    },
    watch: {
      getStatistics(newVal) {
        if (newVal){
          this.statistics = newVal;
          if(this.statistics != []){
            this.label = this.statistics.label;
            this.loaded = false;
              this.chartData = {
              labels:  this.statistics.label,
              datasets: [
                {
                  label: 'Data One',
                  backgroundColor: '#f87979',
                  data: this.statistics.active_members
                }
              ]
            };
            this.chartData2 = {
              labels:  this.statistics.label,
              datasets: [
                {
                  label: 'Data One',
                  backgroundColor: '#f87979',
                  data: this.statistics.active_memberships
                }
              ]
            };
            this.loaded = true;
          }
          
          console.log(this.statistics.label);
         }
        else {this.statistics = []};
      },
    },
    mounted () {
      
    },
    created() {
      this.loadStatistics();
    },

  };
</script>
