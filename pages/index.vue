<template>
  <v-app>
    <v-row v-if="!isAuthenticated" class="homepage-width mx-auto">
      <v-col cols="12" md="5">
        <div class="mt-md-13 mt-8">
        <div align="center" justify="center" class="mt-md-10 mt-2">
          <v-img
            :lazy-src="require('@/assets/home.png')"
            :max-width="maxwidth"
            :src="require('@/assets/home.png')"
          ></v-img>
        </div>
        <v-row justify="center" class="my-3" grey>
          <p class="text-center font-weight-bold" style="font-size:1.2em">
            Connecting the groove, <br>
            celebrating<span style="background: -webkit-linear-gradient(315deg,#CDA88E 30%,#815A44); 
            -webkit-background-clip: text;-webkit-text-fill-color: transparent;"> Each one Teach one</span>
            <!-- legacy of the hiphop culture -->
          </p>
          <!-- <h1 class="text-center font-weight-medium mb-2 mx-4" style="font-size:0.9em">
          at gebbles, people share the stories about <br>how you touched their lives through your art.  
          </h1> -->
          <!-- <br> -->
        </v-row>
        <!-- <v-row justify="center" class="mb-2">
          <h4 class="caption">movement + music + culture</h4>
        </v-row> -->
        <center class="mt-6">
          <v-row  style="max-width:370px; margin:auto">
            <v-col cols="6">
            <v-btn min-width="150" color="primary" class=" text-decoration-none" to="/artists/">
            <h4 class="font-weight-medium text-capitalize" >artists</h4></v-btn></v-col>
            <v-col cols="6">
            <v-btn min-width="150" color="primary" class=" text-decoration-none" to="/whatiscooking/">
            <h4 class="font-weight-medium text-capitalize" >what's cookin</h4></v-btn></v-col>
            <!-- <v-col><nuxt-link to="/create/" class="text-decoration-none ">get started</nuxt-link></v-col>
            <v-col><nuxt-link to="/artists/" class="text-decoration-none outlined">artists</nuxt-link></v-col> -->
          </v-row>
          <v-row  style="max-width:370px; margin:auto">
            <v-col cols="6"><v-btn min-width="150" color="primary" class=" text-decoration-none" to="/events/">
            <h4 class="font-weight-medium text-capitalize" >events</h4></v-btn></v-col>
            <v-col cols="6">
              <v-btn min-width="150" color="primary" class=" text-decoration-none" to="/workshops/">
            <h4 class="font-weight-medium text-capitalize" >workshops</h4></v-btn>
            </v-col>
            <!-- <v-col><nuxt-link to="/whatiscooking/" class="text-decoration-none ">what's cooking</nuxt-link></v-col>
            <v-col><nuxt-link to="/events/" class="text-decoration-none ">events</nuxt-link></v-col> -->
          </v-row>
        </center>
      </div>
      </v-col>
      <v-col cols="12" md="7" class="mt-md-16">
        <div class="mt-md-16 mx-md-10 my-5">
        <p class="font-weight-medium"> why gebbles?</p>
        <p>✔︎ a lifestyle canvas for the artists of the HipHop culture.</p>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <h2 class="text-center" style="cursor:pointer;" v-bind="attrs" v-on="on">🎵 💃 🎤 🎨 </h2>
          </template>
          <span>✌🏽 🖤 🤝</span>
        </v-tooltip>
        <!-- <h2 class="text-center">🎵 💃 🎤 🎨 </h2> -->
        <p class="font-weight-medium mt-3">represent like you get down</p>
        <p>✔︎ create and curate your events and work, document and share your passionate journey, 
          build a porfolio website that represents you.</p>
        <p class="font-weight-medium mt-3"> connect with your community, grow together</p>
        <p>can we imagine hiphop without 'sharing'?<br>
          ✔︎ let's shoutout to those friends and teachers who share their knowledge and inspire us. Likewise,
          gebbles notifies and helps you connect with your students and fans when they appreciate you and your work.
        </p>
        <v-btn min-width="150" color="primary" class=" text-decoration-none" to="/create/">
            <h4 class="font-weight-medium text-capitalize" >Get Started</h4></v-btn>
        </div>
        <!-- <register-login></register-login> -->
      </v-col>
    </v-row>
    <v-container v-else class="pa-0 mt-4 mt-md-8 width mx-auto" >
      <creation-box></creation-box>
      <div>
        <h3 class ="my-2 font-weight-light px-4 px-md-0">What's cooking </h3>
       <div v-if="firstLoad" >
      <v-skeleton-loader width="100%" :loading="loading" type="card" ></v-skeleton-loader>
      <div align="left" justify="left">
      <div class="mb-1">
        <v-btn icon class="mr-1">
            <v-icon color="black" >mdi-heart</v-icon>
        </v-btn>
        <v-btn icon class="mx-1">
            <v-icon color="black" >mdi-fire</v-icon>
        </v-btn>
        <v-btn icon  class="mx-1">
            <v-icon color="black" >mdi-head-flash-outline</v-icon>
        </v-btn>
      </div>
      </div>
      <v-row >
      <v-skeleton-loader width="100%" :loading="loading" type="article" ></v-skeleton-loader>
      </v-row>
      </div>
      <div v-show="!firstLoad" v-for="cook in cooking" :key ="cook.index">
        <cooking-feed :cook="cook" @postDelete="postDelete"></cooking-feed>
      </div>
      <center v-if="!cooking.length && !firstLoad">
        <img
        :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
        class="ml-2 mt-6 clickable"
        :src="require('@/assets/gebbleslogo_tab.png')"/>
        <h3>No videos found. </h3>
      </center>
      <v-card v-intersect="infiniteScrolling"></v-card>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import CookingFeed from '@/components/CookingFeed.vue'
