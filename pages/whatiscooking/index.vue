<template>
    <v-app>
      <v-container class="mx-auto width pa-0">
        <v-btn icon class="elevation-0 mt-1 " @click="goback()" style="margin-left:-6px">
          <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn>
        <h2 class ="mb-4 font-weight-medium pl-2">What's cooking </h2>
       <div class="mx-auto width" v-if="firstLoad" >
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
      <div class="mx-auto width" v-show="!firstLoad" v-for="cook in cooking" :key ="cook.index">
        <cooking-feed :cook="cook" @postDelete="postDelete"></cooking-feed>
      </div>
      <center v-if="!cooking.length && !firstLoad">
        <img
        :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
        class="ml-2 mt-6 clickable"
        :src="require('@/assets/gebbleslogo_tab.png')"/>
        <h3>No videos found. </h3>
      </center>
      </v-container>
      <v-card v-intersect="infiniteScrolling"></v-card>
    </v-app>
</template>

<script>
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
              'Gebbles - What`s cooking'
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
      const response = await EventService.getLatestCookings()
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
    },
    goback(){
        window.history.back();
    },

  },
  components: {
    CookingFeed
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
  },
}
</script>
<style scoped>
.width{
    max-width: 670px;
  }
@media only screen and (max-width: 640px) {
  .width{
  max-width: 420px;
}
}
</style>
