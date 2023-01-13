<template>
  <div v-if="!isAuthenticated">
    <v-row class="home_width mx-auto text-center mt-sm-3">
      <v-col cols="12" align="center" justify="center">
          <v-img
            :lazy-src="require('@/assets/home.png')"
            :max-width="maxwidth"
            :src="require('@/assets/home.png')"
          ></v-img>
      </v-col>
      <!-- <v-col cols="12" md="6" class="mt-md-16">
          <center class="mt-6">
            
            <v-row style="max-width:390px; margin:0 auto">
            <v-col cols="6">
              <v-hover v-slot="{ hover }">
              <v-btn min-width="150" :elevation="hover ? 12 : 2" color="secondary" class=" text-decoration-none" to="/artists/">
              <h4 class="font-weight-medium text-capitalize primary--text" >artists</h4></v-btn>
              </v-hover>
            </v-col>
            <v-col cols="6">
              <v-hover v-slot="{ hover }">
              <v-btn min-width="150" :elevation="hover ? 12 : 2" color="secondary" class="text-decoration-none" to="/whatiscooking/">
              <h4 class="font-weight-medium text-capitalize primary--text" >what's cookin</h4></v-btn></v-hover>
            </v-col>
            </v-row>
            <v-row  style="max-width:390px; margin:auto">
              <v-col cols="6">
                <v-hover v-slot="{ hover }">
                <v-btn min-width="150" :elevation="hover ? 12 : 2" color="secondary" class=" text-decoration-none" to="/events/">
                <h4 class="font-weight-medium text-capitalize primary--text" >events</h4></v-btn></v-hover>
              </v-col>
              <v-col cols="6">
                <v-hover v-slot="{ hover }">
                <v-btn min-width="150" :elevation="hover ? 12 : 2" color="secondary" class=" text-decoration-none" to="/workshops/">
                <h4 class="font-weight-medium text-capitalize primary--text" >workshops</h4></v-btn></v-hover>
              </v-col>
            </v-row>
          </center>
      </v-col> -->
    </v-row>
    <v-row justify="center" class="mt-sm-6 px-2 mx-1" >
    <div class="text-center display-1 font-weight-normal my-5">
      Connecting the groove <br>
      celebrating <br class="hidden-sm-and-up">
      <span style="background: -webkit-linear-gradient(315deg,#CDA88E 30%,#815A44); 
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
          <span>🖤 ✌🏽 🤝</span>
        </v-tooltip>
        <v-hover
            v-slot="{ hover }">
            <v-btn 
            to="/create" min-width="150"
            class=" transition-swing my-4" 
            :elevation="hover ? 12 : 2" color="primary" max-width="100">
            <h4 class="font-weight-medium text-capitalize secondary--text">get started</h4>
            </v-btn>
        </v-hover>
    </div>
    </v-row>
  </div>
  <div v-else>
    <!-- <center>
    <iframe width="200"
     height="200" scrolling="no" frameborder="no" 
    allow="autoplay" 
    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/130990973&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
    <div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;">
      <a href="https://soundcloud.com/zaki-leaks" 
      title="Zaki Ibrahim" 
      target="_blank" 
      style="color: #cccccc; text-decoration: none;">Zaki Ibrahim</a> ·
       <a href="https://soundcloud.com/zaki-leaks/daylight" 
       title="Daylight" target="_blank" 
       style="color: #cccccc; text-decoration: none;">
      Daylight</a></div>
    </center> -->
    <creation-box></creation-box>
    <LearnShare :artist="loggedInUser" class="width mx-auto" ></LearnShare>
  </div>

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
}
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
.ml-17{
margin-left: 160px;
}
</style>