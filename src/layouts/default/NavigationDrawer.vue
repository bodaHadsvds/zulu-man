<template>
  <v-navigation-drawer
    v-model="drawer"
    location="right"
    sticky
    rounded
    floating
    width="400"
    temporary
  
  >
    <v-container class="mx-auto  " width="300"  >
      <v-card   class=" tab "  > 
      <v-responsive> 
      <v-text-field 
        v-model="searchField"
        :loading="loading"
        density="compact"
        variant="solo"
        label="search"
        append-inner-icon="fa-solid fa-magnifying-glass"
        single-line
        hide-details
        @input="searchField()"

        class="v-text-field--outlined"
      > </v-text-field>
     
    </v-responsive>
  </v-card>
    </v-container >
<v-container class="mx-auto  " max-width="300" >    

    <v-list lines="two"  >

      <v-container class="h-25  "  > 
    <h2 class=" mx-auto rounded araboc"> Members   <v-icon icon="fa-solid fa-users"></v-icon>   <v-btn small class=""> <div class=""> + Add new member</div> </v-btn></h2> 
    
     

      <v-list-item   class="d-flex flex-row justfay-space-around"
       v-for="member in members"
       :key="member.id"
      :title="   member.first_name + '  '+ member.last_name  "
   
      >  <v-icon class="flex-warp" icon="fa-solid fa-users"></v-icon> 
      
   
      
      <v-btn class="bttn"  depressed>
       inactive
      </v-btn>
    
    </v-list-item>             

  </v-container>

  <v-container>  
    <h2  class=" araboc mx-auto  rounded"> Leads   <v-icon  icon=" fa-solid fa-circle-user">     </v-icon> </h2>   
  
    <v-list-item class="searchbar"
       v-for="lead in leads"
       :key="lead.id"
      :title="  lead.first_name + '   ' +lead.last_name">
    <v-icon class="d-flex" icon=" fa-solid fa-circle-user">     </v-icon>
    </v-list-item>

  </v-container>

  <v-container>

     <h2 class=" araboc mx-auto rounded">staff members <v-icon icon="fa-solid fa-users"></v-icon></h2>


    <v-list-item  class="searchbar"
       v-for="staffmembe in staffmember"
       :key="staffmembe.id"
      :title="staffmembe.first_name + '     '+staffmembe.last_name">
      <v-icon icon="fa-solid fa-users"></v-icon>
    </v-list-item>

  </v-container>
    </v-list>
