<template>
  <v-sheet color="primary" class="pa-7">
    <div class="d-flex align-start mb-4">
      <div class="avatar d-flex align-center me-5">
        <v-avatar color="info" size="150" v-if="member.first_name && member.last_name">
          <span class="text-h4">
            {{ AvatarLetters }}
          </span>
        </v-avatar>
      </div>
      <div class="d-flex justify-center flex-column flex-fill me-5">
        <h2 class="text-h5 font-weight-bold mb-3">{{ fullName }}</h2>
        <p class="text-body-2 mb-2">
          {{ $vuetify.locale.t("$vuetify.global.profile.client_since") }}:
          {{ date }}
        </p>
        <p class="text-body-2 mb-2">
          <span class="font-weight-medium"
            >{{ $vuetify.locale.t("$vuetify.global.profile.age") }}: </span
          >{{ age + " " + $vuetify.locale.t("$vuetify.global.profile.year.plural") }}
        </p>
        <p class="text-body-2 mb-2">
          <span class="font-weight-medium"
            >{{ $vuetify.locale.t("$vuetify.global.email.this") }}: </span
          >{{ member.email }}
        </p>
        <p class="text-body-2 mb-2">
          <span class="font-weight-medium"
            >{{ $vuetify.locale.t("$vuetify.global.phone.this") }}:
          </span>
          {{ member.phone }}
        </p>
        <p class="text-body-2 mb-2" v-if="member.additional_number">
          <span class="font-weight-medium"
            >{{ $vuetify.locale.t("$vuetify.global.additional_num.this") }}:
          </span>
          {{ member.additional_number }}
        </p>
      </div>
    </div>
  </v-sheet>

  <v-tabs v-model="tab" fixed-tabs border-bottom color="primary">
    <v-tab v-for="item in tabsItems" :key="item.key" :value="item.key">
      {{ item.value }}
    </v-tab>
  </v-tabs>
  <v-divider class="mb-6"></v-divider>

  <v-window v-model="tab">
    <v-window-item v-for="item in tabsItems" :key="item.key" :value="item.key">
      <div v-if="tabsItems.indexOf(item) === 0">
        <memberships-table :userId="$route.params.id" />
        <products-table />
        <div class="mb-16">
          <invoices-table />
        </div>
        <div style="position: fixed !important; bottom: 20px; right: 20px">
          <the-profile-controller>
            <v-list-item @click="newOrder = !newOrder">
              <v-list-item-title class="d-flex align-center">
                <v-icon
                  class="bg-primary rounded-circle d-flex align-center flex-shrink-0 me-2"
                  style="width: 35px; height: 35px"
                >
                  fa-solid fa-cart-shopping fa-xs
                </v-icon>
                {{ $vuetify.locale.t("$vuetify.global.purchase.add") }}
              </v-list-item-title>
            </v-list-item>
          </the-profile-controller>
        </div>
      </div>
      <div v-if="tabsItems.indexOf(item) === 1">
        <v-row>
          <v-col cols="3" class="mb-7">
            <contact-details :memberDetails="member" />
          </v-col>
          <v-col cols="3" class="mb-7">
            <personal-details :memberDetails="member" />
          </v-col>
          <v-col cols="3" class="mb-7">
            <documents-details :memberDetails="member.userdocument" />
          </v-col>
          <v-col cols="3" class="mb-7">
            <injury-details :memberDetails="member" />
          </v-col>
        </v-row>

        <div style="position: fixed !important; bottom: 20px; right: 20px">
          <the-profile-controller>
            <!-- <v-list-item>
              <v-list-item-title class="d-flex align-center">
                <v-icon
                  class="bg-background rounded-circle d-flex align-center flex-shrink-0 me-2"
                  style="width: 35px; height: 35px"
                >
                  fa-solid fa-rotate fa-xs
                </v-icon>
                send welcome email again
              </v-list-item-title>
            </v-list-item> -->



           
 <!--  send welcome email again-->
            <v-list-item>
              <v-list-item-title class="d-flex align-center">
            <v-dialog width="500">
              <template v-slot:activator="{ props }">
                <v-list-item-title class="d-flex align-center">
                <v-btn v-bind="props" text="  send welcome email again"  >
                  <v-icon
                  class="bg-background rounded-circle d-flex align-center flex-shrink-0 me-2"
                  style="width: 35px; height: 35px"
                >
                  fa-solid fa-rotate fa-xs
                </v-icon>
                send welcome email again
                </v-btn>
              </v-list-item-title>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card  title=" send welcome email again">
                  <v-card-text>
                    
                    This will restrict this user from booking classes using the mobile application,
                    are you sure you want to continue?
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="yes" @click="this.welcomemsg()"></v-btn>
                    <v-btn text="No" @click="isActive.value = false"></v-btn>
                  </v-card-actions>
                  
                  <v-alert   v-if="alertmessage"
                    color="success"
                    icon="$success"
                    title="send welcome message successfully
                    "
                    
                   
                      transition="scale-transition"
                    text="please check your E-mail"
                    :value="alert"
                    >
                    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                  </v-alert>
                </v-card>
            
              </template>
            </v-dialog>
            </v-list-item-title>
            </v-list-item>
            <v-container>
      
    </v-container>

    <!-- <v-alert
      color="success"
      icon="$success"
      title="send welcome message successfully
      "
      v-if="alertmessage "
        transition="scale-transition"
      text="please check your E-mail"
      :value="alert"
      ></v-alert> -->
            <!-------------------------------------------------------------------------------------------->      


              <!-- <v-list-item-title class="d-flex align-center">
                <v-icon
                  class="bg-light-blue-darken-1 rounded-circle d-flex align-center flex-shrink-0 me-2"
                  style="width: 35px; height: 35px"
                >
                  fa-solid fa-rotate fa-xs
                </v-icon>
                reset password
              </v-list-item-title> -->
         


          
            <!-- reset password-->
            <v-list-item>
              <v-list-item-title class="d-flex align-center">
            <v-dialog width="500">
              <template v-slot:activator="{ props }">
                <v-list-item-title class="d-flex align-center">
                <v-btn v-bind="props" text=" reset password"  >
                  <v-icon
                  class="bg-light-blue-darken-1 rounded-circle d-flex align-center flex-shrink-0 me-2"
                  style="width: 35px; height: 35px"
                >
                  fa-solid fa-rotate fa-xs
                </v-icon>
                reset password
                </v-btn>
              </v-list-item-title>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="reset password">
                  <v-card-text>
                    This will restrict this user from booking classes using the mobile application,
                    are you sure you want to continue?
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="yes" @click="continue1"></v-btn>
                    <v-btn text="No" @click="isActive.value = false"></v-btn>
                  </v-card-actions>
                </v-card>
            
              </template>
            </v-dialog>
            </v-list-item-title>
            </v-list-item>
            <!-------------------------------------------------------------------------------------------->      




            <!-- <v-list-item>
              <v-list-item-title class="d-flex align-center">
                <v-icon
                  class="bg-background rounded-circle d-flex align-center flex-shrink-0 me-2"
                  style="width: 35px; height: 35px"
                >
                  fa-solid fa-right-left fa-xs
                </v-icon>
                conver client to lead
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="d-flex align-center">
                <v-icon
                  class="bg-blue-grey-darken-1 rounded-circle d-flex align-center flex-shrink-0 me-2"
                  style="width: 35px; height: 35px"
                >
                  fa-solid fa-thumbs-down fa-xs
                </v-icon>
                deactive member
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="d-flex align-center">
                <v-icon
                  class="bg-background rounded-circle d-flex align-center flex-shrink-0 me-2"
                  style="width: 35px; height: 35px"
                >
                  fa-solid fa-rotate-right fa-xs
                </v-icon>
                Convert member to coach
              </v-list-item-title>
            </v-list-item> -->



            
            <!-- convert Member To coach-->
            <v-list-item>
              <v-list-item-title class="d-flex align-center">
            <v-dialog width="500">
              <template v-slot:activator="{ props }">
                <v-list-item-title class="d-flex align-center">
                <v-btn v-bind="props" text=" Convert member to coach"  >
                  <v-icon
                  class="bg-background rounded-circle d-flex align-center flex-shrink-0 me-2"
                  style="width: 35px; height: 35px"
                >
                  fa-solid fa-rotate-right fa-xs
                </v-icon>
                Convert member to coach
                </v-btn>
              </v-list-item-title>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="convert Member To Coach">
                  <v-card-text>
                    This will restrict this user from booking classes using the mobile application,
                    are you sure you want to continue?
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="yes" @click="continue1"></v-btn>
                    <v-btn text="No" @click="isActive.value = false"></v-btn>
                  </v-card-actions>
                </v-card>
            
              </template>
            </v-dialog>
            </v-list-item-title>
            </v-list-item>
            <!-------------------------------------------------------------------------------------------->            
            <!-- block member-->
            <v-list-item>
              <v-list-item-title class="d-flex align-center">
            <v-dialog width="500">
              <template v-slot:activator="{ props }">
                <v-list-item-title class="d-flex align-center">
                <v-btn v-bind="props" text="Block Member"  >
                  <v-icon
                      class="bg-deep-orange-accent-4 rounded-circle d-flex align-center flex-shrink-0 me-2"
                      style="width: 35px; height: 35px"
                    >
                      fa-solid fa-ban fa-xs
                    </v-icon>
                    block member
                </v-btn>
              </v-list-item-title>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Block member">
                  <v-card-text>
                    This will restrict this user from booking classes using the mobile application,
                    are you sure you want to continue?
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="yes" @click="continue1"></v-btn>
                    <v-btn text="No" @click="isActive.value = false"></v-btn>
                  </v-card-actions>
                </v-card>
            
              </template>
            </v-dialog>
            </v-list-item-title>
            </v-list-item>
            <!-------------------------------------------------------------------------------------------->
            <!-- <v-dialog width="500">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props">
                  <v-list-item-title class="d-flex align-center">
                    <v-icon
                      class="bg-deep-orange-accent-4 rounded-circle d-flex align-center flex-shrink-0 me-2"
                      style="width: 35px; height: 35px"
                    >
                      fa-solid fa-ban fa-xs
                    </v-icon>
                    block member
                  </v-list-item-title>
                </v-list-item>
              </template>
              <template id="ff" @v-slot:default="this.isActive">
                <v-card title="Are you sure ?">
                  <v-card-text>
                    This will restrict this user from booking classes using the mobile application,
                    are you sure you want to continue?
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="this.isActive = false">
                      Cancel
                    </v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="changeUser"> Yes </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog> -->
              <v-list-item>
              <v-list-item-title class="d-flex align-center">
            <v-dialog width="500">
              <template v-slot:activator="{ props }">
                <v-list-item-title class="d-flex align-center">
                <v-btn v-bind="props" text="Block Member" margin-top="2px"  >
                  <v-icon
                  class="bg-deep-orange rounded-circle d-flex align-center flex-shrink-0 me-2"
                  style="width: 35px; height: 35px"
                >
                  fa-solid fa-trash-alt fa-xs
                </v-icon>
                    permanent delete
                </v-btn>
              </v-list-item-title>
              </template>
            


              <template v-slot:default="{ isActive }">
                <v-card title="permanent delete" >
                  <v-card-text>
                    This will permanent delete this user from booking classes using the mobile application,
                    are you sure you want to continue?
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="yes" @click="continue1"></v-btn>
                    <v-btn text="No" @click="isActive.value = false"></v-btn>
                  </v-card-actions>
                </v-card>
            
              </template>
            </v-dialog>
            </v-list-item-title>
            </v-list-item>
            <!-- <v-list-item>
              <v-list-item-title class="d-flex align-center">
                <v-icon
                  class="bg-deep-orange rounded-circle d-flex align-center flex-shrink-0 me-2"
                  style="width: 35px; height: 35px"
                >
                  fa-solid fa-trash-alt fa-xs
                </v-icon>
                permanent delete
              </v-list-item-title>
            </v-list-item> -->
          </the-profile-controller>
        </div>
      </div>
      <div v-if="tabsItems.indexOf(item) === 3">
        <tasks-table />
      </div>
      <div v-if="tabsItems.indexOf(item) === 4">
        <bookings-types :bookings-items="bookingsTypes" />
        <div style="position: fixed !important; bottom: 20px; right: 20px">
          <the-profile-controller>
            <v-list> 
            <v-list-item @click="NewBooking = !NewBooking">
              <!-- <v-list-item @click="newBooking = !newBooking"> -->
             
                
                <v-list-item-title class="d-flex align-center">
                <v-icon
                  class="bg-primary rounded-circle d-flex align-center flex-shrink-0 me-2"
                  style="width: 35px; height: 35px"
                >
                  fa-solid fa-cart-shopping fa-xs
                </v-icon>
                
                {{ $vuetify.locale.t("$vuetify.global.Booktocourse.placeholder") }}
              </v-list-item-title>
    


                    
     
            </v-list-item>
             </v-list>


             <v-list> 
            <v-list-item @click="NewBooking = !NewBooking">
              <!-- <v-list-item @click="newBooking = !newBooking"> -->
             
                
             


              <v-list-item-title class="d-flex align-center">
                <v-icon
                  class="bg-primary rounded-circle d-flex align-center flex-shrink-0 me-2"
                  style="width: 35px; height: 35px"
                >
                  fa-solid fa-cart-shopping fa-xs
                </v-icon>
                
                {{ $vuetify.locale.t("$vuetify.global.FutureBooking.placeholder") }}
              </v-list-item-title>
                    
     
            </v-list-item>
             </v-list>










          </the-profile-controller>
        </div>
      </div>
    </v-window-item>
  </v-window>
  <new-order v-model="newOrder" @close="newOrder = !newOrder" />
  <new-booking v-model="NewBooking" @close="NewBooking = !NewBooking" />
