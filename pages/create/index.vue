<template>
<v-app>
  <v-container style="max-width:672px;">
    <!-- <v-btn icon class="elevation-0 mb-8 white text-decoration-none" @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn> -->
    <v-row no-gutters class="mt-6">
      <v-carousel hide-delimiters show-arrows height="550" >
        <v-carousel-item 
          v-for="(item,i) in items"
          :key="i">
          <center>
          <div v-if="i==0"  > 
            <h3 style="color:black;" class="font-weight-medium pb-4">create your portfolio</h3>
            <img src = "~/assets/create_portfolio.png"  width="60%" alt="portfolio logo">
            <h4 style="color:black; " class="font-weight-light width"> a simple and beautiful canvas to showcase your art and lifestyle. render your landing page by just filling up a form.</h4>
            <div class="mt-2"> 
            <v-icon dark large color="#815A44">mdi-circle-small</v-icon>
            <v-icon dark large color="#ece0c7">mdi-circle-small</v-icon>
            <v-icon dark large color="#ece0c7">mdi-circle-small</v-icon>
            </div>
          </div>
          <div v-if="i==1">
            <h3 style="color:black;" class="font-weight-medium pb-4">a gallery for your dance journey</h3>
            <img src = "~/assets/create_journey.png"  width="60%" alt="journey logo"> 
            <h4 style="color:black;" class="font-weight-light mt-4 width" >your home to keep those photos from all the beautiful events you travelled to. dust out all the battle, judging, workshop and more fliers, so that your can go back in time when nostalgia hits.</h4>
            <!-- <p style="color:black; max-width:260px" class="font-weight-light hidden-md-and-up"> your home to keep those photos from all the events you attended, battles you own, judging and workshop fliers, so that your can go back in time when nostalgia hits.</p> -->
          <div class="mt-2" > 
            <v-icon dark large color="#ece0c7">mdi-circle-small</v-icon>
            <v-icon dark large color="#815A44">mdi-circle-small</v-icon>
            <v-icon dark large color="#ece0c7">mdi-circle-small</v-icon>
            </div>
          </div>
          <div v-if="i==2" >
            <h3 style="color:black;" class="font-weight-medium pb-4">each one teach one</h3>
            <img src = "~/assets/create_e1t1.png"  width="60%" alt="e1t1 logo">
            <h4 style="color:black;" class="font-weight-light width">let them know how you are taking their teachings and ideas to the next level with your own flavour. let them know that you appreciate their sharings.</h4>
          <div class="mt-2" > 
            <v-icon dark large color="#ece0c7">mdi-circle-small</v-icon>
            <v-icon dark large color="#ece0c7">mdi-circle-small</v-icon>
            <v-icon dark large color="#815A44">mdi-circle-small</v-icon>
            </div>
         </div>
          </center>
        </v-carousel-item>
      </v-carousel>
    </v-row>
    <center>
      <v-menu top offset-y>
      <template v-slot:activator="{ on, attrs }">
         <v-btn outlined icon v-bind="attrs" v-if="isAuthenticated"
          v-on="on" class="mt-2">
      <v-icon color="black">mdi-plus</v-icon>
      </v-btn>
      </template>
      <v-list>
        <v-list-item
        :to="'/create/website'" v-if="!userHasPortfolio"
        class="text-decoration-none pl-6 pr-12"
        ><v-icon color="black" class="pr-2">mdi-account-edit-outline</v-icon>
        <v-list-item-title>Create a portfolio</v-list-item-title>
        </v-list-item>
        <v-list-item
        v-if="userHasPortfolio"
        :to="'/create/website'"
        class="text-decoration-none pl-6 pr-12"
        ><v-icon color="black" class="pr-2">mdi-account-edit-outline</v-icon>
        <v-list-item-title>Edit your portfolio</v-list-item-title>
        </v-list-item>
        <v-list-item
        v-if="userHasPortfolio"
        :to="'/create/journey'"
        class="text-decoration-none pl-6 pr-12"
        ><v-icon color="black" class="pr-2">mdi-chart-line-variant</v-icon>
        
        <v-list-item-title>Share journey</v-list-item-title>
        </v-list-item>
        <v-list-item
        v-if="userHasPortfolio"
        :to="'/create/each1teach1'"
        class="text-decoration-none pl-6 pr-12"
        >
        <v-icon color="black" class="pr-2">mdi-infinity</v-icon>
        <v-list-item-title>Create E1T1</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
          src: require("@/assets/create_portfolio.png"),
        },
        {
          src: require("@/assets/create_journey.png"),
        },
        {
          src: require("@/assets/create_e1t1.png"),
        }
      ],
      }
    },
    computed: {
        ...mapGetters(['usersPortfolio', 'userHasPortfolio', 'loggedInUser','isAuthenticated'])
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
.width{
     max-width:550px
  }
@media only screen and (max-width: 600px) {
  .width{
  max-width:260px
}
}
</style>

