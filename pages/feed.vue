<template>
    <v-app>
      <v-container class="pa-0">
      <v-row style="max-width: 672px; margin: auto;">
        <v-col cols="12" md="8"  class="justify-center">
          <h3 class ="xs12 d-inline font-weight-light">Explore</h3>
          <v-btn v-if="isAuthenticated" small icon outlined color="black" class=" mx-2 mb-3 mt-1" to="/create/uploadvideo/">
          <v-icon small>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-layout wrap row justify-start v-if="firstLoad"  class="hidden-md-and-up" style="max-width:357px; margin:auto;" >
        <div v-for="n in this.looploader" :key ="n.index">
          <v-skeleton-loader style="margin:2px;" width="357" max-height="105" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-if="firstLoad" class="hidden-sm-and-down" style="max-width: 670px; margin:auto;">
        <div v-for="n in this.looploader" :key ="n.index">
          <v-skeleton-loader style="margin:2px;"  width="670" max-height="195" :loading="loading" type="card" transition="fade-transition"></v-skeleton-loader>
        </div>
      </v-layout>
      <v-layout wrap row justify-start v-show="!firstLoad" style="max-width:670px; margin:auto;" >
        <div v-for="cook in cooking" :key ="cook.index">
          <feed-card :cook="cook" ></feed-card> 
        </div>
      </v-layout>
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
import FeedCard from '@/components/FeedCard.vue'
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
      console.log(this.cooking);
      this.firstLoad = false
      } catch (e) {
        console.log(e);
        this.firstLoad = false
    }
    },
    infiniteScrolling() {
      if(this.page){
        console.log(this.page);
      const key = 'id';
      this.$axios.get(this.page).then(response => {
        console.log(response);
        this.page= response.data.next;
        response.data.results.forEach(item => this.cooking.push(item));
        // filter array so no duplicates
        console.log(this.cooking);
        this.cooking = [...new Map(this.cooking.map(item =>
          [item[key], item])).values()];
          console.log(this.cooking);
      })
      .catch(err => {
        console.log(err);
      });
      }
    },
  },
  components: {
    FeedCard
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
