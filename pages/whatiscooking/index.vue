<template>
    <v-app>
      <v-container class="mx-auto width pa-0">
      <v-btn icon class="elevation-0 mt-1 " @click="goback()" style="margin-left:-6px">
        <v-icon class="float-left">mdi-arrow-left</v-icon>
      </v-btn>
      <div class="mx-auto width" v-if="firstLoad" >
        <v-skeleton-loader width="100%" :loading="loading" type="card" class="mb-4" ></v-skeleton-loader>
        <div align="left" justify="left" class="mb-4" >
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
        <v-skeleton-loader width="100%" :loading="loading" type="article" class="mb-4" ></v-skeleton-loader>

        <v-skeleton-loader width="100%" :loading="loading" type="card" class="mb-4" ></v-skeleton-loader>
        <div align="left" justify="left" class="mb-4" >
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
        <v-skeleton-loader width="100%" :loading="loading" type="article" class="mb-4" ></v-skeleton-loader>
      </div>
      <!-- <div class="mx-auto width" v-show="!firstLoad" v-for="cook in cooking" :key ="cook.index">
        <LatestCookingFeed :cook="cook" @postDelete="postDelete"></LatestCookingFeed>
      </div>
      <center v-if="!cooking.length && !firstLoad">
        <img
        :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
        class="ml-2 mt-6 clickable"
        :src="require('@/assets/gebbleslogo_tab.png')"/>
        <p class="grey--text mt-4">No videos found. </p>
      </center> -->
      </v-container>
      <!-- <v-card v-intersect="infiniteScrolling"></v-card> -->
    </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import { mapGetters} from 'vuex'
import LatestCookingFeed from '~/components/LatestCookingFeed.vue'
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
    // this.getwhatiscooking();
  },
  methods:{
    async getwhatiscooking(){
      try {
      const response = await EventService.getLatestCookings()
      console.log(response.data);
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
    LatestCookingFeed
},
  data() {
    return {
      looploader:[1,1,1,1,1,1,1,1,1,1,1],
      loading: true,
      firstLoad: false,
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
    max-width: 1070px;
  }
@media only screen and (max-width: 1900px) {
  .width{
  max-width: 670px;
}
}
@media only screen and (max-width: 640px) {
  .width{
  max-width: 420px;
}
}
</style>

