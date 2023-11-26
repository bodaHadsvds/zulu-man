<template>
<v-main> 
<v-navigation-drawer
    class="main-navigation"
     v-model="drawer"
     location="end" 
     sticky
     floating
     width="500" 
     temporary
     >
     
   <v-list :items="itemgroup"> 
        
   </v-list>
      </v-navigation-drawer>
    </v-main>

  <v-spacer></v-spacer> 
 
 
  <v-btn :ripple="false" icon @click="toggleTheme">
    <v-icon>{{ themeIcon }}</v-icon>
  </v-btn>
  <v-btn :ripple="false" icon>
   
    <v-icon    variant="text"
    @click.stop="drawer = !drawer"> fa-solid fa-magnifying-glass</v-icon>
  </v-btn>
 
  <!-- <v-main style="height: 500px">
     <v-card color="red">
      </v-card>
      </v-main> -->
  <v-divider vertical inset class="mx-4"></v-divider>

  <v-menu location="bottom start">

    <template v-slot:activator="{ props }">
      <v-btn :ripple="false" plain v-bind="props" icon>
        <v-avatar color="surface-variant" size="30">
          <v-img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          ></v-img>
        </v-avatar>
        <v-icon
          icon="fa-solid fa-angle-down"
          class="ms-1"
          size="x-small"
        ></v-icon>
      </v-btn>
    
    </template>
    <v-list>
      <v-list-item
        class="d-flex align-center"
        :to="{
          name: 'StaffProfile',
          params: { id: $store.getters['auth/authInfo'].auth.id },
        }"
      >
        <v-list-item-title>
          {{
            $vuetify.locale.t(
              "$vuetify.nav_drawer.quick_access_menu.my_profile"
            )
          }}
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="d-flex align-center" :to="{ name: 'ChangePassword' }">
        <v-list-item-title>
          {{
            $vuetify.locale.t(
              "$vuetify.nav_drawer.quick_access_menu.change_password"
            )
          }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item class="d-flex align-center" @click="handleLogout">
        <v-list-item-title>
          {{
            $vuetify.locale.t("$vuetify.nav_drawer.quick_access_menu.log_out")
          }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

  <v-divider vertical inset class="mx-4"></v-divider>

  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn :ripple="false" v-bind="props" icon>
        {{ appLang }}
        <v-icon
          icon="fa-solid fa-angle-down"
          class="ms-1"
          size="x-small"
        ></v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click="changeLang(item.key)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

</template>

<script>
  export default {
    data: () => ({
      themeIcon: null,
      lang: null,
      items: [
        { title: "English", key: "en" },
        { title: "Arabic", key: "ar" },
      ],
      drawer:false,
      group:null,
      itemgroup:[
        {title: 'members',value : 'Members'},
        {title:'leads' , value : 'leads'},
        {title:'staff members', value:'Staff Member'}
      ]
    }),
    computed: {
      themeColor() {
        const themeStore = this.$store.getters.theme;
        return themeStore;
      },
      appLang() {
        return this.$store.getters.lang;
      },
    },
    methods: {
      toggleTheme() {
        this.$store.commit(
          "updateTheme",
          this.$vuetify.theme.global.current.dark ? "lightTheme" : "darkTheme"
        );
        this.$vuetify.theme.global.name = this.themeColor;
      },

      changeLang(key) {
        this.$store.commit("updateLang", key);
        this.$vuetify.locale.current = key;
      },
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
    },
    watch: {
      themeColor(newVal) {
        if (newVal === "lightTheme") {
          this.themeIcon = "fa-solid fa-sun";
        } else {
          this.themeIcon = "fa-solid fa-moon";
        }
      },
      group(){
        this.drawer= false
      }
    },
    mounted() {
      const currentTheme = this.$store.getters.theme;
      if (currentTheme === "lightTheme") {
        this.themeIcon = "fa-solid fa-sun";
      } else {
        this.themeIcon = "fa-solid fa-moon";
      }

      this.lang = this.$store.getters.lang;
    },
  };
</script>

<style lang="scss" scoped>
  :deep() {
    .v-btn__overlay,
    .v-btn__underlay {
      display: none !important;
    }
  }
</style>
