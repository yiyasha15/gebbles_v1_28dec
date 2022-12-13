<template>
    <v-app>
      <v-container class="pa-0">
        <v-row class="mx-auto width py-4 px-3 px-md-0" >
          <v-btn icon class="elevation-0 " @click="goback()" style="margin-left:-6px">
            <v-icon class="float-left">mdi-arrow-left</v-icon>
        </v-btn>
        <p class ="pt-1 pl-1">What's cooking </p>
      </v-row>
       <div class="mx-auto width" v-if="firstLoad" >

      <v-skeleton-loader width="100%" :loading="loading" type="card"></v-skeleton-loader>

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
      <div class="mx-auto width" v-show="!firstLoad">
        <cooking-feed :cook="cook" @postDelete="postDelete"></cooking-feed>
      </div>
      <center v-if="!cook && !firstLoad">
        <img
        :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
        class="ml-2 mt-6 clickable"
        :src="require('@/assets/gebbleslogo_tab.png')"/>
        <h3>No videos found. </h3>
      </center>
      </v-container>
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
  components: {
    CookingFeed
  },
  async asyncData({error, params}) {
      try {
        let cook = await EventService.getWhatsCookingId(params.uuid)
        return {
          cook : cook.data
        }
        } catch (err) {
          console.log(err);
          error({statusCode:503,  message: err.message})
        }
    },
  data() {
  return {
    looploader:[1,1,1,1,1,1,1,1,1,1,1],
    loading: true,
    firstLoad: false
  }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods:{
    postDelete(){
      this.$router.push('/whatiscooking/');
    },
     goback(){
            window.history.back();
        },
  },
}
</script>
<style scoped>

.width{
    max-width: 640px;
  }
@media only screen and (max-width: 640px) {
  .width{
  max-width: 420px;
}
}
</style>
