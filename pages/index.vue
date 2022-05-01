<template>
  <div class="home">
      <div align="center" justify="center" class="mt-2">
      <img src = "~/assets/home.png"  width="100%" alt="portfolio logo">
      </div>
      <v-row justify="center" class="my-3" grey >
        <!-- <h1 class="text-center font-weight-black hidden-sm-and-down " style="font-size:2em">
          Connecting the groove, <br>
          celebrating<span style="background: -webkit-linear-gradient(315deg,#CDA88E 30%,#815A44); -webkit-background-clip: text;-webkit-text-fill-color: transparent;"> Each one Teach one.</span>
        </h1>
        <h2 class="text-center hidden-md-and-up mt-2 mx-4 font-weight-black"  style="font-size:1.5em">
          "Connecting the groove, <br>
          celebrating<br>
          <span style="background: -webkit-linear-gradient(315deg,#CDA88E 30%,#815A44); -webkit-background-clip: text;-webkit-text-fill-color: transparent;" > Each one Teach one.</span>"
        </h2> -->
        <h1 class="text-center font-weight-medium mb-2 mx-4" style="font-size:0.9em">
        at gebbles, people share the stories about <br>how you touched their lives through your art.  
        </h1>
        <br>
      </v-row>
      <v-row justify="center" class="mb-2">
        <h4 class="caption">movement + music + culture</h4>
      </v-row>
        <center class="mt-6">
        <v-row  style="max-width:370px; margin:auto">
          <v-col><nuxt-link to="/artists/" class="text-decoration-none outlined"><h5 class="font-weight-light">community</h5></nuxt-link></v-col>
          <v-col><nuxt-link to="/whatiscooking/" class="text-decoration-none "><h5 class="font-weight-light">what's cooking</h5></nuxt-link></v-col>
          <!-- <v-col><nuxt-link to="/feed/" class="text-decoration-none "><h5 class="font-weight-light">explore</h5></nuxt-link></v-col> -->
          <v-col v-if="!userHasPortfolio"><nuxt-link to="/create/" class="text-decoration-none "><h5 class="font-weight-light">get started</h5></nuxt-link></v-col>
        </v-row>
        <!-- <v-btn small v-if="isAuthenticated" color="#815A44" dark
           class="text-decoration-none elevation-none px-4 mb-8 " 
          :to= "`/whatiscooking/`"><h4 class="font-weight-light">What's cooking</h4>
        </v-btn>
        <v-btn small v-if="isAuthenticated" color="#815A44" dark
           class="text-decoration-none elevation-none px-4 mb-8 " 
          :to= "`/create/`"><h4 class="font-weight-light">Get Started</h4>
        </v-btn> -->
      </center>
      <!-- <v-container >
        <v-row>
        <v-col>
          <v-hover v-slot:default="{ hover }">
          <v-card
          outlined
          :to="'/create'" 
          :elevation="hover ? 8 : 4"
          class="mx-auto"
          max-width="240"
          max-height="200"
          >
            <v-img
              :src="require('@/assets/portfolio.png')"
              height="200px"
              contain
            ></v-img>
          </v-card>
          </v-hover>
          <center>
            <h4 class="font-weight-light mt-4">Portfolio</h4>
          </center>
        </v-col>
        <v-col>
          <v-hover v-slot:default="{ hover }">
          <v-card
          outlined
          :to="'/create/journeyindex'" 
          :elevation="hover ? 6 : 2"
          class="mx-auto"
          max-width="240"
          max-height="200"
          >
            <v-img
              :src="require('@/assets/journey.png')"
              height="200px" contain
            ></v-img>
          </v-card>
          </v-hover>
          <center>
            <h4 class="font-weight-light mt-4">Journey</h4>
          </center>
        </v-col>
        <v-col>
          <v-hover v-slot:default="{ hover }">
          <v-card
          :to="'/create/e1t1index'" 
          :elevation="hover ? 6 : 2"
          class="mx-auto"
          max-width="240"
          height="200"
          outlined
          >
            <v-img 
              :src="require('@/assets/e1t1.png')"
              height="200px"
              position="top"
            ></v-img>
          </v-card>
          </v-hover>
          <center>
          <h4 class="font-weight-light mt-4">Each One Teach One</h4>
          </center>
        </v-col>
      </v-row>
        <div class="my-12">
        <v-layout wrap row justify-start v-if="firstLoad" style="max-width:357px; margin:auto;" >
        <div v-for="n in this.looploader" :key ="n.index">
          <v-skeleton-loader style="margin:2px;" width="115" max-height="105" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-show="!firstLoad"  style="max-width:357px; margin:auto;" >
        <div v-for="cook in cooking" :key ="cook.index">
          <CookingCard :cook="cook" ></CookingCard> 
        </div>
      </v-layout>
      <v-card v-intersect="infiniteScrolling"></v-card>
      <center v-if="!cooking.length && !firstLoad">
        <img
        :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
        class="ml-2 mt-6 clickable"
        :src="require('@/assets/gebbleslogo.png')"/>
        <h3>No videos found. </h3>
      </center>
        </div>
      <v-divider></v-divider>
      </v-container> -->
  </div>
</template>

<script>
import CookingCard from '@/components/CookingCard.vue'
import EventService from '@/services/EventService.js'
import {mapGetters} from 'vuex'
export default {
  head() {  //head function (a property of vue-meta), returns an object
    return {
        title: 'Gebbles',
        meta: [{
          hid: 'description', //create page overrides the description, hid helps to stop redundancy
          name: 'description',
          content: 
              'gebbles - The thread connecting music, movement and artists.'
        }]
        }
  },
  created(){
    this.getwhatiscooking();
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
        // console.log(this.page);
      const key = 'id';
      this.$axios.get(this.page).then(response => {
        // console.log(response);
        this.page= response.data.next;
        response.data.results.forEach(item => this.cooking.push(item));
        // filter array so no duplicates
        // console.log(this.cooking);
        this.cooking = [...new Map(this.cooking.map(item =>
          [item[key], item])).values()];
          // console.log(this.cooking);
      })
      .catch(err => {
        console.log(err);
      });
      }
    },
  },
  components: {
    CookingCard
  },
  data() {
    return {
      looploader:[1,1,1,1,1,1,1,1,1,1,1],
      loading: true,
      firstLoad: true,
      page:"",
      cooking:[],
      search: "",
      debounce: null
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'userHasPortfolio'])
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
.home{
  max-width: 860px;
  margin: auto;
}
h5:hover{
  color: black;
  text-decoration: underline;
}
</style>