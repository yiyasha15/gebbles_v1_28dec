<template>
    <v-app>
      <v-container class="pa-0">
        <v-row v-if="!isAuthenticated" style="max-width: 670px; margin: auto;" class="hidden-sm-and-down py-4" >
        <h3 class ="xs12 d-inline font-weight-light pr-1">What's cooking </h3>
      </v-row>
      <v-row v-if="!isAuthenticated" style="max-width: 457px; margin: auto;" class="hidden-md-and-up  py-4 pl-2" >
        <h3 class ="xs12 d-inline font-weight-light pr-1">What's cooking </h3>
      </v-row>
      <v-row v-if="isAuthenticated" style="max-width: 670px; margin: auto;" class="hidden-sm-and-down py-4" >
        <nuxt-link class="text-decoration-none outlined" to="/whatiscooking"><h3 class ="xs12 d-inline font-weight-light pr-1">What's cooking </h3></nuxt-link>/<nuxt-link to="/" class="text-decoration-none outlined"><h3 class ="xs12 d-inline font-weight-light pl-1">Community</h3></nuxt-link> 
      </v-row>
      <v-row v-if="isAuthenticated" style="max-width: 457px; margin: auto;" class="hidden-md-and-up py-3 pl-2">
        <nuxt-link class="text-decoration-none outlined" to="/whatiscooking"><h3 class ="xs12 d-inline font-weight-light pr-1">What's cooking </h3></nuxt-link>/<nuxt-link to="/" class="text-decoration-none outlined"><h3 class ="xs12 d-inline font-weight-light pl-1">Community</h3></nuxt-link> 
      </v-row>
       <div style="max-width: 457px; margin:auto;"  v-if="firstLoad" class="hidden-md-and-up" >
      <v-skeleton-loader width="100%"   :loading="loading" type="card" ></v-skeleton-loader>
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
      <div style="max-width: 670px; margin:auto;"  v-if="firstLoad" class="hidden-sm-and-down" >
      <v-skeleton-loader width="100%"  :loading="loading" type="card" ></v-skeleton-loader>
      <div align="left" justify="left">
          <div class="mb-2">
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
        <v-row class="px-4">
        <v-skeleton-loader width="100%" :loading="loading" type="article" ></v-skeleton-loader>
        </v-row>
      </div>
      <div style="max-width: 670px; margin:auto;" class="hidden-sm-and-down" v-show="!firstLoad" v-for="cook in cooking" :key ="cook.index">
        <cooking-feed :cook="cook" @postDelete="postDelete"></cooking-feed>
      </div>
      <div style="max-width: 457px; margin:auto;" class="hidden-md-and-up" v-show="!firstLoad" v-for="cook in cooking" :key ="cook.index">
        <cooking-feed :cook="cook" @postDelete="postDelete"></cooking-feed>
      </div>
      <!-- <v-layout wrap row justify-start v-show="!firstLoad" class="hidden-md-and-up" style="max-width:357px; margin:auto;" >
        <div v-for="cook in cooking" :key ="cook.index">
          <CookingCard :cook="cook" ></CookingCard> 
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-show="!firstLoad" class="hidden-sm-and-down" style="max-width: 670px; margin:auto;">
        <div v-for="cook in cooking" :key ="cook.index">
          <cooking-card-desktop :cook="cook" ></cooking-card-desktop>
        </div>
      </v-layout> -->
      <center v-if="!cooking.length && !firstLoad">
        <img
        :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
        class="ml-2 mt-6 clickable"
        :src="require('@/assets/gebbleslogo.png')"/>
        <h3>No videos found. </h3>
      </center>
      </v-container>
      <v-card v-intersect="infiniteScrolling"></v-card>
    </v-app>
</template>

<script>
import CookingCard from '@/components/CookingCard.vue'
import CookingCardDesktop from '@/components/CookingCardDesktop.vue'
import CookingFeed from '@/components/CookingFeed.vue'
import EventService from '@/services/EventService.js'
import { mapGetters} from 'vuex'
export default {
  scrollToTop: true,
  head() {  
    return {
      title: 'Cooking',
      meta: [ 
        {
          hid: 'description',
          name: 'description',
          content: 
              'Gebbles community'
        }
      ]
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
      this.$forceUpdate();
      // console.log("updated?");
      this.getwhatiscooking();
    }

  },
  components: {
    CookingCard,
    CookingCardDesktop,
    CookingFeed
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
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
}
</script>