</template>

<script>
import axios from "axios";
import { defineAsyncComponent } from "vue";
import InjuryDetails from "@/components/member/profile/InjuryDetails.vue";

const MembershipsTable = defineAsyncComponent(() =>
  import("@/components/member/memberships-and-payments/memberships/MembershipsTable.vue")
);
const ProductsTable = defineAsyncComponent(() =>
  import("@/components/member/memberships-and-payments/products/ProductsTable.vue")
);
const InvoicesTable = defineAsyncComponent(() =>
  import("@/components/member/memberships-and-payments/invoices/InvoicesTable.vue")
);
const TasksTable = defineAsyncComponent(() =>
  import("@/components/member/memberships-and-payments/tasks/TasksTable.vue")
);
const PersonalDetails = defineAsyncComponent(() =>
  import("@/components/member/profile/PersonalDetails.vue")
);
const DocumentsDetails = defineAsyncComponent(() =>
  import("@/components/member/profile/DocumentsDetails.vue")
);
const ContactDetails = defineAsyncComponent(() =>
  import("@/components/member/profile/ContactDetails.vue")
);
const BookingsTypes = defineAsyncComponent(() =>
  import("@/components/member/bookings/BookingsTypes.vue")
);
const TheProfileController = defineAsyncComponent(() =>
  import("@/components/TheProfileController.vue")
);
const NewOrder = defineAsyncComponent(() => import("@/components/NewOrder.vue"));
const NewBooking = defineAsyncComponent(() => import("@/components/NewBooking.vue"));

