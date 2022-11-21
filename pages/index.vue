<template>
  <!-- <v-app> -->
    <div v-if="!isAuthenticated">
      <v-row class="home_width mx-auto text-center mt-sm-3">
        <v-col cols="12" md="6" align="center" justify="center">
            <v-img
              :lazy-src="require('@/assets/home.png')"
              :max-width="maxwidth"
              :src="require('@/assets/home.png')"
            ></v-img>
        </v-col>
        <v-col cols="12" md="6" class="mt-md-12">
            <center class="mt-6">
              <v-hover
                  v-slot="{ hover }">
                  <v-btn icon large
                  to="/create"
                  class=" transition-swing my-4" 
                  :elevation="hover ? 12 : 2" color="primary" max-width="100"
                  v-bind="attrs"
                  v-on="on">
                  <img
                  :height="$vuetify.breakpoint.smAndDown ? 18 : 28"
                  class="clickable"
                  :src="require('@/assets/gebbleslogo_tab.png')"/>
                  </v-btn>
              </v-hover>
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
      <!-- <information-box></information-box> -->
      <div>
      <h3 class ="my-2 font-weight-light px-4 px-md-0">What's cooking </h3>
      <div v-if="firstLoad">
      <v-skeleton-loader width="100%" :loading="loading" type="card" ></v-skeleton-loader>
      <div align="left" justify="left" class="mb-1">
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
      <v-row>
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
      <!-- <v-card v-intersect="infiniteScrolling"></v-card> -->
      </div>
    </v-container>
  <!-- </v-app> -->
</template>

<script>
import CookingFeed from '@/components/CookingFeed.vue'
import EventService from '@/services/EventService.js'
import {mapGetters} from 'vuex'
import CreationBox from '~/components/CreationBox.vue'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'
import InformationBox from '~/components/InformationBox.vue'
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
      this.cooking = response.data
      // this.page = response.data.next
      this.firstLoad = false
      } catch (e) {
        console.log(e);
        this.firstLoad = false
      } 
    },
    // infiniteScrolling() {
    //   if(this.page){
    //   const key = 'id';
    //   this.$axios.get(this.page).then(response => {
    //     this.page= response.data.next;
    //     response.data.results.forEach(item => this.cooking.push(item));
    //     // filter array so no duplicates
    //     this.cooking = [...new Map(this.cooking.map(item =>
    //       [item[key], item])).values()];
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    //   }
    // },
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
    InformationBox
},
  data() {
    return {
      looploader:[1,1,1,1,1,1,1,1,1,1,1],
      loading: true,
      firstLoad: true,
      page:"",
      cooking:[],
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