</v-container>
  </v-navigation-drawer>
  <v-navigation-drawer class="main-navigation" permanent :rail="rail" width="200">
    <v-list>
      <v-list-item class="user-item position-relative">
        <v-list-item :class="[!rail ? 'text-center mt-10 ' : 'my-auto d-none']">
          <img
            src="@/assets/logo.svg"
            alt="Zulu"
            :class="[!rail ? 'my-auto' : 'd-none']"
            height="50"
          />
        </v-list-item>

        <!--searchdrawer-->
        <!-- <v-btn :ripple="false" icon @click="toggleTheme">
    <v-icon>{{ themeIcon }}</v-icon>
  </v-btn> -->

        <v-btn :ripple="false" icon>
          <v-icon variant="text" @click.stop="drawer = !drawer">
            fa-solid fa-magnifying-glass</v-icon
          >
        </v-btn>

        <template v-slot:append>
          <v-btn
            variant="text"
            :icon="rail ? 'fa-solid fa-chevron-right fa-xs' : 'fa-solid fa-chevron-left fa-xs'"
            @click="toggleDrawer"
            :class="[!rail ? 'position-absolute' : 'position-relative']"
            :style="[!rail ? { 'inset-inline-end': '8px', top: '0' } : '']"
          ></v-btn>
        </template>
        <v-btn
          variant="flat"
          prepend-icon="fa-solid fa-wand-sparkles"
          color="primary"
          class="mt-3"
          block
          v-if="!rail"
        >
          <span>
            {{ $vuetify.locale.t("$vuetify.nav_drawer.quick_access") }}
          </span>

          <v-menu activator="parent" :location="location">
            <v-list>
              <v-list-item @click="newMemberSheet = !newMemberSheet" class="d-flex align-center">
                <template v-slot:prepend>
                  <v-icon icon="fa-solid fa-user fa-sm" class="me-3"></v-icon>
                </template>
                <v-list-item-title>
                  {{ $vuetify.locale.t("$vuetify.nav_drawer.quick_access_menu.new_member") }}
                </v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="d-flex align-center">
                <template v-slot:prepend>
                  <v-icon icon="fa-solid fa-address-card fa-sm" class="me-3"></v-icon>
                </template>
                <v-list-item-title>
                  {{ $vuetify.locale.t("$vuetify.nav_drawer.quick_access_menu.my_profile") }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item class="d-flex align-center">
                <template v-slot:prepend>
                  <v-icon icon="fa-solid fa-lock fa-sm" class="me-3"></v-icon>
                </template>
                <v-list-item-title>
                  {{ $vuetify.locale.t("$vuetify.nav_drawer.quick_access_menu.change_password") }}
                </v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="d-flex align-center" @click="handleLogout">
                <template v-slot:prepend>
                  <v-icon icon="fa-solid fa-arrow-right-from-bracket fa-sm" class="me-3"></v-icon>
                </template>
                <v-list-item-title>
                  {{ $vuetify.locale.t("$vuetify.nav_drawer.quick_access_menu.log_out") }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </v-list-item>
    </v-list>

    <new-member v-model="newMemberSheet" @close="newMemberSheet = !newMemberSheet" />

    <v-list :lines="false" density="compact" class="nav-links" nav>
      <v-list-item
        :title="$vuetify.locale.t('$vuetify.nav_drawer.home')"
        color="primary"
        :to="{ name: 'Home' }"
      >
        <template v-slot:prepend>
          <v-icon icon="fa-solid fa-home fa-sm"></v-icon>
        </template>
      </v-list-item>

      <v-list-item
        :title="$vuetify.locale.t('$vuetify.nav_drawer.member.plural')"
        color="primary"
        :to="{ name: 'Members' }"
      >
        <template v-slot:prepend>
          <v-icon icon="fa-solid fa-users fa-sm"></v-icon>
        </template>
      </v-list-item>

      <v-list-item
        :title="$vuetify.locale.t('$vuetify.nav_drawer.schedule.plural')"
        color="primary"
        :to="{ name: 'Schedules' }"
      >
        <template v-slot:prepend>
          <v-icon icon="fa-solid fa-calendar fa-sm"></v-icon>
        </template>
      </v-list-item>

      <v-list-item
        :title="$vuetify.locale.t('$vuetify.nav_drawer.sales.plural')"
        color="primary"
        :to="{ name: 'sales' }"
      >
        <template v-slot:prepend>
          <v-icon icon="fa-solid fa-sack-dollar fa-sm"></v-icon>
        </template>
      </v-list-item>
      <v-list-item
        :title="$vuetify.locale.t('$vuetify.global.branch.plural')"
        color="primary"
        :to="{ name: 'Branches' }"
      >
        <template v-slot:prepend>
          <v-icon icon="fa-solid fa-thumbtack fa-sm"></v-icon>
        </template>
      </v-list-item>
      <v-list-item
        :title="$vuetify.locale.t('$vuetify.global.reports.plural')"
        color="primary"
        :to="{ name: 'Reports' }"
      >
        <template v-slot:prepend>
          <v-icon icon="fa-solid fa-chart-simple fa-sm"></v-icon>
        </template>
      </v-list-item>
      <v-list-item
        :title="$vuetify.locale.t('$vuetify.nav_drawer.task.plural')"
        color="primary"
        :to="{ name: 'Tasks' }"
      >
        <template v-slot:prepend>
          <v-icon icon="fa-solid fa-list-check fa-sm"></v-icon>
        </template>
      </v-list-item>
      <v-list-item
        :title="$vuetify.locale.t('$vuetify.global.lead.plural')"
        color="primary"
        :to="{ name: 'Leads' }"
      >
        <template v-slot:prepend>
          <v-icon icon="fa-solid fa-circle-user fa-sm"></v-icon>
        </template>
      </v-list-item>

      <v-list-item
        :title="$vuetify.locale.t('$vuetify.nav_drawer.settings.settings')"
        color="primary"
        :to="{ name: 'Settings' }"
      >
        <template v-slot:prepend>
          <v-icon icon="fa-solid fa-gears fa-sm"></v-icon>
        </template>
      </v-list-item>
    </v-list>
    <!-- <v-spacer></v-spacer> -->
    <v-divider class="mx-2" v-if="!rail"></v-divider>
    <v-list-item target="_blank" href="https://waitbuzz.com" class="logo-link" v-if="!rail">
      <img src="@/assets/logo-wb.svg" alt="Zulu" class="my-auto d-block" height="30" />
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
// import { transformWithEsbuild } from "vite";
// import { SplitVendorChunkCahe } from 'vite'
import { defineAsyncComponent } from "vue";
const NewMember = defineAsyncComponent(() => import("@/components/NewMember.vue"));

export default {
  // props: ["drawerToggler", "railProp"],
  components: { NewMember },
  data: () => ({
    members:[],
    leads:[],
    staffmember:[],
    searchField: "",
    location: "end",
    newMemberSheet: false,
    rail: false,
    themeIcon: null,
    drawer: false,
    group: null,
    itemgroup: [
      { title: "members", value: 'members' },
      { title: "leads", value : 'leads' },
      { title: "staff members",  value : 'staffmember' },
    ],
  }),
  computed: {
    UserName() {
      const authInfo = this.$store.getters["auth/authInfo"];
      return `${authInfo.auth.first_name} ${authInfo.auth.last_name}`;
    },
    userEmail() {
      const authInfo = this.$store.getters["auth/authInfo"];
      return authInfo.auth.email;
    },
    userAvatarLetters() {
      const authInfo = this.$store.getters["auth/authInfo"];
      const first = authInfo.auth.first_name;
      const last = authInfo.auth.last_name;
      const letters = `${first.charAt(0)} ${last.charAt(0)}`;
      return letters.toUpperCase();
    },
    themeColor() {
      const themeStore = this.$store.getters.theme;
      return themeStore;
    },
   
  },
  methods: {
    handleLogout() {
      this.axios({
        url: "logout-admin",
        method: "POST",
      }).then((res) => {
        if (res.status === 200) {
          this.$store.commit("auth/updateLogout");
        }
      });
    },
    getsearchdata(name){
     
   this.axios({

    url:`user/search?name=${name}`,
    method:"Get"
  
   }).then( (res)=>{

  if(res.status===200){
    // console.log(  'search15', this.$store.commit("auth/search")) 
    console.log(res.data)
      this.members= res.data.member
      this.staffmember=res.data.staff
      this.leads=res.data.leads
    
  }
   
   })
    }
,
// searchdata (e) {
//   if (!this.searchField) {
//     this.getsearchdata = this.getCopy;
//   }

//   this.getsearchdata = this.fruitsCopy.filter(fruit => {
//     return fruit.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
//   })
// },


    toggleDrawer() {
      this.rail = !this.rail;
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
    searchField(oldval,newVal){
    this.getsearchdata(oldval) 
    console.log(newVal , '1')


    },
    members(oldval,newVal){
    
      this.members =newVal
     
    },
    leads(oldval,newVal){
      this.leads =newVal
    },
    staffmember(oldval,newVal){
      this.staffmember =newVal
    } 
   },
  // watch: {
  //   railProp(newVal) {
  //     this.rail = newVal;
  //   },
  // },
  // mounted() {
  //   this.rail = this.railProp;
  // },
};
</script>

<style lang="scss" scoped>
:deep() {
  .v-list-group__items {
    .v-list-item {
      padding-inline-start: 10px !important;
      .v-list-item-title {
        line-height: normal !important;
      }
    }
  }

  .user-item {
    display: flex;
    flex-direction:row;
    align-items: stretch;
    text-align: center;
    .v-list-item__content {
      width: 100%;
     
    
      .v-list-item-title {
        margin-bottom: 5px;
      }
    }
    
    

    .v-liist{
      display: flex;
    flex-direction: row;
    }


    .v-list-item__prepend {
      .v-avatar {
        margin-inline-end: 0;
        margin-bottom: 10px;
        width: 55px;
        height: 55px;
      }
    }
  }
  
  .v-list .v-list-item--nav:not(:only-child) {
    margin-bottom: 8px;
  }
  .v-list-item--nav {
    padding-inline-start: 10px;
    padding-inline-end: 10px;
  }
  .v-list-item--density-compact {
    min-height: 35px;
  }

  .v-list-item--nav .v-list-item-title {
    font-size: 16px;
  }
}



.logo-link {
  display: flex;
  justify-content: center;
  padding: 20px 8px 12px;
  img {
    width: 90px;
  }
}
.nav-links {
  overflow: auto !important;
  flex: 1 !important;
}

.searchbar{
  align-items: stretch;
    background-color: rgba(0, 0, 0, 0);
    border: 0px solid black;
    box-sizing: border-box;
    display: flex;
    flex-basis: auto;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    list-style: none;
    margin: 0px;
    min-height: 0px;
    min-width: 0px;
    padding: 0px;
    position: relative;
    text-decoration: none;
    z-index: 0;
    font-family:   "Segoe UI", Roboto , Helvetica, Arial, sans-serif;
    font-size: 10px;
}
.fex {
  flex-direction: row;
}
.icon{
display:flex ;
justify-content: end;
}

.v-list-item--density-default.v-list-item--two-line .v-liist{

     min-height: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
    flex-direction: row;
    display: flex;

}
.v-list-item__content.v-liist{
flex-direction: row;
}

.araboc{
  background-color: rgb(244, 244, 245);
  padding-top:0.2rem ;
  padding-left: 0.2rem;
  padding-bottom: -0.5rem;
  padding-right:0.5rem ;
  justify-content: space-between ;
  flex-direction: row;
  align-items: center;
  font-size: 18px;

}

.tab{
  // padding-top:0.2rem ;
  // padding-left: 0.2rem;
  // padding-bottom: -0.5rem;
  // padding-right:0.5rem ;
  // flex-direction: row;
  // align-items: center;
  padding: 1px 13px;
    position: sticky;
    top: -25px;
    z-index: 3;
    background-color: white;
    display: flex;
  

}
.bttn{
  padding:0.3rem;
  display: flex;
  justify-content:space-between;
   margin-left: 120px;
   background-color: rgb(244, 244, 245);
}

.text{
  padding: 0;
    height: auto;
}

.custom-btn{
  display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
}

.btttn{
 
}
</style>
<!-- <style>
  .v-navigation-drawer >>> .v-navigation-drawer__content {
    background: #000;
  }
</style> -->
