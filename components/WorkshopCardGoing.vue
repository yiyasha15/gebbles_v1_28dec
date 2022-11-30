<template>
    <v-hover v-slot:default="{ hover }">
      <v-card 
        data-view v-show="workshop"
        :elevation="hover ? 6 : 0"
        class="transition-swing ma-md-2 ma-1"
        outlined
        :width="card_width" 
        :max-height="card_height"
        @click="workshopDialog=true"
      >
        <v-img
          v-if = workshop.workshop.poster :src = "workshop.workshop.poster" 
          :lazy-src= "workshop.workshop.poster" 
          :height="img_height"
          :width="card_width">
          <v-btn icon small class="float-right ma-1 white" 
          @click.stop="goToWorkshop">
          <v-icon color="black" small>mdi-calendar-heart</v-icon>
          </v-btn>
          <v-btn v-if="isAuthenticated && workshop.username == loggedInUser.username" icon small class="float-right ma-1 white" 
          @click.stop="addToJourney">
          <v-icon color="black" small>mdi-plus</v-icon>
          </v-btn>
          </v-img>
        <v-img
          v-else :src="require('@/assets/gebbleslogo3.png')"
          contain
          :height="img_height"
          :width="card_width">
          <v-btn icon small class="float-right ma-1 white" 
          @click.stop="goToWorkshop">
          <v-icon color="black" small>mdi-calendar-heart</v-icon>
          </v-btn>
          <v-btn v-if="isAuthenticated && workshop.username == loggedInUser.username" icon small class="float-right ma-1 white" 
          @click.stop="addToJourney">
          <v-icon color="black" small>mdi-plus</v-icon>
          </v-btn>
        </v-img>
        <v-card-actions height="32px">
          <div v-if="workshop.workshop.title" class="text-decoration-none caption width">
          <p class="event_p" >{{ workshop.workshop.title }} </p>
          </div>
          <v-spacer></v-spacer>
          <country-flag size=small  :country= 'workshop.workshop.country' />
        </v-card-actions>
        <v-dialog
          :retain-focus="false"
          v-model="workshopDialog"
          width="480px" 
          persistent>
          <v-container class="rounded-lg white pa-4">
            <v-row align="end" justify="end" class="pa-0 ma-0" >
            <v-btn icon  color="error" class="float-right" @click="workshopDialog =false; ">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-row>
          </center>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-sm-6 px-2 mx-1" >
    <div class="text-center display-1 font-weight-normal my-5">
      Connecting the groove <br>
      celebrating<span style="background: -webkit-linear-gradient(315deg,#CDA88E 30%,#815A44); 
      -webkit-background-clip: text;-webkit-text-fill-color: transparent;"> Each one Teach one</span>
    </div>
    </v-row>
    <v-row justify="center" class="mt-3 mx-1" >
    <div class="text-center">
        <p class="grey--text">✔︎ a lifestyle canvas for the artists of the HipHop culture.</p>
        <p class="grey--text">✔︎ connect with your community, grow together</p>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <h2 class="text-center" style="cursor:pointer;" v-bind="attrs" v-on="on">🎵 💃 🎤 🎨 </h2>
          </template>
          <span>✌🏽 🖤 🤝</span>
        </v-tooltip>
    </div>
    </v-row>
  </div>
  <v-container v-else class="pa-0 width mx-auto" >
    <creation-box></creation-box>
    <LearnShare></LearnShare>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import CreationBox from '~/components/CreationBox.vue'
import LearnShare from '~/components/LearnShare.vue';
export default {
head() {  //head function (a property of vue-meta), returns an object
  return {
      title: 'Gebbles',
      meta: [{
        hid: 'description', //create page overrides the description, hid helps to stop redundancy
        name: 'description',
        content: 
            'gebbles - the thread connecting music, movement and artists.'
      }]
      }
},
created(){
  if(this.isAuthenticated){
    this.$store.dispatch("check_user_portfolio");
    this.$store.dispatch("check_user_bio");
    this.$store.dispatch("check_notifications");
  }
},
components: {
  CreationBox,
  LearnShare
},
data() {
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
  ...mapGetters(['isAuthenticated', 'loggedInUser']),
  maxwidth() {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs': return 300
      case 'sm': return 300
      case 'md': return 340
      case 'lg': return 340
      case 'xl': return 340
    }
  },
},
}
//https://stackoverflow.com/questions/57800048/how-to-enable-dark-mode-with-custom-colors-in-light-theme-in-vuetify
//You know that you have a groove that no other dancer has in this 
// world. We all have our grooves. It is our identity as dancers.
// When you dance someone connects deeply with you without your notice. 
// When you teach, a part of you lives in their dance. we are all unique
//yet connected.This is how Hip Hop connects, through sharing. Each One Teach One. 
// "In My Groove" is an effort to connect us 
//a little more, connect Hip Hop a little more, connect the students with their 
//teachers and the teachers with their students a little more so that the legacy stays forever.

</script>
<style scoped>
a:hover{
color: black;
}
.width{
max-width: 670px;
}
.home_width{
max-width: 980px;
}
@media only screen and (max-width: 600px) {
.width{
  max-width: 420px;
}
}
.ml-17{
margin-left: 160px;
}
</style>