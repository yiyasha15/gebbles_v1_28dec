<template>
<v-app>
  <v-container style="max-width:1072px;">
    <v-btn icon class="elevation-0 mb-8 white text-decoration-none" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
      <v-row no-gutters>
        <v-col cols="12" md='6'>
          <div align="center" justify="center">
          <img src = "~/assets/portfolio.png"  width="100%" alt="portfolio logo">
          </div>
        </v-col>
        <v-col cols="12" md='6'>
          <div v-if="!loggedInUser" class="ma-2">
              <h3 class="font-weight-bold">How to get started?</h3>
              <h4 class="font-weight-light mb-8">Yo! <b class="text-capitalize">
                </b>So glad that you're joining the <b>gebbles
                community</b>, we have a basic template laid out for you. Please follow these steps.
              </h4>
              <h4 class="font-weight-light">1. Fill the form according to the guidelines provided and while doing so, you can preview your website. </h4>
              <h4 class="font-weight-light">2. Similarly you can document your dance journey by sharing your experiences or adding any past/upcoming events.</h4>
              <h4 class="font-weight-light mt-8">We understand that gathering all these memories will take some time, but memories will eventually fade away 
                but the shared ones will be here to stay. So, years down the lane we hope that you have a smile on your face 
                looking back at your journey. 
                Okay, let's get started.
              </h4>
              <div class="mt-6" >
                <v-btn small outlined  dark color="black" class="text-decoration-none" :to= "`/create/website/`">Sign in and Get Started</v-btn>
              </div>
            </div>
          <div v-if="loggedInUser && !userHasPortfolio" class="ma-2">
              <h3 class="font-weight-bold">How to get started?</h3>
              <h4 class="font-weight-light mb-8">Yo! <b class="text-capitalize">
                @{{loggedInUser.user.username}}
                </b>, so glad that you're joining the <b>gebbles
                community</b>, we have a basic template laid out for you. Please follow these steps.
              </h4>
              <h4 class="font-weight-light">1. Fill the form according to the guidelines provided and while doing so, you can preview your website. </h4>
              <h4 class="font-weight-light">2. Similarly you can document your dance journey by sharing your experiences or adding any past/upcoming events.</h4>
              <h4 class="font-weight-light mt-8">We understand that gathering all these memories will take some time, but memories will eventually fade away 
                but the shared ones will be here to stay. So, years down the lane we hope that you have a smile on your face 
                looking back at your journey. 
                Okay, let's get started.
              </h4>
              <div class="mt-6" >
                <v-btn small outlined  dark color="black" class="text-decoration-none" :to= "`/create/website/`">Get Started</v-btn>
              </div>
            </div>
            <div v-if="loggedInUser && userHasPortfolio" class="ma-2 px-2">
              <h4 class=" mb-4 font-weight-light">Hi {{loggedInUser.user.username}}, <br>You can edit the form to update your portfolio.
              </h4>
              <div class="mt-6" >
                <v-btn small outlined dark color="black" class="text-decoration-none" :to= "`/create/website/`">Edit Portfolio</v-btn>
              </div>
              <!-- <div class="mt-6" >
                <v-btn small outlined dark color="black" class="text-decoration-none" :to= "`/create/uploadvideo/`">Edit Portfolio</v-btn>
              </div> -->
              <!-- <nuxt-link :to="'/create/website/'" class="text-decoration-none"><h3 class="icon">Edit Portfolio <v-icon dense class="icon">mdi-chevron-right</v-icon></h3></nuxt-link> -->
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
        ...mapGetters(['usersPortfolio', 'userHasPortfolio', 'loggedInUser'])
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
/* text-shadow:  0 0 2px indigo; ; */
}
</style>