export default {
  props: ["id"],
  components: {
    MembershipsTable,
    ProductsTable,
    InvoicesTable,
    TasksTable,
    ContactDetails,
    PersonalDetails,
    DocumentsDetails,
    InjuryDetails,
    BookingsTypes,
    TheProfileController,
    NewOrder,
    NewBooking,
  },
  data: () => ({
    tab: null,
    isActive: false,
    isopen: false,
    message: '',
    alert:true,
    alertmessage: false,
    bookingsTypes: [
      { type: "history", title: "Bookings history" },
      { type: "cancelled", title: "Late Cancellations" },
      { type: "future", title: "Future Bookings" },
    ],
    newOrder: false,
    NewBooking: false,
  }),
  computed: {
    user_id() {
      return this.$route.params.id;
    },
    tabsItems() {
      return [
        {
          key: "memberships_payments",
          value: this.$vuetify.locale.t("$vuetify.global.profile.tabs.memberships_payments"),
        },
        {
          key: "profile",
          value: this.$vuetify.locale.t("$vuetify.global.profile.this"),
        },
        {
          key: "activity_log",
          value: this.$vuetify.locale.t("$vuetify.global.profile.tabs.activity_log"),
        },
        {
          key: "tasks",
          value: this.$vuetify.locale.t("$vuetify.nav_drawer.task.plural"),
        },
        {
          key: "bookings",
          value: this.$vuetify.locale.t("$vuetify.global.profile.tabs.bookings"),
        },
      ];
    },
    member() {
      return this.$store.getters["members/member"];
    },
    fullName() {
      return `${this.member.first_name} ${this.member.last_name}`;
    },
    AvatarLetters() {
      let first = this.member.first_name;
      let last = this.member.last_name;
      let letters = `${first.charAt(0)} ${last.charAt(0)}`;
      return letters.toUpperCase();
    },
    date() {
      const newDate = new Date(Date.parse(this.member.created_at));
      return `${newDate.toLocaleString("default", {
        month: "long",
      })}  ${newDate.getFullYear()}`;
    },
    age() {
      const getAge = (birthDate) =>
        Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);
      return getAge(this.member.birthdate);
    },
  },
  methods: {
    continue1() {
      console.log("tmaaaam");
    },
    loadMember() {
      this.$store.dispatch("members/fetchUser", this.id);
    },
    changeUser() {
    
      axios({
        url: `/user/update_status/${this.id}`,
        method: "post",
        data: {
          status: "active",
        },
      }).then((res) => {
        isActive.value = false;
        console.log( "res" ,res.data);
      });
    },
    welcomemsg() {
      axios({
      url:`/send-mail/${this.id}`,
      method:'post',
      data :{
        type : 'password'
      }
      
      
      } ).then((res)=>{



        if (res.status===200){
    
          this.message=res.data.message
          console.log( "data" ,res.data)
                this.alertmessage=!this.alertmessage
        }
      
      })
    }, 
     wlcm() {
            if (this.welcomemsg()) {
              this.alertmessage =!this.alertmessage
            } else {
              this.alertmessage= false
            }
          },




    convert() {
      axios({
      url:`convert/${this.id}`,
      method:'post',
      data :{
        type : 'staff'
      }
      
      } ).then((res)=>{
        
            console.log( "data" ,res.data)
      })
    },
    alert(){


      this.alertmessage =!this.alertmessage
    }

  },
   watch: {
    NewBooking: function (old, neww) {
      console.log("1:", old);
      console.log("2:", neww);
    },
     message(oldval,newVal){
       this.message=newVal
     },
     alert(oldval,newVal){
      this.alert =newVal
      console.log( '1', oldval)
      console.log('2',newVal)
     },

     alertmessage(oldval,newVal){
      this.alertmessage= newVal
      console.log(newVal , "alertmessage")
     }
  },

  mounted() {
    this.loadMember();
    this.convert();
    this.changeUser();
  },
};
</script>
<style>

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}

</style>