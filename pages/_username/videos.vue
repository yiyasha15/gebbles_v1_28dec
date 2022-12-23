<template>
    <v-app>
        <left-navigation></left-navigation>
        <v-container style="max-width:670px;" class="pa-0 background">
            <v-btn icon class="elevation-0 mt-1 " @click="goback()" >
                <v-icon class="float-left">mdi-arrow-left</v-icon>
            </v-btn>
            <v-tabs class="width mx-auto background" centered>
            <v-tab>
                <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Yours<v-icon size="small" class="pl-2">mdi-lock</v-icon></p>
            </v-tab>
            <v-tab>
                <p class="font-weight-light pl-2 mb-0" style="text-transform: capitalize; font-size:14px">Mentioned</p>
            </v-tab>
            <v-tab-item class="background">
                <div class="py-2 grey--text caption text-center">all your videos are private, except your last post</div>
            <!-- <div class="ml-1 py-2"></div> -->
            <v-layout wrap justify-start v-show="firstLoadY"  >
                <div v-for="n in this.looploader" :key ="n.index">
                <card-skeleton-loader class="ma-md-2 ma-1"></card-skeleton-loader>
                </div>
            </v-layout>
            <v-layout wrap justify-start v-show="!firstLoadY" >
                <div v-for="cook in cooking" :key ="cook.index">
                <cooking-card :cook="cook" @postDelete="postDelete"></cooking-card>
                </div>
            </v-layout>
            <center v-if="!cooking.length && !firstLoadY">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <h3>No videos found. </h3>
            </center>
            </v-tab-item>
            <v-tab-item class="background">
                <div class="py-2 grey--text caption text-center">all the videos where you are mentioned</div>
            <v-layout wrap justify-start v-show="firstLoadM" >
                <div v-for="n in this.looploader" :key ="n.index">
                <card-skeleton-loader class="ma-md-2 ma-1"></card-skeleton-loader>
                </div>
            </v-layout>
            <v-layout wrap justify-start v-show="!firstLoadM" >
                <div v-for="cook in cooking_mentioned" :key ="cook.index">
                    <cooking-card-sharing :cook="cook" ></cooking-card-sharing> 
                </div>
            </v-layout>
            <center v-if="!cooking_mentioned.length && !firstLoadM">
                <img
                :height="$vuetify.breakpoint.smAndDown ? 42 : 62"
                class="ml-2 mt-6 clickable"
                :src="require('@/assets/gebbleslogo_tab.png')"/>
                <h3>No videos found. </h3>
            </center>
            </v-tab-item>
            </v-tabs>
        </v-container>
    </v-app>
</template>

<script>
import EventService from '@/services/EventService.js'
import CookingCardSharing from '~/components/CookingCardSharing.vue'
import { mapGetters} from 'vuex'
import CardSkeletonLoader from '~/components/CardSkeletonLoader.vue'
import CookingCard from '~/components/CookingCard.vue'
import LeftNavigation from '~/components/LeftNavigation.vue'
// import CookingFeed from '~/components/CookingFeed.vue'

export default {
    props: ['artist'],
    middleware : 'check_auth',
    components: {
        CardSkeletonLoader,
        CookingCardSharing,
        CookingCard,
        LeftNavigation
    }, 
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    },
    head() {
        return {
            title: this.artist.username,     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this artist #' + this.artist.username
                }
            ]
        }
    },
    created(){
        this.getwhatiscooking();
        this.getwhatiscookingmentioned();
    },
    data() {
    return {
        cooking_mentioned_page:"", 
        cooking_page:'',
        cooking:[],
        cooking_mentioned:[],
        looploader:[1,1,1,1,1,1,1,1,1],
        loading: true,
        firstLoadY: true,
        firstLoadM: true,
    }
    },
    methods:{
    goback(){
        window.history.back();
    },
    async getwhatiscooking(){
        console.log("sup");
        const config = {
        headers: {"content-type": "multipart/form-data",
            "Authorization": this.$auth.strategy.token.get()}
        };
        try {
            const response = await EventService.getWhatsCookingUsername(config)
            console.log(response);
            this.cooking = response.data.results
            this.cooking_page = response.data.next
            this.firstLoadY = false
        } catch (e) {
            console.log(e);
            this.firstLoadY = false
        }
    },
    async getwhatiscookingmentioned(){
      try {
        const response = await EventService.getStudentsCooking(this.artist.username)
        this.cooking_mentioned = response.data.results
        this.cooking_mentioned_page = response.data.next
        this.firstLoadM = false
        } catch (e) {
        console.log(e);
        this.firstLoadM = false
    }
    },
    infiniteScrolling() {
      if(this.cooking_mentioned_page){
      const key = 'id';
      this.$axios.get(this.cooking_mentioned_page).then(response => {
        this.cooking_mentioned_page= response.data.next;
        response.data.results.forEach(item => this.cooking_mentioned.push(item));
        // filter array so no duplicates
        this.cooking_mentioned = [...new Map(this.cooking_mentioned.map(item =>
          [item[key], item])).values()];
      })
      .catch(err => {
        console.log(err);
      });
      }
    },
    postDelete(){
      this.cooking=[];
      this.firstLoadY = true
      this.getwhatiscooking();
    }
    },
}
</script>
<style scoped>

.width{
    max-width: 670px;
  }
@media only screen and (max-width: 960px) {
  .width{
  max-width: 357px;
}
}
</style>