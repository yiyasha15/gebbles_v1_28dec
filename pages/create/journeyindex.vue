<template>
<v-app>
  <v-container style="max-width:1072px;">
    <v-btn icon class="elevation-0 mb-8 white text-decoration-none" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
      <v-row no-gutters>
        <v-col cols="12" md='6'>
          <div align="center" justify="center">
          <img src = "~/assets/journey.png"  width="100%" alt="portfolio logo">
          </div>
        </v-col>
        <v-col cols="12" md='6'>
          <div class="ma-2 px-2" v-if="!loggedInUser">
              <h4 class="font-weight-light mt-4 mb-4 " > <br>Share about your dance journey, or add about your upcoming classes or events. </h4>
              <div class="mt-6" >
                <v-btn small outlined  dark color="black" class="text-decoration-none" :to= "`/create/journey/`">Sign in and Share Journey</v-btn>
              </div>
          </div>
            <div class="ma-2 px-2" v-else>
              <h4 class="font-weight-light mt-4 mb-4 " > Hi {{loggedInUser.user.username}}, <br>Share about your dance journey, or add about your upcoming classes or events. </h4>
              <div class="mt-6" >
                <v-btn small outlined dark color="black" class="text-decoration-none" :to= "`/create/journey/`">Share Journey</v-btn>
              </div>
              <!-- <nuxt-link :to="'/create/journey/'" class="text-decoration-none "><h4 class="icon">Share Journey <v-icon dense class="icon">mdi-chevron-right</v-icon> </h4></nuxt-link> -->
              </div>
         </v-col>
      </v-row>
  </v-container>
</v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    // middleware : 'check_auth',
    data () {
      return {
        dialog: false,
      }
    },
    computed: {
        ...mapGetters(['loggedInUser'])
    },
    methods:{
      goback(){
            window.history.back();
        },
    }
}
</script>
<style scoped>
.icon {
color: #000;
}

.icon:hover {
color: #815A44;
/* text-shadow:  0 0 2px black; ; */
}
</style>