import EventService from '@/services/EventService.js'
import {mapGetters} from 'vuex'
import CreationBox from '~/components/CreationBox.vue'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'
// import RegisterLogin from '~/components/RegisterLogin.vue'
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
    this.getwhatiscooking();
    // console.log("?", process.env.AUTH_TOKEN);
    if(this.isAuthenticated){
      // console.log("?");
      this.$store.dispatch("check_user_portfolio");
      this.$store.dispatch("check_user_bio");
      this.$store.dispatch("check_notifications");
    }
  },
  methods:{
    async getwhatiscooking(){
      try {
      const response = await EventService.getWhatsCooking()
      this.cooking = response.data.results
      this.page = response.data.next
      this.firstLoad = false
      } catch (e) {
        console.log(e);
        this.firstLoad = false
    }
    },
    infiniteScrolling() {
      if(this.page){
      const key = 'id';
      this.$axios.get(this.page).then(response => {
        this.page= response.data.next;
        response.data.results.forEach(item => this.cooking.push(item));
        // filter array so no duplicates
        this.cooking = [...new Map(this.cooking.map(item =>
          [item[key], item])).values()];
      })
      .catch(err => {
        console.log(err);
      });
      }
    },
    postDelete(){
      this.cooking=[];
      this.page =''
      this.firstLoad = true
      this.getwhatiscooking();
    }
  },
  components: {
    CookingFeed,
    CreationBox,
    CardSkeletonLoader,
    // RegisterLogin
  },
  data() {
    return {
      looploader:[1,1,1,1,1,1,1,1,1,1,1],
      loading: true,
      firstLoad: true,
      page:"",
      cooking:[],
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
/* .home{
  width: 860px;
  margin: auto;
} */
a:hover{
  color: black;
}
.width{
    max-width: 670px;
  }
.homepage-width{
  max-width: 1000px;
}
@media only screen and (max-width: 600px) {
  .width{
    max-width: 420px;
  }
  /* .homepage-width{
    max-width: 400px;
  } */
}
@media only screen and (max-width: 960px) {
  /* .width{
    max-width: 420px;
  } */
  .homepage-width{
    max-width: 400px;
  }
}
</style>