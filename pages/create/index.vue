<template>
<v-app>
  <v-container style="max-width:672px;">
    <v-btn icon class="elevation-0 mb-8 white text-decoration-none" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
    <v-row no-gutters>
      <v-carousel hide-delimiters>
        <v-carousel-item 
          v-for="(item,i) in items"
          :key="i"
          
          >
          <center >
          <div v-if="i==0"  > 
            <h3 style="color:black;" class="font-weight-medium pb-4">create your portfolio</h3>
            <img src = "~/assets/portfolio.png"  width="70%" alt="portfolio logo">
            <h4 style="color:black; max-width:550px" class="font-weight-light hidden-sm-and-down"> a simple and beautiful canvas to showcase your art and lifestyle. render your landing page by just filling up a form.</h4>
            <p style="color:black; max-width:260px" class="font-weight-light hidden-md-and-up"> a simple and beautiful canvas to showcase your art and lifestyle. render your landing page by just filling up a form.</p>
          </div>
          <div v-if="i==1">
            <h3 style="color:black;" class="font-weight-medium pb-4">a gallery for your dance journey</h3>
            <img src = "~/assets/journey.png"  width="70%" alt="journey logo"> 
            <h4 style="color:black; max-width:500px" class="font-weight-light mt-4 hidden-sm-and-down" >your home to keep those photos from all the events you attended, battles you own, judging and workshop fliers, so that your can go back in time when nostalgia hits.</h4>
            <p style="color:black; max-width:260px" class="font-weight-light hidden-md-and-up"> your home to keep those photos from all the events you attended, battles you own, judging and workshop fliers, so that your can go back in time when nostalgia hits.</p>
          </div>
          <div v-if="i==2" >
            <h3 style="color:black;" class="font-weight-medium pb-4">each one teach one</h3>
            <img src = "~/assets/e1t1.png"  width="70%" alt="e1t1 logo">
            <h4 style="color:black; max-width:500px" class="font-weight-light hidden-sm-and-down">let them know how you are taking their teachings and ideas to the next level with your own flavour. Let them know that you appreciate their sharings.</h4>
            <p style="color:black; max-width:260px" class="font-weight-light hidden-md-and-up"> let them know how you are taking their teachings and ideas to the next level with your own flavour. Let them know that you appreciate their sharings.</p>
         </div>
          </center>
        </v-carousel-item>
      </v-carousel>
    </v-row>
    <center>
      <v-btn icon outlined>
      <v-icon color="black">mdi-plus</v-icon>
      </v-btn>
    </center>
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
        num:0,
        items: [
        {
          src: require("@/assets/portfolio.png"),
        },
        {
          src: require("@/assets/journey.png"),
        },
        {
          src: require("@/assets/e1t1.png"),
        }
      ],
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
.v-image__image--cover {
    background-size: contain !important;
}
</style>